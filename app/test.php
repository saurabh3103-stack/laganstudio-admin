    <?php
    require 'db.php';
set_time_limit(0);
ini_set('memory_limit', '1024M');
// Cache branch mapping to avoid running a query in a loop
$branchMap = [];
$res = $conn->query('SELECT id, branch_name FROM branches');
while ($row = $res->fetch_assoc()) {
    $branchMap[$row['branch_name']] = intval($row['id']);
}
$conn->begin_transaction();
$recordCount = 0;
$successCount = 0;
$errorCount = 0;
$totalChildCount = 0;

try {
    // Generate a unique transaction ID counter starting at a random 6-digit number
    $tranIdCounter = mt_rand(100000, 900000);

    // 1. First, we get the total number of unique parent records to show progress
    $countRes = $conn->query("
            SELECT COUNT(DISTINCT admno_uniqueid, date, voucher_no)
            FROM temporary_data
            WHERE voucher_type = 'DUE'
        ");
    $totalRecords = $countRes ? intval($countRes->fetch_row()[0]) : 0;

    // 2. We execute the optimized single query to stream all DUE records
    $sql = "
            SELECT
                admno_uniqueid,
                date,
                academic_year,
                voucher_no,
                faculty,
                fee_head,
                due_amount
            FROM temporary_data
            WHERE voucher_type = 'DUE'
            ORDER BY admno_uniqueid, date, voucher_no
        ";

    $result = $conn->query($sql);

    if (! $result) {
        throw new Exception('Streaming Query Error: '.$conn->error);
    }

    // 3. Prepare the insert statements
    $insertParent = $conn->prepare('
            INSERT INTO financial_trans
            (moduleid, tranid, admno, amount, crdr, tranDate, acadYear, entrymode, voucherno, brid)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ');
    if (! $insertParent) {
        throw new Exception('Parent Prepare Error: '.$conn->error);
    }

    $insertChild = $conn->prepare('
            INSERT INTO financial_transdetail
            (financialTranId, moduleId, amount, headId, crdr, brid, head_name)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ');
    if (! $insertChild) {
        throw new Exception('Child Prepare Error: '.$conn->error);
    }

    $currentTxKey = null;
    $txData = [];
    $childItems = [];

    // Helper closure to process and insert the accumulated transaction
    $processTx = function () use (
        $conn, $insertParent, $insertChild,
        &$txData, &$childItems, $branchMap,
        &$tranIdCounter, &$recordCount, &$successCount, &$totalChildCount
    ) {
        if (empty($txData)) {
            return;
        }

        $recordCount++;

        // Sum the fee heads for the parent total amount
        $totalAmount = 0.0;
        foreach ($childItems as $amount) {
            $totalAmount += $amount;
        }

        // Branch mapping lookup
        $faculty = $txData['faculty'];
        $branchId = isset($branchMap[$faculty]) ? $branchMap[$faculty] : 1;

        $tranId = $tranIdCounter++;
        $moduleId = 1;
        $entryMode = 0;
        $crdr = 'D';

        // Bind and execute parent
        $insertParent->bind_param(
            'iisdssisii',
            $moduleId,
            $tranId,
            $txData['admno_uniqueid'],
            $totalAmount,
            $crdr,
            $txData['date'],
            $txData['academic_year'],
            $entryMode,
            $txData['voucher_no'],
            $branchId
        );

        if (! $insertParent->execute()) {
            throw new Exception('Insert Parent Error: '.$insertParent->error);
        }

        $financialTranId = $conn->insert_id;
        $successCount++;

        // Bind and execute children
        $headId = 1;
        foreach ($childItems as $headName => $childAmount) {
            $insertChild->bind_param(
                'iidisis',
                $financialTranId,
                $moduleId,
                $childAmount,
                $headId,
                $crdr,
                $branchId,
                $headName
            );

            if (! $insertChild->execute()) {
                throw new Exception('Insert Child Error: '.$insertChild->error);
            }
            $totalChildCount++;
        }

        // Log progress periodically to avoid clogging browser output
        if ($recordCount % 5000 === 0) {
            echo "Progress: Processed $recordCount / 224,657 parents (".round(($recordCount / 2246.57), 2)."%)<br>\n";
        }
    };

    $startTime = microtime(true);

    // Stream and group rows
    while ($row = $result->fetch_assoc()) {
        $txKey = $row['admno_uniqueid'].'|'.$row['date'].'|'.$row['voucher_no'];

        if ($txKey !== $currentTxKey) {
            $processTx();

            $currentTxKey = $txKey;
            $txData = [
                'admno_uniqueid' => $row['admno_uniqueid'],
                'date' => $row['date'],
                'academic_year' => $row['academic_year'],
                'voucher_no' => $row['voucher_no'],
                'faculty' => $row['faculty'],
            ];
            $childItems = [];
        }

        $headName = $row['fee_head'];
        $dueAmount = floatval($row['due_amount']);

        if (! isset($childItems[$headName])) {
            $childItems[$headName] = 0.0;
        }
        $childItems[$headName] += $dueAmount;
    }

    // Process the final transaction
    $processTx();

    $insertParent->close();
    $insertChild->close();

    $conn->commit();
    $elapsedTime = microtime(true) - $startTime;

    echo '<hr>';
    echo "<h2 style='color:green;'>Distribution Completed Successfully!</h2>";
    echo '<p>All records have been processed and distributed into:</p>';
    echo '<ul>';
    echo '<li>financial_trans (Parent Table): <strong>'.$successCount.' rows</strong></li>';
    echo '<li>financial_transdetail (Child Table): <strong>'.$totalChildCount.' rows</strong></li>';
    echo '</ul>';
    echo '<p><strong>Total Execution Time: '.round($elapsedTime, 2).' seconds</strong></p>';

} catch (Exception $e) {

    $conn->rollback();

    echo '<hr>';
    echo "<h2 style='color:red;'>Error Occurred during processing:</h2>";
    echo '<p>'.htmlspecialchars($e->getMessage()).'</p>';
    echo '<p><strong>Successfully rolled back all changes to keep database clean.</strong></p>';

}

$conn->close();
?>
