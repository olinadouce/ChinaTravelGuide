'use client';

import { useMemo, useState } from 'react';
import { Languages, Search, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Phrase = {
  chinese: string;
  pinyin: string;
  english: string;
};

type PhraseCategory = 'greetings' | 'basics' | 'dining' | 'transport' | 'shopping' | 'emergency';

const phraseCategories: Array<{ id: PhraseCategory; label: string }> = [
  { id: 'greetings', label: 'Greetings' },
  { id: 'basics', label: 'Basics' },
  { id: 'dining', label: 'Dining' },
  { id: 'transport', label: 'Transport' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'emergency', label: 'Emergency' },
];

const phraseMap: Record<PhraseCategory, Phrase[]> = {
  greetings: [
    { chinese: '你好', pinyin: 'Ni hao', english: 'Hello' },
    { chinese: '早上好', pinyin: 'Zao shang hao', english: 'Good morning' },
    { chinese: '谢谢', pinyin: 'Xie xie', english: 'Thank you' },
    { chinese: '再见', pinyin: 'Zai jian', english: 'Goodbye' },
  ],
  basics: [
    { chinese: '是', pinyin: 'Shi', english: 'Yes' },
    { chinese: '不是', pinyin: 'Bu shi', english: 'No' },
    { chinese: '我听不懂', pinyin: 'Wo ting bu dong', english: 'I do not understand' },
    { chinese: '请帮我', pinyin: 'Qing bang wo', english: 'Please help me' },
  ],
  dining: [
    { chinese: '菜单', pinyin: 'Cai dan', english: 'Menu' },
    { chinese: '买单', pinyin: 'Mai dan', english: 'Bill please' },
    { chinese: '不要辣', pinyin: 'Bu yao la', english: 'Not spicy, please' },
    { chinese: '很好吃', pinyin: 'Hen hao chi', english: 'Very delicious' },
  ],
  transport: [
    { chinese: '火车站在哪里？', pinyin: 'Huo che zhan zai na li?', english: 'Where is the train station?' },
    { chinese: '地铁站在哪里？', pinyin: 'Di tie zhan zai na li?', english: 'Where is the subway station?' },
    { chinese: '我要去机场', pinyin: 'Wo yao qu ji chang', english: 'I want to go to the airport' },
    { chinese: '请带我去这里', pinyin: 'Qing dai wo qu zhe li', english: 'Please take me here' },
  ],
  shopping: [
    { chinese: '多少钱？', pinyin: 'Duo shao qian?', english: 'How much is it?' },
    { chinese: '太贵了', pinyin: 'Tai gui le', english: 'Too expensive' },
    { chinese: '可以便宜一点吗？', pinyin: 'Ke yi pian yi yi dian ma?', english: 'Can it be cheaper?' },
    { chinese: '我想试一下', pinyin: 'Wo xiang shi yi xia', english: 'I want to try this' },
  ],
  emergency: [
    { chinese: '救命', pinyin: 'Jiu ming', english: 'Help' },
    { chinese: '请叫警察', pinyin: 'Qing jiao jing cha', english: 'Please call the police' },
    { chinese: '我迷路了', pinyin: 'Wo mi lu le', english: 'I am lost' },
    { chinese: '我需要医生', pinyin: 'Wo xu yao yi sheng', english: 'I need a doctor' },
  ],
};

export default function PhrasesPage() {
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory>('greetings');
  const [searchQuery, setSearchQuery] = useState('');

  const phrases = useMemo<Phrase[]>(() => {
    if (!searchQuery) {
      return phraseMap[selectedCategory];
    }

    return Object.values(phraseMap)
      .flat()
      .filter(
        (phrase: Phrase) =>
          phrase.chinese.includes(searchQuery) ||
          phrase.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          phrase.english.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, selectedCategory]);

  const speakPhrase = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e8] pt-20">
      <section className="bg-gradient-to-br from-jade via-secondary-900 to-secondary-800 py-16 text-white">
        <div className="container-main max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <Languages className="h-4 w-4" />
            Phrasebook
          </div>
          <h1 className="text-4xl font-bold">Essential Mandarin for smoother day-to-day travel</h1>
          <p className="mt-4 text-white/75">
            A lightweight phrase utility helps the site feel genuinely useful for overseas visitors, especially on mobile.
          </p>
        </div>
      </section>

      <section className="sticky top-16 z-20 border-b border-secondary-200 bg-white/95 py-5 backdrop-blur">
        <div className="container-main max-w-3xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by Chinese, pinyin, or English"
              className="input-field pl-12"
            />
          </div>
        </div>
      </section>

      {!searchQuery && (
        <section className="bg-white py-5">
          <div className="container-main flex max-w-3xl flex-wrap gap-2">
            {phraseCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  selectedCategory === category.id ? 'bg-jade text-white' : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="py-8">
        <div className="container-main max-w-3xl space-y-3">
          {phrases.map((phrase) => (
            <div key={`${phrase.chinese}-${phrase.english}`} className="flex items-start justify-between gap-4 rounded-[28px] bg-white p-5 shadow-sm">
              <div>
                <p className="text-2xl font-medium text-secondary-900">{phrase.chinese}</p>
                <p className="mt-1 text-secondary-500">{phrase.pinyin}</p>
                <p className="mt-2 text-secondary-700">{phrase.english}</p>
              </div>
              <button
                onClick={() => speakPhrase(phrase.chinese)}
                className="rounded-full bg-jade/10 p-3 text-jade transition-colors hover:bg-jade/20"
                aria-label={`Play pronunciation for ${phrase.english}`}
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
