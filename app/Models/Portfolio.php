<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'service_id',
        'category_id',
        'title',
        'description',
        'cover_image',
        'event_date',
        'location',
        'featured',
        'status',
    ];

    protected $casts = [
        'event_date' => 'date:Y-m-d',
        'featured' => 'integer',
        'status' => 'integer',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(PortfolioImage::class)->orderBy('display_order', 'asc');
    }
}
