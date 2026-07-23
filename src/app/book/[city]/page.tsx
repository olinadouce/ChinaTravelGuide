import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BookCityProducts } from '@/components/book/BookCityProducts';
import { bookingCities, getBookingCity, getProductsForCity } from '@/data/bookings';

export function generateStaticParams() {
  return bookingCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getBookingCity(slug);
  if (!city) return { title: 'Booking city not found' };
  return {
    title: `Book ${city.name} - Hotels, Attractions & Tours`,
    description: city.description,
  };
}

export default async function BookCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getBookingCity(slug);
  if (!city) notFound();

  return (
    <main className="min-h-screen">
      <BookCityProducts
        city={city}
        cities={bookingCities}
        products={getProductsForCity(slug)}
      />
    </main>
  );
}
