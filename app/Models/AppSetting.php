<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppSetting extends Model
{
    protected $fillable = [
        'app_name', 'app_title', 'logo_path', 'favicon_path',
        'email', 'phone', 'address',
        'smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass',
        'facebook', 'instagram', 'youtube'
    ];
}
