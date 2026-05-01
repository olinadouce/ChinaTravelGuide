import Hero from '@/components/sections/Hero';
import FeaturedDestinations from '@/components/sections/FeaturedDestinations';
import FeaturedJourneys from '@/components/sections/FeaturedJourneys';
import TravelInfo from '@/components/sections/TravelInfo';
import Newsletter from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <div className="bg-sky-100">
      <Hero />
      <FeaturedDestinations />
      <FeaturedJourneys />
      <TravelInfo />
      <Newsletter />
    </div>
  );
}
