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
        Schema::table('blog_posts', function (Blueprint $table) {
            // Drop old foreign key constraint and column if they exist
            if (Schema::hasColumn('blog_posts', 'category_id')) {
                $table->dropForeign(['category_id']);
                $table->dropColumn('category_id');
            }

            // Create new foreign key column pointing to blog_categories
            $table->foreignId('blog_category_id')
                ->nullable()
                ->after('author_id')
                ->constrained('blog_categories')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            if (Schema::hasColumn('blog_posts', 'blog_category_id')) {
                $table->dropForeign(['blog_category_id']);
                $table->dropColumn('blog_category_id');
            }

            $table->foreignId('category_id')
                ->nullable()
                ->after('author_id')
                ->constrained('categories')
                ->onDelete('set null');
        });
    }
};
