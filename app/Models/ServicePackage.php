<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServicePackage extends Model
{
    protected $fillable = [
        'service_id',
        'package_name',
        'price',
        'description',
        'features',
        'delivery_days',
        'display_order',
        'status',
    ];

    protected $casts = [
        'price' => 'float',
        'features' => 'array',
        'delivery_days' => 'integer',
        'display_order' => 'integer',
        'status' => 'integer',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
