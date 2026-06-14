<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogCategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = BlogCategory::withCount('posts');

        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        $categories = $query->orderBy('created_at', 'desc')->get()->map(function ($cat) {
            return [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'status' => $cat->status ?: 'Active',
                'post_count' => $cat->posts_count, // Count of associated blog posts
                'created_at' => $cat->created_at->format('M d, Y'),
                'description' => $cat->description,
                'image' => $cat->image ? asset('storage/' . $cat->image) : 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop',
            ];
        });

        return Inertia::render('Admin/Blog/Categories', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request, \App\Services\ImageService $imageService)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:blog_categories,name',
            'status' => 'required|in:Active,Inactive',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120', // 5MB limit
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $imageService->uploadAndConvert($request->file('image'), 'blog/categories', 'public');
        }

        BlogCategory::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'status' => $request->status,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        return redirect()->route('blog.categories')->with('success', 'Blog Category created successfully!');
    }

    public function update(Request $request, $id, \App\Services\ImageService $imageService)
    {
        $category = BlogCategory::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:100|unique:blog_categories,name,' . $id,
            'status' => 'required|in:Active,Inactive',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:blog_categories,slug,' . $id,
            'image' => 'nullable', // Can be file or string url
        ]);

        $imagePath = $category->image;
        if ($request->hasFile('image')) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $imagePath = $imageService->uploadAndConvert($request->file('image'), 'blog/categories', 'public');
        }

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'status' => $request->status,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        return redirect()->route('blog.categories')->with('success', 'Blog Category updated successfully!');
    }

    public function destroy($id)
    {
        $category = BlogCategory::findOrFail($id);
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        $category->delete();

        return redirect()->route('blog.categories')->with('success', 'Blog Category deleted successfully!');
    }
}
