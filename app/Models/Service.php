<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Service extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'service_name',
        'slug',
        'short_description',
        'description',
        'featured_image',
        'banner_image',
        'service_icon',
        'display_order',
        'status',
        'featured',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'canonical_url',
        'robots',
        'og_title',
        'og_description',
        'og_image',
        'schema_type',
    ];

    protected $casts = [
        'status' => 'integer',
        'featured' => 'integer',
        'display_order' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->service_name);
            }
        });

        static::updating(function ($service) {
            if (empty($service->slug) || $service->isDirty('service_name')) {
                $service->slug = Str::slug($service->service_name);
            }
        });
    }

    public function packages()
    {
        return $this->hasMany(ServicePackage::class)->orderBy('display_order', 'asc');
    }

    public function faqs()
    {
        return $this->hasMany(ServiceFaq::class)->orderBy('display_order', 'asc');
    }

    public function portfolios()
    {
        return $this->hasMany(Portfolio::class);
    }
}
