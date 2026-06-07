<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServicePackage;
use App\Models\ServiceFaq;
use App\Models\Portfolio;
use App\Models\PortfolioImage;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Wedding Photography Service
        $wedding = Service::create([
            'service_name' => 'Wedding Photography',
            'slug' => 'wedding-photography',
            'short_description' => 'Royal cinematic wedding stories, candid documentation, and premium heirloom albums.',
            'description' => 'Our flagship service dedicated to transforming your grand wedding days into timeless cinematic folklore. We combine high-end documentary filmmaking with breathtaking candids, capturing every raw emotion, laughter, and tear. Using state-of-the-art camera systems, drone photography, and a dedicated team of master storytellers, we deliver visual masterpieces that you and your generations will cherish forever.',
            'featured_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
            'banner_image' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
            'service_icon' => 'feather__camera',
            'display_order' => 1,
            'status' => 1,
            'featured' => 1,
            'meta_title' => 'Award-Winning Wedding Photography & Cinematography Services',
            'meta_description' => 'Capture the royal essence of your wedding with our premium candid photography, cinematic films, and heirloom print albums. Inquire now.',
            'meta_keywords' => 'wedding photography, cinematic wedding, wedding videos, candid wedding photos, indian wedding photographer',
            'canonical_url' => 'https://laganstudio.com/services/wedding-photography',
            'robots' => 'index,follow',
            'og_title' => 'Royal Wedding Photography & Cinematography - Lagan Studio',
            'og_description' => 'Relive your grand day through royal cinematic lenses and bespoke wedding print books.',
            'og_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
            'schema_type' => 'Service',
        ]);

        // Packages for Wedding
        ServicePackage::create([
            'service_id' => $wedding->id,
            'package_name' => 'Silver Heirloom',
            'price' => 150000.00,
            'description' => 'Perfect for intimate family weddings and close gatherings.',
            'features' => [
                '1 Lead Candid Photographer',
                '1 Traditional Videographer',
                'Full Day Coverage (up to 10 hours)',
                '150 Fully Processed High-Res Photos',
                '3-Minute Cinematic Highlight Reel',
                'Standard Album Book (40 Pages)',
            ],
            'delivery_days' => 30,
            'display_order' => 1,
            'status' => 1,
        ]);

        ServicePackage::create([
            'service_id' => $wedding->id,
            'package_name' => 'Royal Gold Cinematic',
            'price' => 250000.00,
            'description' => 'Our highly popular package covering complete rituals with cinematic grandeur.',
            'features' => [
                '2 Senior Candid Photographers',
                '1 Drone Cinematographer',
                '1 Main Cinematic Director',
                'Full Day + Pre-wedding Rituals',
                '300 Fully Retouched Digital Photos',
                '10-Minute Cinematic Wedding Film',
                'Royal Glass-Cover Album (60 Pages)',
            ],
            'delivery_days' => 45,
            'display_order' => 2,
            'status' => 1,
        ]);

        ServicePackage::create([
            'service_id' => $wedding->id,
            'package_name' => 'Imperial Platinum Legacy',
            'price' => 400000.00,
            'description' => 'The ultimate royal print & cinematic experience for grand luxury weddings.',
            'features' => [
                '3 Senior Candid & Editorial Photographers',
                '2 Cinematic Directors (4K HDR Capture)',
                'Dedicated Drone Team & Jib Arms',
                'Full-day coverage across all side events',
                'Unlimited Edited Digital Photos',
                '30-Minute Documentary Film + Highlights',
                'Two 12x15 Imperial Leather Albums',
                'Same-Day Edit Video Teaser (60 seconds)',
            ],
            'delivery_days' => 60,
            'display_order' => 3,
            'status' => 1,
        ]);

        // FAQs for Wedding
        ServiceFaq::create([
            'service_id' => $wedding->id,
            'question' => 'Do you travel globally for destination weddings?',
            'answer' => 'Yes, we absolute love destination weddings and travel worldwide! All travel and accommodation charges for the shoot team are standardly taken care of by the clients.',
            'display_order' => 1,
            'status' => 1,
        ]);

        ServiceFaq::create([
            'service_id' => $wedding->id,
            'question' => 'How long does it take to deliver the photos and cinematic films?',
            'answer' => 'We maintain premium post-production standards. High-res edited digital photos are typically delivered within 30 days. Final cinematic movies, documentary edits, and print albums are delivered between 45 to 60 days.',
            'display_order' => 2,
            'status' => 1,
        ]);

        ServiceFaq::create([
            'service_id' => $wedding->id,
            'question' => 'Can we customize package details or add days?',
            'answer' => 'Yes, absolutely! Every grand event has its own schedule. We can fully customize and adapt any package by adding extra days, additional print albums, special pre-wedding shoots, or live-broadcasting options as needed.',
            'display_order' => 3,
            'status' => 1,
        ]);

        // Portfolios for Wedding
        $sharma = Portfolio::create([
            'service_id' => $wedding->id,
            'title' => 'Sharma Wedding',
            'description' => 'A royal traditional wedding story in Delhi with rich gold hues and emotional highlights.',
            'cover_image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
            'event_date' => '2026-02-14',
            'location' => 'Taj Palace, New Delhi',
            'featured' => 1,
            'status' => 1,
        ]);

        PortfolioImage::create([
            'portfolio_id' => $sharma->id,
            'image' => 'https://images.unsplash.com/photo-1519225495810-7512c696505a?w=800&q=80',
            'alt_text' => 'Sharma Wedding Varmala Moment',
            'display_order' => 1,
        ]);
        PortfolioImage::create([
            'portfolio_id' => $sharma->id,
            'image' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
            'alt_text' => 'Sharma Wedding Groom Entrance',
            'display_order' => 2,
        ]);

        $gupta = Portfolio::create([
            'service_id' => $wedding->id,
            'title' => 'Gupta Wedding',
            'description' => 'A vibrant modern wedding celebration in Mumbai filled with high energy dance and gorgeous lighting.',
            'cover_image' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
            'event_date' => '2026-03-20',
            'location' => 'Grand Hyatt, Mumbai',
            'featured' => 0,
            'status' => 1,
        ]);

        PortfolioImage::create([
            'portfolio_id' => $gupta->id,
            'image' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
            'alt_text' => 'Gupta Bride Portrait',
            'display_order' => 1,
        ]);
        PortfolioImage::create([
            'portfolio_id' => $gupta->id,
            'image' => 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
            'alt_text' => 'Gupta Sangeet Night',
            'display_order' => 2,
        ]);

        $jaipur = Portfolio::create([
            'service_id' => $wedding->id,
            'title' => 'Destination Wedding Jaipur',
            'description' => 'A mesmerizing royal destination wedding held in a historic fort in Jaipur.',
            'cover_image' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
            'event_date' => '2026-01-08',
            'location' => 'Chomu Palace, Jaipur',
            'featured' => 1,
            'status' => 1,
        ]);

        PortfolioImage::create([
            'portfolio_id' => $jaipur->id,
            'image' => 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
            'alt_text' => 'Jaipur Fort Bridal Walk',
            'display_order' => 1,
        ]);
        PortfolioImage::create([
            'portfolio_id' => $jaipur->id,
            'image' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
            'alt_text' => 'Jaipur Fort Pheras Moment',
            'display_order' => 2,
        ]);


        // 2. Create Heritage Pre-Wedding Service
        $prewedding = Service::create([
            'service_name' => 'Heritage Pre-Wedding',
            'slug' => 'heritage-pre-wedding',
            'short_description' => 'Cinematic outdoor pre-wedding couple shoots in historic forts and romantic locations.',
            'description' => 'A breathtaking outdoor visual story capturing your connection before the wedding. From historic royal palaces and forts of Rajasthan to high-end contemporary locations, we direct premium romantic films and candids capturing the excitement and anticipation of your new chapter.',
            'featured_image' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
            'banner_image' => 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
            'service_icon' => 'feather__heart',
            'display_order' => 2,
            'status' => 1,
            'featured' => 0,
            'meta_title' => 'Premium Pre-Wedding Photography & Couple Films',
            'meta_description' => 'Book your dream pre-wedding shoot with our cinematic couple film directors. Shoot in grand heritage forts and romantic destinations.',
            'meta_keywords' => 'pre wedding shoot, couple film, pre wedding photography, rajasthan pre wedding',
            'canonical_url' => 'https://laganstudio.com/services/heritage-pre-wedding',
            'robots' => 'index,follow',
            'og_title' => 'Premium Pre-Wedding Couple Shoots - Lagan Studio',
            'og_description' => 'Cinematic couple stories directed in majestic royal palaces and heritage spots.',
            'og_image' => 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
            'schema_type' => 'Service',
        ]);

        ServicePackage::create([
            'service_id' => $prewedding->id,
            'package_name' => 'Royal Heritage',
            'price' => 65000.00,
            'description' => 'Full-day outdoor romantic couple shoot.',
            'features' => [
                '1 Senior Couple Portrait Photographer',
                '1 Cinematic Film Director',
                '2 Beautiful Outdoor Heritage Locations',
                '3 Costume Changes Supported',
                '50 Fine-Art Retouched Couple Photos',
                '3-Minute Romantic Music Video Film',
            ],
            'delivery_days' => 20,
            'display_order' => 1,
            'status' => 1,
        ]);
    }
}
