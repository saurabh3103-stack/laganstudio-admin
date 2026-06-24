<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HomeBanner;
use App\Models\AboutSection;
use App\Models\Service;
use App\Models\PortfolioImage;
use App\Models\BlogPost;
use App\Models\Faq;
use App\Models\AppSetting;
use Illuminate\Support\Facades\Cache;

class FrontendController extends Controller
{
    /**
     * Get all home banners.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBanners()
    {
        $banners = Cache::remember('api_banners', 3600, function () {
            return HomeBanner::orderBy('display_order', 'asc')->get();
        });

        return response()->json([
            'banners' => $banners
        ]);
    }

    /**
     * Get Home data including banners, about section, and global app settings.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getHomeData()
    {
        $data = Cache::remember('api_home_data', 3600, function () {
            $banners = HomeBanner::orderBy('display_order', 'asc')->get();
            $about = AboutSection::first();
            
            $settingsRaw = AppSetting::all();
            $settings = [];
            foreach ($settingsRaw as $setting) {
                $settings[$setting->key] = $setting->value;
            }

            return [
                'banners' => $banners,
                'about' => $about,
                'settings' => $settings
            ];
        });

        return response()->json($data);
    }

    /**
     * Get all active services.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getServices()
    {
        $services = Cache::remember('api_services', 3600, function () {
            return Service::orderBy('display_order', 'asc')->get();
        });

        return response()->json([
            'services' => $services
        ]);
    }

    /**
     * Get portfolio items, optionally filtered by category name.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPortfolio(Request $request)
    {
        $categoryName = $request->query('category', 'All');
        $cacheKey = 'api_portfolio_' . md5($categoryName);

        $data = Cache::remember($cacheKey, 3600, function () use ($categoryName) {
            $categories = \App\Models\Service::where('status', 1)->pluck('service_name');
            $query = \App\Models\Portfolio::with(['service'])->orderBy('created_at', 'desc');

            if ($categoryName !== 'All') {
                $query->whereHas('service', function($q) use ($categoryName) {
                    $q->where('service_name', $categoryName);
                });
            }

            $portfolio = $query->get();

            $formatted = $portfolio->map(function($item) {
                $catName = $item->service ? $item->service->service_name : 'Other';
                
                // cover_image typically starts with /storage/ when using Storage::url()
                $imgPath = null;
                if ($item->cover_image) {
                    $imgPath = str_starts_with($item->cover_image, '/storage') 
                               ? asset($item->cover_image) 
                               : asset('storage/' . $item->cover_image);
                }

                return [
                    'id' => $item->id,
                    'cat' => $catName,
                    'img' => $imgPath,
                    'label' => $item->title
                ];
            });

            return [
                'categories' => $categories,
                'portfolio' => $formatted
            ];
        });

        return response()->json($data);
    }

    /**
     * Get blogs with pagination.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBlogs(Request $request)
    {
        $limit = (int) $request->query('limit', 10);
        $page = (int) $request->query('page', 1);
        $cacheKey = 'api_blogs_limit_' . $limit . '_page_' . $page;

        $blogs = Cache::remember($cacheKey, 3600, function () use ($limit) {
            $paginator = BlogPost::with('category', 'tags')
                        ->where('status', "Published")
                        ->orderBy('published_at', 'desc')
                        ->paginate($limit);

            $paginator->getCollection()->transform(function ($blog) {
                if ($blog->featured_image) {
                    $blog->featured_image = str_starts_with($blog->featured_image, '/storage') 
                                ? asset($blog->featured_image) 
                                : asset('storage/' . $blog->featured_image);
                }
                return $blog;
            });

            return $paginator;
        });

        return response()->json($blogs);
    }

    /**
     * Get a specific blog by slug.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBlog($slug)
    {
        $blog = Cache::remember('api_blog_' . $slug, 3600, function () use ($slug) {
            $post = BlogPost::with('category', 'tags', 'author')
                        ->where('status', "Published")
                        ->where('slug', $slug)
                        ->firstOrFail();

            if ($post->featured_image) {
                $post->featured_image = str_starts_with($post->featured_image, '/storage') 
                                ? asset($post->featured_image) 
                                : asset('storage/' . $post->featured_image);
            }

            return $post;
        });

        return response()->json([
            'blog' => $blog
        ]);
    }

    /**
     * Get all FAQs.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFaqs()
    {
        $faqs = Cache::remember('api_faqs', 3600, function () {
            return Faq::orderBy('display_order', 'asc')->get();
        });

        return response()->json([
            'faqs' => $faqs
        ]);
    }

    /**
     * Handle contact form submission.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'service' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string'
        ]);

        $subject = $validated['subject'] ?? (!empty($validated['service']) ? 'Inquiry about: ' . $validated['service'] : null);
        $message = $validated['message'];
        if (!empty($validated['date'])) {
            $message .= "\n\nPreferred Date: " . $validated['date'];
        }

        \App\Models\ContactQuery::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'subject' => $subject,
            'message' => $message,
            'status' => 'Unread',
        ]);

        return response()->json([
            'message' => 'Thank you! We\'ll reach out within 24 hours.',
            'data' => $validated
        ], 201);
    }

    /**
     * Handle newsletter subscription.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscribeNewsletter(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255'
        ]);

        $subscriber = \App\Models\NewsletterSubscriber::firstOrCreate(
            ['email' => $validated['email']],
            ['status' => 'Active']
        );

        // If they were previously unsubscribed, resubscribe them
        if (!$subscriber->wasRecentlyCreated && $subscriber->status !== 'Active') {
            $subscriber->update(['status' => 'Active']);
        }

        return response()->json([
            'message' => 'Successfully subscribed to the newsletter!'
        ], 201);
    }
}
