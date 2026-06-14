<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactQueryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $query = ContactQuery::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if ($status) {
            $query->where('status', $status);
        }

        $queries = $query->orderBy('created_at', 'desc')->get()->map(function ($q) {
            return [
                'id' => $q->id,
                'name' => $q->name,
                'email' => $q->email,
                'phone' => $q->phone,
                'subject' => $q->subject,
                'message' => $q->message,
                'status' => $q->status,
                'created_at' => $q->created_at->format('M d, Y h:i A'),
            ];
        });

        // Statistics
        $totalCount = ContactQuery::count();
        $unreadCount = ContactQuery::where('status', 'Unread')->count();

        return Inertia::render('Admin/Queries/Contact', [
            'queries' => $queries,
            'stats' => [
                'total' => $totalCount,
                'unread' => $unreadCount,
            ],
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $query = ContactQuery::findOrFail($id);
        $query->status = $query->status === 'Unread' ? 'Read' : 'Unread';
        $query->save();

        return redirect()->back()->with('success', 'Contact query status updated successfully!');
    }

    public function destroy($id)
    {
        $query = ContactQuery::findOrFail($id);
        $query->delete();

        return redirect()->back()->with('success', 'Contact query deleted successfully!');
    }
}
