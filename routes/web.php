<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\BlogCategoryController;
use App\Http\Controllers\Admin\HomeContentController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\ContactQueryController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Models\Service;
use Spatie\Sitemap\SitemapGenerator;


Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::get('/generate-sitemap', function () {
    SitemapGenerator::create('https://yourdomain.com')
        ->writeToFile(public_path('sitemap.xml'));

    return 'Sitemap Generated';
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Home Content Management
    Route::get('/home/banners', [HomeContentController::class, 'banners'])->name('home.banners');
    Route::post('/home/banners', [HomeContentController::class, 'storeBanner'])->name('home.banners.store');
    Route::post('/home/banners/{id}', [HomeContentController::class, 'updateBanner'])->name('home.banners.update');
    Route::delete('/home/banners/{id}', [HomeContentController::class, 'deleteBanner'])->name('home.banners.destroy');
    Route::post('/home/banners/{id}/toggle', [HomeContentController::class, 'toggleBannerStatus'])->name('home.banners.toggle');

    Route::get('/home/about', [HomeContentController::class, 'about'])->name('home.about');
    Route::post('/home/about', [HomeContentController::class, 'updateAbout'])->name('home.about.update');

    // Service management routes
    Route::get('/services/all', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/services/create', [ServiceController::class, 'create'])->name('services.create');
    Route::post('/services/store', [ServiceController::class, 'store'])->name('services.store');
    Route::get('/services/{id}/edit', [ServiceController::class, 'edit'])->name('services.edit');
    Route::post('/services/{id}/update', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');
    Route::post('/services/{id}/toggle-status', [ServiceController::class, 'toggleStatus'])->name('services.toggleStatus');
    Route::post('/services/{id}/toggle-featured', [ServiceController::class, 'toggleFeatured'])->name('services.toggleFeatured');

    // Nested Service Packages
    Route::get('/services/packages', [ServiceController::class, 'packages'])->name('services.packages');
    Route::post('/services/{serviceId}/packages', [ServiceController::class, 'savePackage'])->name('services.packages.save');
    Route::delete('/services/packages/{id}', [ServiceController::class, 'deletePackage'])->name('services.packages.delete');

    // Nested Service FAQs
    Route::get('/services/faq', [ServiceController::class, 'faqs'])->name('services.faq');
    Route::post('/services/{serviceId}/faqs', [ServiceController::class, 'saveFaq'])->name('services.faqs.save');
    Route::delete('/services/faqs/{id}', [ServiceController::class, 'deleteFaq'])->name('services.faqs.delete');

    // Nested Service Portfolios & Albums
    Route::post('/services/{serviceId}/portfolios', [ServiceController::class, 'savePortfolio'])->name('services.portfolios.save');
    Route::delete('/services/portfolios/{id}', [ServiceController::class, 'deletePortfolio'])->name('services.portfolios.delete');
    Route::post('/portfolios/{portfolioId}/images', [ServiceController::class, 'uploadPortfolioImage'])->name('portfolios.images.upload');
    Route::delete('/portfolios/images/{id}', [ServiceController::class, 'deletePortfolioImage'])->name('portfolios.images.delete');

    // Category routes
    Route::get('/services/categories', [CategoryController::class, 'all'])->name('categories.index');
    Route::get('/categories/create',[CategoryController::class,'create'])->name('categories.create');
    Route::post('/categories/store',[CategoryController::class,'store'])->name('categories.store');
    Route::post('/categories/{id}',[CategoryController::class,'update'])->name('categories.update');
    Route::delete('/categories/{id}',[CategoryController::class,'destroy'])->name('categories.destroy');
    
    // Blog management routes
    Route::get('/blog/posts', [BlogPostController::class, 'index'])->name('blog.posts');
    Route::get('/blog/posts/create', [BlogPostController::class, 'create'])->name('blog.posts.create');
    Route::post('/blog/posts', [BlogPostController::class, 'store'])->name('blog.posts.store');
    Route::get('/blog/posts/{id}/edit', [BlogPostController::class, 'edit'])->name('blog.posts.edit');
    Route::post('/blog/posts/{id}', [BlogPostController::class, 'update'])->name('blog.posts.update');
    Route::delete('/blog/posts/{id}', [BlogPostController::class, 'destroy'])->name('blog.posts.destroy');
    Route::post('/blog/posts/{id}/restore', [BlogPostController::class, 'restore'])->name('blog.posts.restore');
    Route::delete('/blog/posts/{id}/force', [BlogPostController::class, 'forceDelete'])->name('blog.posts.forceDelete');
    Route::post('/blog/posts/{id}/toggle-status', [BlogPostController::class, 'toggleStatus'])->name('blog.posts.toggleStatus');
    Route::post('/blog/posts/{id}/views', [BlogPostController::class, 'incrementViews'])->name('blog.posts.incrementViews');
    Route::post('/blog/posts/{id}/comments', [BlogPostController::class, 'storeComment'])->name('blog.posts.storeComment');

    // Tag management routes
    Route::get('/blog/tags', [TagController::class, 'index'])->name('blog.tags');
    Route::post('/blog/tags', [TagController::class, 'store'])->name('blog.tags.store');
    Route::delete('/blog/tags/{id}', [TagController::class, 'destroy'])->name('blog.tags.destroy');

    // Blog category routes
    Route::get('/blog/categories', [BlogCategoryController::class, 'index'])->name('blog.categories');
    Route::post('/blog/categories', [BlogCategoryController::class, 'store'])->name('blog.categories.store');
    Route::post('/blog/categories/{id}', [BlogCategoryController::class, 'update'])->name('blog.categories.update');
    Route::delete('/blog/categories/{id}', [BlogCategoryController::class, 'destroy'])->name('blog.categories.destroy');
    
    // Queries
    Route::get('/queries/contact', [ContactQueryController::class, 'index'])->name('queries.contact');
    Route::post('/queries/contact/{id}/status', [ContactQueryController::class, 'updateStatus'])->name('queries.contact.updateStatus');
    Route::delete('/queries/contact/{id}', [ContactQueryController::class, 'destroy'])->name('queries.contact.destroy');
    
    Route::get('/queries/newsletter', [NewsletterController::class, 'index'])->name('queries.newsletter');
    Route::post('/queries/newsletter/{id}/toggle-status', [NewsletterController::class, 'toggleStatus'])->name('queries.newsletter.toggleStatus');
    Route::delete('/queries/newsletter/{id}', [NewsletterController::class, 'destroy'])->name('queries.newsletter.destroy');
    
    Route::get('/queries/support', function () {
        return Inertia::render('Admin/Support');
    })->name('queries.support');
    
    Route::get('/queries/feedback', function () {
        return Inertia::render('Admin/Feedback');
    })->name('queries.feedback');
    
    Route::get('/portfolio/images', function () {
        return Inertia::render('Admin/Portfolio/Index', [
            'services' => Service::orderBy('display_order', 'asc')->get(),
            'portfolios' => \App\Models\Portfolio::with('service')->orderBy('created_at', 'desc')->get()
        ]);
    })->name('portfolio.images');
    
    Route::get('/settings/general', [SettingController::class, 'general'])->name('settings.general');
    Route::post('/settings/general', [SettingController::class, 'updateGeneral'])->name('settings.general.update');
    
    Route::get('/seo/dashboard', function () {
        return Inertia::render('Admin/Settings/SEO');
    })->name('seo.dashboard');
});

require __DIR__.'/auth.php';
