<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\Tag;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');
        $category = $request->input('category');

        $query = BlogPost::with(['author', 'category', 'tags'])
            ->withCount('comments');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($status) {
            $query->where('status', $status);
        }

        if ($category) {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', $category)->orWhere('id', $category);
            });
        }

        // Handle soft deleted toggle
        if ($request->boolean('trash')) {
            $query->onlyTrashed();
        }

        $posts = $query->orderBy('created_at', 'desc')->get()->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'category' => $post->category ? $post->category->name : 'Uncategorized',
                'category_id' => $post->blog_category_id,
                'author' => $post->author ? $post->author->name : 'Unknown',
                'author_id' => $post->author_id,
                'views' => number_format($post->views),
                'date' => $post->published_at ? $post->published_at->format('M d, Y') : $post->created_at->format('M d, Y'),
                'published_at' => $post->published_at ? $post->published_at->toIso8601String() : null,
                'status' => $post->status,
                'tags' => $post->tags->pluck('name')->toArray(),
                'image' => $post->featured_image ? asset('storage/' . $post->featured_image) : 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=250&fit=crop',
                'seo_title' => $post->seo_title,
                'seo_description' => $post->seo_description,
                'seo_keywords' => $post->seo_keywords,
                'canonical_url' => $post->canonical_url,
                'robots_index' => $post->robots_index,
                'robots_follow' => $post->robots_follow,
                'schema_markup' => $post->schema_markup,
                'deleted_at' => $post->deleted_at,
            ];
        });

        // Statistics
        $totalCount = BlogPost::withTrashed()->count();
        $publishedCount = BlogPost::where('status', 'Published')->count();
        $draftsCount = BlogPost::where('status', 'Draft')->count();
        $trashCount = BlogPost::onlyTrashed()->count();

        return Inertia::render('Admin/Blog/All', [
            'blogs' => $posts,
            'stats' => [
                'total' => $totalCount,
                'published' => $publishedCount,
                'drafts' => $draftsCount,
                'trash' => $trashCount,
            ],
            'categories' => BlogCategory::where('status', 'Active')->get(['id', 'name']),
            'filters' => $request->only(['search', 'status', 'category', 'trash']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Blog/Create', [
            'categories' => BlogCategory::where('status', 'Active')->get(['id', 'name']),
            'tags' => Tag::all(['id', 'name', 'color']),
            'authors' => User::all(['id', 'name', 'email']), // Author management: select author
        ]);
    }

    public function store(Request $request, \App\Services\ImageService $imageService)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'status' => 'required|in:Draft,Published',
            'image' => 'nullable|image|max:5120', // Max 5MB
            'published_at' => 'nullable|date',
            'author_id' => 'nullable|exists:users,id',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string',
            'canonical_url' => 'nullable|url',
            'robots_index' => 'nullable|string|in:index,noindex',
            'robots_follow' => 'nullable|string|in:follow,nofollow',
            'schema_markup' => 'nullable|array',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string|max:500',
            'og_image' => 'nullable|image|max:5120',
        ]);

        $featuredImagePath = null;
        if ($request->hasFile('image')) {
            $featuredImagePath = $imageService->uploadAndConvert($request->file('image'), 'blog', 'public');
        }

        $ogImagePath = null;
        if ($request->hasFile('og_image')) {
            $ogImagePath = $imageService->uploadAndConvert($request->file('og_image'), 'blog/social', 'public');
        }

        $post = BlogPost::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'blog_category_id' => $request->category_id,
            'author_id' => $request->author_id ?: auth()->id(),
            'status' => $request->status,
            'featured_image' => $featuredImagePath,
            'published_at' => $request->published_at ?: ($request->status === 'Published' ? now() : null),
            'seo_title' => $request->seo_title ?: $request->title,
            'seo_description' => $request->seo_description ?: Str::limit(strip_tags($request->content), 150),
            'seo_keywords' => $request->seo_keywords,
            'canonical_url' => $request->canonical_url ?: url('/blog/' . Str::slug($request->title)),
            'robots_index' => $request->robots_index ?: 'index',
            'robots_follow' => $request->robots_follow ?: 'follow',
            'schema_markup' => $request->schema_markup ?: $this->defaultSchemaMarkup($request->title, $request->content, $featuredImagePath),
            'og_title' => $request->og_title ?: $request->title,
            'og_description' => $request->og_description ?: Str::limit(strip_tags($request->content), 150),
            'og_image' => $ogImagePath,
        ]);

        // Tag handling
        if ($request->has('tags') && is_array($request->tags)) {
            $tagIds = [];
            foreach ($request->tags as $tagName) {
                $tag = Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName), 'color' => 'indigo']
                );
                $tagIds[] = $tag->id;
            }
            $post->tags()->sync($tagIds);
        }

        return redirect()->route('blog.posts')->with('success', 'Blog post created successfully!');
    }

    public function edit($id)
    {
        $post = BlogPost::with(['tags'])->findOrFail($id);

        return Inertia::render('Admin/Blog/Edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'content' => $post->content,
                'category_id' => $post->blog_category_id,
                'author_id' => $post->author_id,
                'status' => $post->status,
                'image' => $post->featured_image ? asset('storage/' . $post->featured_image) : null,
                'published_at' => $post->published_at ? $post->published_at->format('Y-m-d\TH:i') : null,
                'seo_title' => $post->seo_title,
                'seo_description' => $post->seo_description,
                'seo_keywords' => $post->seo_keywords,
                'canonical_url' => $post->canonical_url,
                'robots_index' => $post->robots_index,
                'robots_follow' => $post->robots_follow,
                'schema_markup' => $post->schema_markup,
                'og_title' => $post->og_title,
                'og_description' => $post->og_description,
                'og_image' => $post->og_image ? asset('storage/' . $post->og_image) : null,
                'tags' => $post->tags->pluck('name')->toArray(),
            ],
            'categories' => BlogCategory::where('status', 'Active')->get(['id', 'name']),
            'tags' => Tag::all(['id', 'name', 'color']),
            'authors' => User::all(['id', 'name', 'email']),
        ]);
    }

    public function update(Request $request, $id, \App\Services\ImageService $imageService)
    {
        $post = BlogPost::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'status' => 'required|in:Draft,Published',
            'image' => 'nullable', // Can be file or string
            'published_at' => 'nullable|date',
            'author_id' => 'nullable|exists:users,id',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string',
            'canonical_url' => 'nullable|url',
            'robots_index' => 'nullable|string|in:index,noindex',
            'robots_follow' => 'nullable|string|in:follow,nofollow',
            'schema_markup' => 'nullable|array',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string|max:500',
            'og_image' => 'nullable', // Can be file or string
        ]);

        $featuredImagePath = $post->featured_image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }
            $featuredImagePath = $imageService->uploadAndConvert($request->file('image'), 'blog', 'public');
        }

        $ogImagePath = $post->og_image;
        if ($request->hasFile('og_image')) {
            // Delete old image if exists
            if ($post->og_image) {
                Storage::disk('public')->delete($post->og_image);
            }
            $ogImagePath = $imageService->uploadAndConvert($request->file('og_image'), 'blog/social', 'public');
        }

        $post->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'blog_category_id' => $request->category_id,
            'author_id' => $request->author_id ?: $post->author_id ?: auth()->id(),
            'status' => $request->status,
            'featured_image' => $featuredImagePath,
            'published_at' => $request->published_at ?: ($request->status === 'Published' ? ($post->published_at ?: now()) : null),
            'seo_title' => $request->seo_title ?: $request->title,
            'seo_description' => $request->seo_description ?: Str::limit(strip_tags($request->content), 150),
            'seo_keywords' => $request->seo_keywords,
            'canonical_url' => $request->canonical_url ?: url('/blog/' . Str::slug($request->title)),
            'robots_index' => $request->robots_index ?: 'index',
            'robots_follow' => $request->robots_follow ?: 'follow',
            'schema_markup' => $request->schema_markup ?: $post->schema_markup ?: $this->defaultSchemaMarkup($request->title, $request->content, $featuredImagePath),
            'og_title' => $request->og_title ?: $request->title,
            'og_description' => $request->og_description ?: Str::limit(strip_tags($request->content), 150),
            'og_image' => $ogImagePath,
        ]);

        // Tag handling
        if ($request->has('tags') && is_array($request->tags)) {
            $tagIds = [];
            foreach ($request->tags as $tagName) {
                $tag = Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName), 'color' => 'indigo']
                );
                $tagIds[] = $tag->id;
            }
            $post->tags()->sync($tagIds);
        } else {
            $post->tags()->detach();
        }

        return redirect()->route('blog.posts')->with('success', 'Blog post updated successfully!');
    }

    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->delete(); // Soft Delete

        return redirect()->route('blog.posts')->with('success', 'Blog post soft deleted successfully!');
    }

    public function restore($id)
    {
        $post = BlogPost::onlyTrashed()->findOrFail($id);
        $post->restore();

        return redirect()->route('blog.posts')->with('success', 'Blog post restored successfully!');
    }

    public function forceDelete($id)
    {
        $post = BlogPost::withTrashed()->findOrFail($id);
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }
        $post->tags()->detach();
        $post->comments()->delete();
        $post->forceDelete();

        return redirect()->route('blog.posts')->with('success', 'Blog post deleted permanently!');
    }

    public function incrementViews($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->increment('views');
        return response()->json(['views' => $post->views]);
    }

    public function toggleStatus($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->status = $post->status === 'Published' ? 'Draft' : 'Published';
        if ($post->status === 'Published' && empty($post->published_at)) {
            $post->published_at = now();
        }
        $post->save();

        return redirect()->back()->with('success', 'Post status updated successfully!');
    }

    // Comment Handling (with nesting)
    public function storeComment(Request $request, $postId)
    {
        $request->validate([
            'content' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
            'author_name' => 'nullable|required_without:user_id|string|max:100',
            'author_email' => 'nullable|required_without:user_id|email|max:150',
        ]);

        $comment = Comment::create([
            'blog_post_id' => $postId,
            'user_id' => auth()->id(),
            'parent_id' => $request->parent_id,
            'author_name' => auth()->check() ? auth()->user()->name : $request->author_name,
            'author_email' => auth()->check() ? auth()->user()->email : $request->author_email,
            'content' => $request->content,
            'status' => 'Approved', // Auto-approved by default in admin, moderation status
        ]);

        return redirect()->back()->with('success', 'Comment added successfully!');
    }

    private function defaultSchemaMarkup($title, $content, $imagePath)
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'BlogPosting',
            'headline' => $title,
            'image' => $imagePath ? asset('storage/' . $imagePath) : null,
            'datePublished' => now()->toIso8601String(),
            'dateModified' => now()->toIso8601String(),
            'description' => Str::limit(strip_tags($content), 150),
            'publisher' => [
                '@type' => 'Organization',
                'name' => config('app.name', 'Lagan Studio'),
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => asset('images/logo.png'),
                ]
            ],
            'author' => [
                '@type' => 'Person',
                'name' => auth()->user() ? auth()->user()->name : 'Admin',
            ]
        ];
    }
}
