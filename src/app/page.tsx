import Hero from '@/components/sections/Hero';
import FeaturedDestinations from '@/components/sections/FeaturedDestinations';
import FeaturedJourneys from '@/components/sections/FeaturedJourneys';
import FeaturedPackages from '@/components/sections/FeaturedPackages';
import TravelInfo from '@/components/sections/TravelInfo';
import Newsletter from '@/components/sections/Newsletter';
import { getAllPackages } from '@/data/packages';

export default function HomePage() {
  const heroSlides = getAllPackages().map((pkg) => ({
    slug: pkg.slug,
    name: pkg.name,
    destination: pkg.destination,
    duration: pkg.duration,
    coverImage: pkg.coverImage,
    badge: pkg.badge,
    shortDescription: pkg.shortDescription,
  }));

  return (
    <div className="bg-[#f7f1e8] dark:bg-[#0b1220]">
      <Hero slides={heroSlides} />
      <FeaturedDestinations />
      <FeaturedJourneys />
      <FeaturedPackages />
      <TravelInfo />
      <Newsletter />
    </div>
  );
}
