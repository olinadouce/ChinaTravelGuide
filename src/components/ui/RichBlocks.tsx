import { Fragment } from 'react';
import {
  AlertTriangle,
  BedDouble,
  BriefcaseMedical,
  Info,
  Languages,
  Lightbulb,
  Train,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import type { InlineRun, RichBlock } from '@/types';

export function renderRuns(runs: InlineRun[]): React.ReactNode {
  return runs.map((run, index) => {
    if (run.bold) {
      return (
        <strong key={index} className="font-semibold text-secondary-900">
          {run.text}
        </strong>
      );
    }
    if (run.italic) {
      return (
        <em key={index} className="italic">
          {run.text}
        </em>
      );
    }
    if (run.underline) {
      return (
        <u key={index} className="underline">
          {run.text}
        </u>
      );
    }
    return <Fragment key={index}>{run.text}</Fragment>;
  });
}

function CalloutIcon({ tone }: { tone: 'info' | 'warning' | 'tip' }) {
  if (tone === 'warning') {
    return <AlertTriangle className="h-5 w-5 shrink-0 text-primary" />;
  }
  if (tone === 'tip') {
    return <Lightbulb className="h-5 w-5 shrink-0 text-emerald-600" />;
  }
  return <Info className="h-5 w-5 shrink-0 text-secondary-700" />;
}

function calloutClass(tone: 'info' | 'warning' | 'tip'): string {
  if (tone === 'warning') {
    return 'bg-primary-50 text-secondary-800';
  }
  if (tone === 'tip') {
    return 'bg-emerald-50 text-secondary-800';
  }
  return 'bg-secondary-50 text-secondary-800';
}

function Heading({ level, text }: { level: 2 | 3; text: string }) {
  if (level === 2) {
    return (
      <h2 className="mt-12 mb-4 text-3xl font-bold text-secondary-900 first:mt-0">
        {text}
      </h2>
    );
  }
  return (
    <h3 className="mt-8 mb-3 text-2xl font-semibold text-secondary-900">
      {text}
    </h3>
  );
}

function ParagraphBlock({ runs }: { runs: InlineRun[] }) {
  return (
    <p className="mt-4 text-base leading-7 text-secondary-700 first:mt-0">
      {renderRuns(runs)}
    </p>
  );
}

function ListBlock({ ordered, items }: { ordered: boolean; items: InlineRun[][] }) {
  const Tag = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal' : 'list-disc';
  return (
    <Tag className={`mt-4 space-y-2 pl-6 text-secondary-700 ${listClass}`}>
      {items.map((item, index) => (
        <li key={index} className="leading-7">
          {renderRuns(item)}
        </li>
      ))}
    </Tag>
  );
}

function TableBlock({
  headers,
  rows,
}: {
  headers: InlineRun[];
  rows: InlineRun[][][];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-3xl border border-secondary-200">
      <table className="w-full text-left text-sm">
        {headers.length > 0 && (
          <thead className="bg-secondary-50 text-secondary-900">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 font-semibold">
                  {renderRuns([header])}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-t border-secondary-100 px-4 py-3 text-secondary-700"
                >
                  {renderRuns(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalloutBlock({ tone, runs }: { tone: 'info' | 'warning' | 'tip'; runs: InlineRun[] }) {
  return (
    <div className={`mt-6 flex gap-4 rounded-3xl p-5 ${calloutClass(tone)}`}>
      <CalloutIcon tone={tone} />
      <p className="text-base leading-7">{renderRuns(runs)}</p>
    </div>
  );
}

function CodeBlock({ text, language }: { text: string; language?: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-3xl bg-secondary-900 p-5 font-mono text-sm text-white">
      {language && (
        <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/55">
          {language}
        </span>
      )}
      <code>{text}</code>
    </pre>
  );
}

function DividerBlock() {
  return <hr className="my-10 border-secondary-200" />;
}

const stepToneContainer: Record<string, string> = {
  primary: 'border-primary/20 bg-primary-50',
  accent: 'border-accent/30 bg-accent-50',
  jade: 'border-emerald-300 bg-emerald-50',
  secondary: 'border-secondary-200 bg-secondary-50',
  warning: 'border-primary/30 bg-primary-50',
};

const stepToneBadge: Record<string, string> = {
  primary: 'bg-primary text-white',
  accent: 'bg-accent text-white',
  jade: 'bg-emerald-600 text-white',
  secondary: 'bg-secondary-700 text-white',
  warning: 'bg-primary text-white',
};

function StepsBlock({
  steps,
}: {
  steps: Array<{
    label: string;
    caption?: string;
    tone?: 'primary' | 'accent' | 'jade' | 'secondary' | 'warning';
  }>;
}) {
  return (
    <div className="my-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-2">
        {steps.map((step, index) => {
          const tone = step.tone ?? 'secondary';
          const containerClass = stepToneContainer[tone] ?? stepToneContainer.secondary;
          const badgeClass = stepToneBadge[tone] ?? stepToneBadge.secondary;
          return (
            <Fragment key={index}>
              <div
                className={`flex flex-1 items-start gap-3 rounded-2xl border p-4 shadow-sm ${containerClass}`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${badgeClass}`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-tight text-secondary-900">{step.label}</p>
                  {step.caption ? (
                    <p className="mt-1.5 text-xs leading-snug text-secondary-700">{step.caption}</p>
                  ) : null}
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="hidden shrink-0 self-center px-1 text-2xl font-light text-secondary-400 lg:flex"
                >
                  →
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default function RichBlocks({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="space-y-1">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case 'heading':
            return <Heading key={index} level={block.level} text={block.text} />;
          case 'paragraph':
            return <ParagraphBlock key={index} runs={block.runs} />;
          case 'list':
            return <ListBlock key={index} ordered={block.ordered} items={block.items} />;
          case 'table':
            return <TableBlock key={index} headers={block.headers} rows={block.rows} />;
          case 'callout':
            return <CalloutBlock key={index} tone={block.tone} runs={block.runs} />;
          case 'code':
            return <CodeBlock key={index} text={block.text} language={block.language} />;
          case 'divider':
            return <DividerBlock key={index} />;
          case 'steps':
            return <StepsBlock key={index} steps={block.steps} />;
          default: {
            const _exhaustive: never = block;
            return _exhaustive;
          }
        }
      })}
    </div>
  );
}

export const guideIconMap: Record<string, LucideIcon> = {
  'bed-double': BedDouble,
  'briefcase-medical': BriefcaseMedical,
  'utensils-crossed': UtensilsCrossed,
  train: Train,
  wallet: Wallet,
  languages: Languages,
};
