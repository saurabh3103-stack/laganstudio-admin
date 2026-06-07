<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = Tag::withCount('posts');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        $tags = $query->orderBy('name', 'asc')->get()->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name,
                'slug' => $tag->slug,
                'count' => $tag->posts_count,
                'color' => $tag->color ?: 'indigo',
            ];
        });

        return Inertia::render('Admin/Blog/Tags', [
            'tags' => $tags,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:tags,name',
            'color' => 'required|string|max:30',
        ]);

        $formattedName = preg_replace('/[^\w]/', '', $request->name);

        if (empty($formattedName)) {
            return redirect()->back()->withErrors(['name' => 'Tag name must contain alphanumeric characters only!']);
        }

        Tag::create([
            'name' => $formattedName,
            'slug' => Str::slug($formattedName),
            'color' => $request->color,
        ]);

        return redirect()->back()->with('success', 'Tag created successfully!');
    }

    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->posts()->detach();
        $tag->delete();

        return redirect()->back()->with('success', 'Tag deleted successfully!');
    }
}
