'use client';

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type ForumImageGalleryProps = {
  images: string[];
  title: string;
};

export function ForumImageGallery({ images, title }: ForumImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft' && images.length > 1) showPrevious();
      if (event.key === 'ArrowRight' && images.length > 1) showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length, lightboxOpen, showNext, showPrevious]);

  if (images.length === 0) return null;

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || images.length < 2) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

  return (
    <>
      <div className="bg-secondary-950">
        <div
          className="group relative flex h-72 touch-pan-y items-center justify-center sm:h-[28rem]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="h-full w-full cursor-zoom-in"
            aria-label={`Open image ${activeIndex + 1} of ${images.length}`}
          >
            <img
              src={images[activeIndex]}
              alt={`${title} — image ${activeIndex + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
          <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-bold text-white">
            <Expand className="h-3.5 w-3.5" />
            {activeIndex + 1}/{images.length}
          </span>
          {images.length > 1 && (
            <>
              <GalleryArrow direction="previous" onClick={showPrevious} />
              <GalleryArrow direction="next" onClick={showNext} />
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-4 py-3">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition',
                  index === activeIndex ? 'border-primary' : 'border-transparent opacity-65 hover:opacity-100'
                )}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === activeIndex}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex touch-pan-y items-center justify-center bg-black/95 p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Close image viewer"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={images[activeIndex]}
            alt={`${title} — image ${activeIndex + 1}`}
            className="max-h-full max-w-full select-none object-contain"
          />
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1.5 text-sm font-bold text-white">
            {activeIndex + 1} / {images.length}
          </span>
          {images.length > 1 && (
            <>
              <GalleryArrow direction="previous" onClick={showPrevious} large />
              <GalleryArrow direction="next" onClick={showNext} large />
            </>
          )}
        </div>
      )}
    </>
  );
}

function GalleryArrow({
  direction,
  onClick,
  large = false,
}: {
  direction: 'previous' | 'next';
  onClick: () => void;
  large?: boolean;
}) {
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        'absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 text-white transition hover:bg-black/75',
        direction === 'previous' ? 'left-3 sm:left-5' : 'right-3 sm:right-5',
        large ? 'p-3 sm:p-4' : 'p-2.5'
      )}
      aria-label={direction === 'previous' ? 'Previous image' : 'Next image'}
    >
      <Icon className={large ? 'h-7 w-7' : 'h-5 w-5'} />
    </button>
  );
}
