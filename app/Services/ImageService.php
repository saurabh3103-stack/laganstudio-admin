<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageService
{
    /**
     * Upload an image, convert it to WebP format, and save it.
     *
     * @param UploadedFile $file The uploaded file.
     * @param string $path The directory path to save the image.
     * @param string $disk The storage disk to use.
     * @return string The path to the saved WebP image.
     */
    public function uploadAndConvert(UploadedFile $file, string $path, string $disk = 'public'): string
    {
        // Create an image manager instance with the GD driver
        $manager = new ImageManager(new Driver());

        // Read the image from the uploaded file
        $image = $manager->read($file->getRealPath());

        // Generate a unique filename with .webp extension
        // Using hash to ensure no special characters from original filename
        $filename = md5(uniqid('', true) . time()) . '.webp';
        
        // Clean up the directory path
        $path = rtrim($path, '/');
        $fullPath = $path . '/' . $filename;

        // Encode image to webp format (80 quality)
        $encodedImage = $image->toWebp(80);

        // Store the encoded image using Laravel's Storage facade
        Storage::disk($disk)->put($fullPath, $encodedImage->toString());

        return $fullPath;
    }
}
