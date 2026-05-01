'use client';

import { useEffect, useState } from 'react';
import { ArrowRightLeft, Calculator } from 'lucide-react';

const exchangeRates: Record<string, number> = {
  CNY: 1,
  USD: 0.14,
  EUR: 0.13,
  GBP: 0.11,
  JPY: 21.48,
  KRW: 188.32,
  AUD: 0.21,
  CAD: 0.19,
  SGD: 0.19,
  HKD: 1.09,
};

const currencyInfo: Record<string, { name: string; symbol: string }> = {
  CNY: { name: 'Chinese yuan', symbol: '¥' },
  USD: { name: 'US dollar', symbol: '$' },
  EUR: { name: 'Euro', symbol: '€' },
  GBP: { name: 'British pound', symbol: '£' },
  JPY: { name: 'Japanese yen', symbol: '¥' },
  KRW: { name: 'South Korean won', symbol: '₩' },
  AUD: { name: 'Australian dollar', symbol: 'A$' },
  CAD: { name: 'Canadian dollar', symbol: 'C$' },
  SGD: { name: 'Singapore dollar', symbol: 'S$' },
  HKD: { name: 'Hong Kong dollar', symbol: 'HK$' },
};

const currencies = Object.keys(exchangeRates);

export default function CurrencyPage() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('CNY');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const baseAmount = amount / exchangeRates[fromCurrency];
    setResult(baseAmount * exchangeRates[toCurrency]);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="bg-gradient-to-br from-primary via-secondary-900 to-secondary-800 py-16 text-white">
        <div className="container-main max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <Calculator className="h-4 w-4" />
            Currency converter
          </div>
          <h1 className="text-4xl font-bold">Quick budget framing for international travelers</h1>
          <p className="mt-4 text-white/75">
            Use this lightweight demo tool to estimate costs between CNY and common origin-market currencies.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-main max-w-3xl">
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <label className="block text-sm font-medium text-secondary-500">Amount</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value) || 0)}
              className="input-field mt-2 text-2xl font-semibold"
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <div>
                <label className="block text-sm font-medium text-secondary-500">From</label>
                <select value={fromCurrency} onChange={(event) => setFromCurrency(event.target.value)} className="input-field mt-2">
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency} · {currencyInfo[currency].name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setFromCurrency(toCurrency);
                  setToCurrency(fromCurrency);
                }}
                className="mx-auto rounded-full bg-secondary-100 p-3 text-secondary-700 transition-colors hover:bg-secondary-200"
                aria-label="Swap currencies"
              >
                <ArrowRightLeft className="h-5 w-5" />
              </button>

              <div>
                <label className="block text-sm font-medium text-secondary-500">To</label>
                <select value={toCurrency} onChange={(event) => setToCurrency(event.target.value)} className="input-field mt-2">
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency} · {currencyInfo[currency].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 rounded-[28px] bg-secondary-900 p-8 text-white">
              <p className="text-sm text-white/55">
                {currencyInfo[fromCurrency].symbol}
                {amount.toLocaleString()} {fromCurrency}
              </p>
              <p className="mt-3 text-4xl font-bold">
                {currencyInfo[toCurrency].symbol}
                {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
              </p>
              <p className="mt-3 text-sm text-white/60">Illustrative rate only. Replace with live FX later if needed.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
