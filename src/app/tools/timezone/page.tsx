'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Clock3, Globe2, Plus, X } from 'lucide-react';
import Link from 'next/link';

type CityClock = {
  id: string;
  city: string;
  country: string;
  flag: string;
  timeZone: string;
};

const CHINA_TIME_ZONE = 'Asia/Shanghai';

const cityClocks: CityClock[] = [
  { id: 'beijing', city: 'Beijing', country: 'China', flag: '🇨🇳', timeZone: CHINA_TIME_ZONE },
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', flag: '🇯🇵', timeZone: 'Asia/Tokyo' },
  { id: 'seoul', city: 'Seoul', country: 'South Korea', flag: '🇰🇷', timeZone: 'Asia/Seoul' },
  { id: 'singapore', city: 'Singapore', country: 'Singapore', flag: '🇸🇬', timeZone: 'Asia/Singapore' },
  { id: 'bangkok', city: 'Bangkok', country: 'Thailand', flag: '🇹🇭', timeZone: 'Asia/Bangkok' },
  { id: 'delhi', city: 'New Delhi', country: 'India', flag: '🇮🇳', timeZone: 'Asia/Kolkata' },
  { id: 'dubai', city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', timeZone: 'Asia/Dubai' },
  { id: 'istanbul', city: 'Istanbul', country: 'Türkiye', flag: '🇹🇷', timeZone: 'Europe/Istanbul' },
  { id: 'moscow', city: 'Moscow', country: 'Russia', flag: '🇷🇺', timeZone: 'Europe/Moscow' },
  { id: 'paris', city: 'Paris', country: 'France', flag: '🇫🇷', timeZone: 'Europe/Paris' },
  { id: 'berlin', city: 'Berlin', country: 'Germany', flag: '🇩🇪', timeZone: 'Europe/Berlin' },
  { id: 'london', city: 'London', country: 'United Kingdom', flag: '🇬🇧', timeZone: 'Europe/London' },
  { id: 'cairo', city: 'Cairo', country: 'Egypt', flag: '🇪🇬', timeZone: 'Africa/Cairo' },
  { id: 'johannesburg', city: 'Johannesburg', country: 'South Africa', flag: '🇿🇦', timeZone: 'Africa/Johannesburg' },
  { id: 'new-york', city: 'New York', country: 'United States', flag: '🇺🇸', timeZone: 'America/New_York' },
  { id: 'los-angeles', city: 'Los Angeles', country: 'United States', flag: '🇺🇸', timeZone: 'America/Los_Angeles' },
  { id: 'toronto', city: 'Toronto', country: 'Canada', flag: '🇨🇦', timeZone: 'America/Toronto' },
  { id: 'mexico-city', city: 'Mexico City', country: 'Mexico', flag: '🇲🇽', timeZone: 'America/Mexico_City' },
  { id: 'sao-paulo', city: 'São Paulo', country: 'Brazil', flag: '🇧🇷', timeZone: 'America/Sao_Paulo' },
  { id: 'sydney', city: 'Sydney', country: 'Australia', flag: '🇦🇺', timeZone: 'Australia/Sydney' },
  { id: 'auckland', city: 'Auckland', country: 'New Zealand', flag: '🇳🇿', timeZone: 'Pacific/Auckland' },
];

const initialClockIds = [
  'beijing',
  'tokyo',
  'delhi',
  'dubai',
  'london',
  'new-york',
  'los-angeles',
  'sydney',
];

export default function TimezonePage() {
  const [now, setNow] = useState<Date | null>(null);
  const [selectedClockIds, setSelectedClockIds] = useState(initialClockIds);
  const [cityToAdd, setCityToAdd] = useState('');

  useEffect(() => {
    const initialFrame = window.requestAnimationFrame(() => setNow(new Date()));
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.clearInterval(timer);
    };
  }, []);

  const selectedClocks = useMemo(
    () =>
      selectedClockIds
        .map((id) => cityClocks.find((clock) => clock.id === id))
        .filter((clock): clock is CityClock => Boolean(clock)),
    [selectedClockIds]
  );

  const availableClocks = cityClocks.filter(
    (clock) => !selectedClockIds.includes(clock.id)
  );

  const addClock = () => {
    if (!cityToAdd || selectedClockIds.includes(cityToAdd)) return;
    setSelectedClockIds((ids) => [...ids, cityToAdd]);
    setCityToAdd('');
  };

  return (
    <main className="min-h-screen bg-[#f7f1e8] pb-16 pt-20 text-black">
      <section className="border-b border-black/10 bg-[#f7f1e8] py-14">
        <div className="container-main max-w-6xl">
          <Link
            href="/tools"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-jade"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tools
          </Link>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-4 py-2 text-sm font-semibold">
                <Globe2 className="h-4 w-4" />
                Live world clocks
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                Compare world time with China
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 md:text-lg">
                See the current time, calendar day, and exact difference from China Standard Time.
                Daylight saving changes are applied automatically.
              </p>
            </div>
            <ChinaTimeSummary now={now} />
          </div>
        </div>
      </section>

      <section className="container-main max-w-6xl py-10">
        <div className="mb-8 rounded-[24px] border border-black/15 bg-white p-4 shadow-sm sm:flex sm:items-end sm:justify-between sm:gap-5">
          <div className="flex-1">
            <label htmlFor="add-world-clock" className="text-sm font-bold text-black">
              Add another country or city
            </label>
            <select
              id="add-world-clock"
              value={cityToAdd}
              onChange={(event) => setCityToAdd(event.target.value)}
              className="mt-2 w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm font-semibold text-black outline-none focus:border-jade focus:ring-2 focus:ring-jade/20"
            >
              <option value="">Select a city</option>
              {availableClocks.map((clock) => (
                <option key={clock.id} value={clock.id}>
                  {clock.flag} {clock.city}, {clock.country}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={addClock}
            disabled={!cityToAdd}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-jade px-5 py-3 text-sm font-bold text-black transition hover:bg-jade/80 disabled:cursor-not-allowed disabled:opacity-45 sm:mt-0 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add clock
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {selectedClocks.map((clock) => (
            <WorldClockCard
              key={clock.id}
              clock={clock}
              now={now}
              onRemove={
                clock.id === 'beijing'
                  ? undefined
                  : () =>
                      setSelectedClockIds((ids) => ids.filter((id) => id !== clock.id))
              }
            />
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-black/10 bg-white/65 px-5 py-4 text-sm leading-6 text-black">
          <strong>Planning tip:</strong> China uses one national time zone (UTC+8). A “previous
          day” label means it is still yesterday in that city compared with the current date in
          China.
        </div>
      </section>
    </main>
  );
}

function ChinaTimeSummary({ now }: { now: Date | null }) {
  if (!now) {
    return <div className="h-24 w-full max-w-xs animate-pulse rounded-[22px] bg-black/5" />;
  }

  return (
    <div className="min-w-72 rounded-[22px] border border-black/15 bg-white px-5 py-4 shadow-sm">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
        <Clock3 className="h-4 w-4 text-jade" />
        China Standard Time
      </p>
      <p className="mt-2 font-mono text-3xl font-bold tabular-nums">
        {formatTime(now, CHINA_TIME_ZONE, true)}
      </p>
      <p className="mt-1 text-sm font-medium">{formatDate(now, CHINA_TIME_ZONE)}</p>
    </div>
  );
}

function WorldClockCard({
  clock,
  now,
  onRemove,
}: {
  clock: CityClock;
  now: Date | null;
  onRemove?: () => void;
}) {
  const isChina = clock.timeZone === CHINA_TIME_ZONE;
  const clockTime = now ? getClockTime(now, clock.timeZone) : null;
  const difference = now ? getDifferenceFromChina(now, clock.timeZone) : null;
  const dayRelation = now ? getDayRelation(now, clock.timeZone) : '';

  return (
    <article
      className={`relative overflow-hidden rounded-[28px] border p-5 shadow-sm ${
        isChina ? 'border-jade bg-jade/10' : 'border-black/15 bg-white'
      }`}
    >
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-3 top-3 rounded-full p-2 text-black transition hover:bg-black/5"
          aria-label={`Remove ${clock.city} clock`}
        >
          <X className="h-4 w-4" />
        </button>
      )}

      <div className="pr-8">
        <p className="text-2xl" aria-hidden="true">
          {clock.flag}
        </p>
        <h2 className="mt-2 text-xl font-bold text-black">{clock.city}</h2>
        <p className="mt-1 text-sm font-medium text-black">{clock.country}</p>
      </div>

      <div className="my-6 flex justify-center">
        {clockTime ? (
          <AnalogClock time={clockTime} label={`${clock.city} current time`} />
        ) : (
          <div className="h-36 w-36 animate-pulse rounded-full bg-black/5" />
        )}
      </div>

      {now && clockTime && difference ? (
        <>
          <p className="text-center font-mono text-2xl font-bold tabular-nums text-black">
            {formatTime(now, clock.timeZone, false)}
          </p>
          <p className="mt-1 text-center text-sm font-medium text-black">
            {formatDate(now, clock.timeZone)}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-black px-3 py-1.5 text-xs font-bold text-white">
              {difference}
            </span>
            <span className="rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-bold text-black">
              {dayRelation}
            </span>
          </div>
        </>
      ) : (
        <div className="mx-auto h-16 w-4/5 animate-pulse rounded-xl bg-black/5" />
      )}
    </article>
  );
}

function AnalogClock({
  time,
  label,
}: {
  time: { hour: number; minute: number; second: number };
  label: string;
}) {
  const hourDegrees = ((time.hour % 12) + time.minute / 60) * 30;
  const minuteDegrees = (time.minute + time.second / 60) * 6;
  const secondDegrees = time.second * 6;

  return (
    <div
      className="relative h-36 w-36 rounded-full border-4 border-black bg-[#fffdf8] shadow-inner"
      role="img"
      aria-label={label}
    >
      {Array.from({ length: 12 }, (_, index) => (
        <span
          key={index}
          className="absolute inset-[5px]"
          style={{ transform: `rotate(${index * 30}deg)` }}
        >
          <span
            className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-black ${
              index % 3 === 0 ? 'h-3 w-1' : 'h-2 w-0.5'
            }`}
          />
        </span>
      ))}
      <span
        className="absolute bottom-1/2 left-1/2 h-9 w-1.5 origin-bottom -translate-x-1/2 rounded-full bg-black"
        style={{ transform: `translateX(-50%) rotate(${hourDegrees}deg)` }}
      />
      <span
        className="absolute bottom-1/2 left-1/2 h-12 w-1 origin-bottom -translate-x-1/2 rounded-full bg-black"
        style={{ transform: `translateX(-50%) rotate(${minuteDegrees}deg)` }}
      />
      <span
        className="absolute bottom-1/2 left-1/2 h-[52px] w-0.5 origin-bottom -translate-x-1/2 bg-red-600"
        style={{ transform: `translateX(-50%) rotate(${secondDegrees}deg)` }}
      />
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 ring-2 ring-white" />
    </div>
  );
}

function getClockTime(date: Date, timeZone: string) {
  const parts = getDateTimeParts(date, timeZone);
  return {
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function getDifferenceFromChina(date: Date, timeZone: string) {
  const differenceMinutes =
    getTimeZoneOffsetMinutes(date, timeZone) -
    getTimeZoneOffsetMinutes(date, CHINA_TIME_ZONE);

  if (differenceMinutes === 0) return 'Same time as China';

  const absoluteMinutes = Math.abs(differenceMinutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;
  const timeParts = [
    hours ? `${hours} hr${hours === 1 ? '' : 's'}` : '',
    minutes ? `${minutes} min` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `${timeParts} ${differenceMinutes > 0 ? 'ahead of' : 'behind'} China`;
}

function getDayRelation(date: Date, timeZone: string) {
  const china = getDateTimeParts(date, CHINA_TIME_ZONE);
  const local = getDateTimeParts(date, timeZone);
  const chinaDay = Date.UTC(Number(china.year), Number(china.month) - 1, Number(china.day));
  const localDay = Date.UTC(Number(local.year), Number(local.month) - 1, Number(local.day));
  const dayDifference = Math.round((localDay - chinaDay) / 86_400_000);

  if (dayDifference < 0) return 'Previous day';
  if (dayDifference > 0) return 'Next day';
  return 'Same day';
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const parts = getDateTimeParts(date, timeZone);
  const localAsUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  const timestampWithoutMilliseconds = Math.floor(date.getTime() / 1000) * 1000;
  return Math.round((localAsUtc - timestampWithoutMilliseconds) / 60_000);
}

function getDateTimeParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  );
}

function formatTime(date: Date, timeZone: string, includeSeconds: boolean) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hourCycle: 'h23',
  }).format(date);
}

function formatDate(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
