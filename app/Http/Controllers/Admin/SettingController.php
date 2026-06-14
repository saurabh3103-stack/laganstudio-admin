<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function general()
    {
        $settings = \App\Models\AppSetting::first();
        if (!$settings) {
            $settings = \App\Models\AppSetting::create([
                'app_name' => 'Lagan Studio',
                'app_title' => 'Lagan Studio | Elegant Indian Wedding Cinematic Photography',
                'email' => 'contact@laganstudio.com',
                'phone' => '+91 99887 76655',
                'address' => 'Plot 45, Lal Kothi, Jaipur, Rajasthan, India',
                'smtp_host' => 'smtp.mailgun.org',
                'smtp_port' => '587',
                'smtp_user' => 'postmaster@mg.laganstudio.com',
                'smtp_pass' => '••••••••••••••••••••',
                'facebook' => 'https://facebook.com/laganstudio',
                'instagram' => 'https://instagram.com/laganstudio',
                'youtube' => 'https://youtube.com/laganstudio',
            ]);
        }
        return \Inertia\Inertia::render('Admin/Settings/General', [
            'settings' => $settings
        ]);
    }

    public function updateGeneral(\Illuminate\Http\Request $request, \App\Services\ImageService $imageService)
    {
        $settings = \App\Models\AppSetting::first();

        $request->validate([
            'app_name' => 'required|string|max:255',
            'app_title' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'smtp_host' => 'nullable|string|max:255',
            'smtp_port' => 'nullable|string|max:255',
            'smtp_user' => 'nullable|string|max:255',
            'smtp_pass' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'logo' => 'nullable|file|mimes:png,jpg,jpeg,svg,webp|max:5120',
            'favicon' => 'nullable|file|mimes:ico,png,jpg,jpeg,svg,webp|max:2048',
        ]);

        $data = $request->except(['logo', 'favicon']);

        if ($request->hasFile('logo')) {
            if ($settings->logo_path) {
                $oldPath = str_replace('/storage/', '', $settings->logo_path);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
            $path = $imageService->uploadAndConvert($request->file('logo'), 'settings', 'public');
            $data['logo_path'] = \Illuminate\Support\Facades\Storage::url($path);
        }

        if ($request->hasFile('favicon')) {
            if ($settings->favicon_path) {
                $oldPath = str_replace('/storage/', '', $settings->favicon_path);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
            $path = $imageService->uploadAndConvert($request->file('favicon'), 'settings', 'public');
            $data['favicon_path'] = \Illuminate\Support\Facades\Storage::url($path);
        }

        $settings->update($data);

        return redirect()->back()->with('success', 'General settings saved successfully.');
    }
}
