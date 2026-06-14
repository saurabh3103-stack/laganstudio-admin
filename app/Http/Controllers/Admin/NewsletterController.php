<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = NewsletterSubscriber::query();

        if ($search) {
            $query->where('email', 'like', "%{$search}%");
        }

        $subscribers = $query->orderBy('created_at', 'desc')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'email' => $s->email,
                'status' => $s->status,
                'created_at' => $s->created_at->format('M d, Y h:i A'),
            ];
        });

        // Statistics
        $totalCount = NewsletterSubscriber::count();
        $activeCount = NewsletterSubscriber::where('status', 'Active')->count();

        return Inertia::render('Admin/Queries/Newsletter', [
            'subscribers' => $subscribers,
            'stats' => [
                'total' => $totalCount,
                'active' => $activeCount,
            ],
            'filters' => $request->only(['search']),
        ]);
    }

    public function toggleStatus(Request $request, $id)
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);
        $subscriber->status = $subscriber->status === 'Active' ? 'Unsubscribed' : 'Active';
        $subscriber->save();

        return redirect()->back()->with('success', 'Newsletter subscriber status updated successfully!');
    }

    public function destroy($id)
    {
        $subscriber = NewsletterSubscriber::findOrFail($id);
        $subscriber->delete();

        return redirect()->back()->with('success', 'Newsletter subscriber deleted successfully!');
    }
}
