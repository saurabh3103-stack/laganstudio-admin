<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\HomeBanner;
use App\Models\AboutSection;

class HomeContentController extends Controller
{
    public function banners()
    {
        $banners = HomeBanner::orderBy('display_order', 'asc')->get();

        return Inertia::render('Admin/Home/Banners', [
            'banners' => $banners
        ]);
    }

    public function storeBanner(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|max:5120',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'status' => 'nullable|boolean',
        ]);

        $data = $request->except(['image']);
        $data['status'] = $request->input('status', true);
        $data['display_order'] = $request->input('display_order', 0);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('home_banners', 'public');
            $data['image_path'] = Storage::url($path);
        }

        HomeBanner::create($data);

        return redirect()->back()->with('success', 'Banner created successfully.');
    }

    public function updateBanner(Request $request, $id)
    {
        $banner = HomeBanner::findOrFail($id);

        $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'button_text' => 'nullable|string|max:255',
            'button_link' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'status' => 'nullable|boolean',
        ]);

        $data = $request->except(['image']);
        $data['status'] = $request->input('status', true);
        $data['display_order'] = $request->input('display_order', 0);

        if ($request->hasFile('image')) {
            if ($banner->image_path) {
                $oldPath = str_replace('/storage/', '', $banner->image_path);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('home_banners', 'public');
            $data['image_path'] = Storage::url($path);
        }

        $banner->update($data);

        return redirect()->back()->with('success', 'Banner updated successfully.');
    }

    public function deleteBanner($id)
    {
        $banner = HomeBanner::findOrFail($id);

        if ($banner->image_path) {
            $oldPath = str_replace('/storage/', '', $banner->image_path);
            Storage::disk('public')->delete($oldPath);
        }

        $banner->delete();

        return redirect()->back()->with('success', 'Banner deleted successfully.');
    }

    public function toggleBannerStatus($id)
    {
        $banner = HomeBanner::findOrFail($id);

        $banner->status = !$banner->status;
        $banner->save();

        return redirect()->back()->with('success', 'Banner status updated.');
    }

    public function about()
    {
        $about = AboutSection::first();

        if (!$about) {
            $about = AboutSection::create([
                'title' => 'The Royal Wedding Film Company',
                'subtitle' => 'WHO WE ARE',
                'description_1' => 'Founded in 2012...',
                'description_2' => 'Our team of passionate storytellers...',
                'stat_1_value' => '12+',
                'stat_1_label' => 'Years of Excellence',
                'stat_2_value' => '1500+',
                'stat_2_label' => 'Weddings Captured',
                'stat_3_value' => '50+',
                'stat_3_label' => 'Cities Covered',
                'stat_4_value' => '4.9',
                'stat_4_label' => 'Average Rating',
            ]);
        }

        return Inertia::render('Admin/Home/About', [
            'about' => $about
        ]);
    }

    public function updateAbout(Request $request)
    {
        $about = AboutSection::first();

        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'description_1' => 'required|string',
            'description_2' => 'nullable|string',
            'stat_1_value' => 'nullable|string|max:255',
            'stat_1_label' => 'nullable|string|max:255',
            'stat_2_value' => 'nullable|string|max:255',
            'stat_2_label' => 'nullable|string|max:255',
            'stat_3_value' => 'nullable|string|max:255',
            'stat_3_label' => 'nullable|string|max:255',
            'stat_4_value' => 'nullable|string|max:255',
            'stat_4_label' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:5120',
        ]);

        $data = $request->except(['image']);

        if ($request->hasFile('image')) {
            if ($about->image_path) {
                $oldPath = str_replace('/storage/', '', $about->image_path);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('home_about', 'public');
            $data['image_path'] = Storage::url($path);
        }

        $about->update($data);

        return redirect()->back()->with('success', 'About section updated successfully.');
    }
}