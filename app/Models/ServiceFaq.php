<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceFaq extends Model
{
    protected $fillable = [
        'service_id',
        'question',
        'answer',
        'display_order',
        'status',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'status' => 'integer',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
