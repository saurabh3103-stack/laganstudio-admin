<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'author_id',
        'blog_category_id',
        'title',
        'slug',
        'content',
        'featured_image',
        'status',
        'views',
        'published_at',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'canonical_url',
        'robots_index',
        'robots_follow',
        'schema_markup',
        'og_title',
        'og_description',
        'og_image',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'views' => 'integer',
        'schema_markup' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
            if (empty($post->author_id) && auth()->check()) {
                $post->author_id = auth()->id();
            }
            if (empty($post->published_at) && $post->status === 'Published') {
                $post->published_at = now();
            }
        });

        static::updating(function ($post) {
            if ($post->isDirty('status') && $post->status === 'Published' && empty($post->published_at)) {
                $post->published_at = now();
            }
        });
    }

    // Relationships
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'blog_post_tag', 'blog_post_id', 'tag_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'blog_post_id');
    }

    public function rootComments()
    {
        return $this->hasMany(Comment::class, 'blog_post_id')->whereNull('parent_id')->where('status', 'Approved');
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'Published')
            ->where(function ($q) {
                $q->whereNull('published_at')
                  ->orWhere('published_at', '<=', now());
            });
    }

    // Accessors
    public function getReadingTimeAttribute()
    {
        $words = str_word_count(strip_tags($this->content));
        $minutes = ceil($words / 200); // average reading speed
        return $minutes . ' min read';
    }

    /**
     * Get Open Graph tags dynamically or override.
     */
    public function getOgTagsAttribute()
    {
        return [
            'title' => $this->og_title ?: $this->seo_title ?: $this->title,
            'description' => $this->og_description ?: $this->seo_description ?: Str::limit(strip_tags($this->content), 150),
            'image' => $this->og_image ? asset('storage/' . $this->og_image) : ($this->featured_image ? asset('storage/' . $this->featured_image) : null),
            'url' => url('/blog/' . $this->slug),
            'type' => 'article',
        ];
    }
}
