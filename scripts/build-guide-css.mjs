import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const guides = [
  {
    html: 'public/history/henan-history/free.html',
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        henan: {
          red: '#8B0000',
          gold: '#D4A84B',
          dark: '#1A1A2E',
          cream: '#F5F0E8',
          bronze: '#8B7355',
          jade: '#2D6A4F',
        },
      },
    },
  },
  { html: 'public/history/xian-history/free.html', extend: {} },
  {
    html: 'public/ishowspeed/beijing/free.html',
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: { soft: '0 18px 60px rgba(15,23,42,.10)' },
    },
  },
  {
    html: 'public/themed/guangzhou/free.html',
    extend: {
      colors: {
        ink: '#20362F', river: '#315C56', tea: '#8B4E35', gold: '#D6A84F',
        cream: '#F5F0E6', mist: '#EEF3EE', paper: '#FFFBF3', rouge: '#A7473A',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: { card: '0 24px 70px rgba(32,54,47,0.13)' },
    },
  },
  {
    html: 'public/themed/guilin-yangshuo-longji/free.html',
    extend: {
      colors: {
        ink: '#20362F', forest: '#2F6B4F', bamboo: '#5F8D63', river: '#70B6B1',
        terrace: '#D5B86B', clay: '#B66A46', mist: '#F5F0E6', cream: '#FFF9EE',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(32,54,47,.14)',
        card: '0 10px 30px rgba(32,54,47,.10)',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  {
    html: 'public/themed/tibet/free.html',
    extend: {
      colors: {
        plateauBlue: '#244E60', prayerRed: '#B6493B', butterGold: '#D6A84F',
        barley: '#F4E9D7', snow: '#F8F7F2', stone: '#5B5A55', ink: '#202320',
      },
      boxShadow: {
        card: '0 18px 45px rgba(31, 44, 42, 0.12)',
        soft: '0 12px 30px rgba(36, 78, 96, 0.16)',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
];

const inputCss = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n';

for (const guide of guides) {
  const htmlPath = path.join(projectRoot, guide.html);
  const html = await readFile(htmlPath, 'utf8');
  const result = await postcss([
    tailwindcss({
      content: [{ raw: html, extension: 'html' }],
      theme: { extend: guide.extend },
      plugins: [],
    }),
    autoprefixer,
  ]).process(inputCss, { from: undefined });

  const outputPath = path.join(path.dirname(htmlPath), 'tailwind.css');
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, result.css, 'utf8');
  console.log(`Generated ${path.relative(projectRoot, outputPath)}`);
}
