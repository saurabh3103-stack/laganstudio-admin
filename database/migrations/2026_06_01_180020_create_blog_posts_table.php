<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->string('status')->default('Draft'); // Draft, Published
            $table->integer('views')->default(0);
            $table->timestamp('published_at')->nullable(); // Scheduled publishing
            $table->softDeletes(); // Soft Delete

            // SEO & Social Meta Configuration (WordPress Yoast-like controls)
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->text('seo_keywords')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('robots_index')->default('index'); // 'index' / 'noindex'
            $table->string('robots_follow')->default('follow'); // 'follow' / 'nofollow'
            $table->jsonb('schema_markup')->nullable(); // Rich schema support (JSON-LD)

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
