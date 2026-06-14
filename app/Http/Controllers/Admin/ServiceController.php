<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServicePackage;
use App\Models\ServiceFaq;
use App\Models\Portfolio;
use App\Models\PortfolioImage;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of services.
     */
    public function index(Request $request)
    {
        $query = Service::withCount(['packages', 'faqs', 'portfolios']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('service_name', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%");
            });
        }

        $services = $query->orderBy('display_order', 'asc')->get();

        return Inertia::render('Admin/Services/All', [
            'services' => $services,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new service.
     */
    public function create()
    {
        $categories = Category::where('status', 'Active')->get();
        return Inertia::render('Admin/Services/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created service in database.
     */
    public function store(Request $request, \App\Services\ImageService $imageService)
    {
        $request->validate([
            'service_name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:services,slug',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'featured_image' => 'nullable|image|max:5120',
            'banner_image' => 'nullable|image|max:5120',
            'service_icon' => 'nullable|string',
            'display_order' => 'nullable|integer',
            'status' => 'nullable|integer',
            'featured' => 'nullable|integer',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'canonical_url' => 'nullable|url',
            'robots' => 'nullable|string',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
            'og_image' => 'nullable|image|max:5120',
            'schema_type' => 'nullable|string',
        ]);

        $data = $request->except(['featured_image', 'banner_image', 'og_image']);
        $data['slug'] = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($request->service_name);
        $data['status'] = $request->input('status', 1);
        $data['featured'] = $request->input('featured', 0);
        $data['display_order'] = $request->input('display_order', 0);

        // Upload service cover/featured image
        if ($request->hasFile('featured_image')) {
            $path = $imageService->uploadAndConvert($request->file('featured_image'), 'services/covers', 'public');
            $data['featured_image'] = Storage::url($path);
        }

        // Upload banner image
        if ($request->hasFile('banner_image')) {
            $path = $imageService->uploadAndConvert($request->file('banner_image'), 'services/banners', 'public');
            $data['banner_image'] = Storage::url($path);
        }

        // Upload og image
        if ($request->hasFile('og_image')) {
            $path = $imageService->uploadAndConvert($request->file('og_image'), 'services/og', 'public');
            $data['og_image'] = Storage::url($path);
        }

        $service = Service::create($data);

        return redirect()->route('services.edit', $service->id)
            ->with('success', 'Service created successfully. You can now configure Packages, FAQs, and Portfolios.');
    }

    /**
     * Show the form for editing the specified service.
     */
    public function edit($id)
    {
        $service = Service::with([
            'packages',
            'faqs',
            'portfolios.images',
            'portfolios.category'
        ])->findOrFail($id);

        $categories = Category::where('status', 'Active')->get();

        return Inertia::render('Admin/Services/Edit', [
            'service' => $service,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified service in database.
     */
    public function update(Request $request, $id, \App\Services\ImageService $imageService)
    {
        $service = Service::findOrFail($id);

        $request->validate([
            'service_name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:services,slug,' . $id,
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'featured_image' => 'nullable|image|max:5120',
            'banner_image' => 'nullable|image|max:5120',
            'service_icon' => 'nullable|string',
            'display_order' => 'nullable|integer',
            'status' => 'nullable|integer',
            'featured' => 'nullable|integer',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'canonical_url' => 'nullable|url',
            'robots' => 'nullable|string',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
            'og_image' => 'nullable|image|max:5120',
            'schema_type' => 'nullable|string',
        ]);

        $data = $request->except(['featured_image', 'banner_image', 'og_image']);
        $data['slug'] = $request->filled('slug') ? Str::slug($request->slug) : Str::slug($request->service_name);
        $data['status'] = $request->input('status', 1);
        $data['featured'] = $request->input('featured', 0);
        $data['display_order'] = $request->input('display_order', 0);

        // Upload service cover/featured image
        if ($request->hasFile('featured_image')) {
            // Delete old if exists
            if ($service->featured_image) {
                $oldPath = str_replace('/storage/', '', $service->featured_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $imageService->uploadAndConvert($request->file('featured_image'), 'services/covers', 'public');
            $data['featured_image'] = Storage::url($path);
        }

        // Upload banner image
        if ($request->hasFile('banner_image')) {
            if ($service->banner_image) {
                $oldPath = str_replace('/storage/', '', $service->banner_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $imageService->uploadAndConvert($request->file('banner_image'), 'services/banners', 'public');
            $data['banner_image'] = Storage::url($path);
        }

        // Upload og image
        if ($request->hasFile('og_image')) {
            if ($service->og_image) {
                $oldPath = str_replace('/storage/', '', $service->og_image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $imageService->uploadAndConvert($request->file('og_image'), 'services/og', 'public');
            $data['og_image'] = Storage::url($path);
        }

        $service->update($data);

        return redirect()->back()->with('success', 'Service general details updated successfully.');
    }

    /**
     * Remove the specified service.
     */
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return redirect()->route('services.index')->with('success', 'Service moved to trash.');
    }

    /**
     * Quick toggle status.
     */
    public function toggleStatus($id)
    {
        $service = Service::findOrFail($id);
        $service->status = $service->status == 1 ? 0 : 1;
        $service->save();

        return redirect()->back()->with('success', 'Service status toggled.');
    }

    /**
     * Quick toggle featured.
     */
    public function toggleFeatured($id)
    {
        $service = Service::findOrFail($id);
        $service->featured = $service->featured == 1 ? 0 : 1;
        $service->save();

        return redirect()->back()->with('success', 'Service featured status toggled.');
    }

    /*
     * ---------------------------------------------------------
     * Nested Service Packages Methods
     * ---------------------------------------------------------
     */
    public function packages()
    {
        $services = Service::with('packages')->orderBy('display_order', 'asc')->get();
        return Inertia::render('Admin/Services/Package/Create', [
            'services' => $services
        ]);
    }

    public function savePackage(Request $request, $serviceId)
    {
        $request->validate([
            'id' => 'nullable|integer',
            'package_name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'delivery_days' => 'nullable|integer|min:0',
            'display_order' => 'nullable|integer',
            'status' => 'nullable|integer',
        ]);

        $data = $request->all();
        $data['service_id'] = $serviceId;
        $data['features'] = $request->input('features', []);
        $data['status'] = $request->input('status', 1);

        if ($request->filled('id')) {
            $package = ServicePackage::findOrFail($request->id);
            $package->update($data);
            $msg = 'Package updated successfully.';
        } else {
            ServicePackage::create($data);
            $msg = 'Package created successfully.';
        }

        return redirect()->back()->with('success', $msg);
    }

    public function deletePackage($id)
    {
        $package = ServicePackage::findOrFail($id);
        $package->delete();

        return redirect()->back()->with('success', 'Package removed successfully.');
    }

    /*
     * ---------------------------------------------------------
     * Nested Service FAQs Methods
     * ---------------------------------------------------------
     */
    public function faqs()
    {
        $services = Service::with('faqs')->orderBy('display_order', 'asc')->get();
        return Inertia::render('Admin/Services/Faq/Index', [
            'services' => $services
        ]);
    }

    public function saveFaq(Request $request, $serviceId)
    {
        $request->validate([
            'id' => 'nullable|integer',
            'question' => 'required|string|max:500',
            'answer' => 'required|string',
            'display_order' => 'nullable|integer',
            'status' => 'nullable|integer',
        ]);

        $data = $request->all();
        $data['service_id'] = $serviceId;
        $data['status'] = $request->input('status', 1);

        if ($request->filled('id')) {
            $faq = ServiceFaq::findOrFail($request->id);
            $faq->update($data);
            $msg = 'FAQ updated successfully.';
        } else {
            ServiceFaq::create($data);
            $msg = 'FAQ created successfully.';
        }

        return redirect()->back()->with('success', $msg);
    }

    public function deleteFaq($id)
    {
        $faq = ServiceFaq::findOrFail($id);
        $faq->delete();

        return redirect()->back()->with('success', 'FAQ removed successfully.');
    }

    /*
     * ---------------------------------------------------------
     * Nested Portfolios & Albums Methods
     * ---------------------------------------------------------
     */
    public function savePortfolio(Request $request, $serviceId, \App\Services\ImageService $imageService)
    {
        $request->validate([
            'id' => 'nullable|integer',
            'category_id' => 'nullable|integer',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'nullable', // Can be an uploaded file or an existing string URL
            'event_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'featured' => 'nullable|integer',
            'status' => 'nullable|integer',
        ]);

        $data = $request->except(['cover_image']);
        $data['service_id'] = $serviceId;
        $data['status'] = $request->input('status', 1);
        $data['featured'] = $request->input('featured', 0);

        if ($request->filled('id')) {
            $portfolio = Portfolio::findOrFail($request->id);

            if ($request->hasFile('cover_image')) {
                if ($portfolio->cover_image) {
                    $oldPath = str_replace('/storage/', '', $portfolio->cover_image);
                    Storage::disk('public')->delete($oldPath);
                }
                $path = $imageService->uploadAndConvert($request->file('cover_image'), 'portfolios/covers', 'public');
                $data['cover_image'] = Storage::url($path);
            }

            $portfolio->update($data);
            $msg = 'Portfolio album details updated.';
        } else {
            if ($request->hasFile('cover_image')) {
                $path = $imageService->uploadAndConvert($request->file('cover_image'), 'portfolios/covers', 'public');
                $data['cover_image'] = Storage::url($path);
            }

            Portfolio::create($data);
            $msg = 'Portfolio album created successfully.';
        }

        return redirect()->back()->with('success', $msg);
    }

    public function deletePortfolio($id)
    {
        $portfolio = Portfolio::findOrFail($id);

        // Delete cover image file
        if ($portfolio->cover_image) {
            $oldPath = str_replace('/storage/', '', $portfolio->cover_image);
            Storage::disk('public')->delete($oldPath);
        }

        // Delete all associated sub-images
        foreach ($portfolio->images as $img) {
            $oldPath = str_replace('/storage/', '', $img->image);
            Storage::disk('public')->delete($oldPath);
            $img->delete();
        }

        $portfolio->delete();

        return redirect()->back()->with('success', 'Portfolio album deleted successfully.');
    }

    public function uploadPortfolioImage(Request $request, $portfolioId, \App\Services\ImageService $imageService)
    {
        $request->validate([
            'image' => 'required|image|max:10240', // Max 10MB
            'alt_text' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
        ]);

        $data = $request->only(['alt_text', 'display_order']);
        $data['portfolio_id'] = $portfolioId;
        $data['display_order'] = $request->input('display_order', 0);

        if ($request->hasFile('image')) {
            $path = $imageService->uploadAndConvert($request->file('image'), 'portfolios/gallery', 'public');
            $data['image'] = Storage::url($path);
        }

        PortfolioImage::create($data);

        return redirect()->back()->with('success', 'Gallery image uploaded successfully.');
    }

    public function deletePortfolioImage($id)
    {
        $img = PortfolioImage::findOrFail($id);

        if ($img->image) {
            $oldPath = str_replace('/storage/', '', $img->image);
            Storage::disk('public')->delete($oldPath);
        }

        $img->delete();

        return redirect()->back()->with('success', 'Gallery image removed.');
    }
}
