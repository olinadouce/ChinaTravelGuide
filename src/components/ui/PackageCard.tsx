'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Check, Star } from 'lucide-react';
import { PricingPackage } from '@/types';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  pkg: PricingPackage;
  index: number;
}

export function PackageCard({ pkg, index }: PackageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'group relative overflow-hidden rounded-[28px] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md',
        pkg.popular && 'ring-2 ring-primary'
      )}
    >
      {pkg.badge && (
        <div className={cn(
          'absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide',
          pkg.popular ? 'bg-primary text-white' : 'bg-accent text-secondary-900'
        )}>
          {pkg.badge}
        </div>
      )}

      {pkg.popular && !pkg.badge && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Popular
        </div>
      )}

      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-secondary-900">{pkg.name}</h3>
            <p className="mt-1 text-sm text-secondary-600">{pkg.tagline}</p>
          </div>
          {pkg.popular && (
            <Star className="h-5 w-5 flex-shrink-0 fill-primary text-primary" />
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-secondary-600">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {pkg.destination}
          </span>
        </div>

        <p className="mt-4 text-sm text-secondary-600">
          {pkg.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {pkg.features.slice(0, 4).map((feature, i) => (
            <span key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 flex-shrink-0 text-jade" />
              <span className="truncate text-secondary-700">{feature}</span>
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-secondary-100 pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-jade">{pkg.price}</span>
              {pkg.originalPrice && (
                <span className="text-sm text-secondary-400 line-through">
                  {pkg.originalPrice}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-secondary-500">per person</p>
          </div>
          <Link href={`/packages/${pkg.slug}`} className="btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}