type JsonRecord = Record<string, unknown>;

const GUILIN_SLUG = 'guilin-yangshuo-longji';

function readJsonConstant(html: string, name: string): unknown {
  const marker = `const ${name} =`;
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return null;

  let start = markerIndex + marker.length;
  while (/\s/.test(html[start] ?? '')) start += 1;

  const opening = html[start];
  const closing = opening === '[' ? ']' : opening === '{' ? '}' : '';
  if (!closing) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  // The guide stores its private content as JSON assigned to JavaScript
  // constants. Scan the balanced JSON value instead of evaluating the script.
  for (let index = start; index < html.length; index += 1) {
    const character = html[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') inString = false;
      continue;
    }

    if (character === '"') {
      inString = true;
    } else if (character === opening) {
      depth += 1;
    } else if (character === closing) {
      depth -= 1;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(start, index + 1));
        } catch {
          return null;
        }
      }
    }
  }

  return null;
}

function asRecords(value: unknown): JsonRecord[] {
  return Array.isArray(value)
    ? value.filter((item): item is JsonRecord => Boolean(item) && typeof item === 'object')
    : [];
}

function text(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

function escapeHtml(value: unknown) {
  return text(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function safeImage(value: unknown) {
  const url = text(value);
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(url) ? escapeHtml(url) : '';
}

function safeLink(value: unknown) {
  const url = text(value);
  return /^https?:\/\//i.test(url) ? escapeHtml(url) : '#';
}

function renderBadges(value: unknown) {
  if (!Array.isArray(value)) return '';
  return value.map((item) => `<span class="guilin-static-badge">${escapeHtml(item)}</span>`).join('');
}

function renderDining(html: string) {
  const days = asRecords(readJsonConstant(html, 'diningData'));
  const visuals = readJsonConstant(html, 'diningVisuals') as JsonRecord | null;
  const images = readJsonConstant(html, 'foodImages');
  if (!days.length || !visuals || !Array.isArray(images)) return null;

  const mealNames = ['breakfast', 'lunch', 'dinner'];
  const dayCards = days
    .map((day, dayIndex) => {
      const dayVisuals = visuals[String(dayIndex)] as JsonRecord | undefined;
      const meals = mealNames
        .map((mealName) => {
          const visual = dayVisuals?.[mealName] as JsonRecord | undefined;
          const imageIndex = Number(visual?.imageIndex);
          return `
            <article class="guilin-static-card">
              <img src="${safeImage(images[imageIndex])}" alt="${escapeHtml(visual?.title || mealName)}">
              <div class="guilin-static-card-body">
                <p class="guilin-static-label">${escapeHtml(mealName)}</p>
                <h4>${escapeHtml(visual?.title || mealName)}</h4>
                <p>${escapeHtml(day[mealName])}</p>
                <div class="guilin-static-badges">${renderBadges(visual?.tags)}</div>
              </div>
            </article>`;
        })
        .join('');

      return `
        <details class="guilin-static-day" ${dayIndex === 0 ? 'open' : ''}>
          <summary>
            <span><strong>${escapeHtml(day.day)}</strong> · ${escapeHtml(day.title)}</span>
            <span>${escapeHtml(day.route)} · ${escapeHtml(day.budget)}</span>
          </summary>
          <p class="guilin-static-intro">${escapeHtml(day.intro)}</p>
          <div class="guilin-static-grid">${meals}</div>
        </details>`;
    })
    .join('');

  return `<section id="dining" class="guilin-static-section">
    <div class="guilin-static-wrap">
      <div class="guilin-static-heading"><h2>Dining</h2><p>Local flavors included throughout the journey.</p></div>
      <div class="guilin-static-list">${dayCards}</div>
    </div>
  </section>`;
}

function renderStays(html: string) {
  const stays = asRecords(readJsonConstant(html, 'stayData'));
  const images = readJsonConstant(html, 'stayImages');
  if (!stays.length || !Array.isArray(images)) return null;

  const groups = ['Guilin base', 'Yangshuo base', 'Longji base'];
  const groupCards = groups
    .map((group) => {
      const items = stays.filter((stay) => stay.group === group);
      if (!items.length) return '';

      const cards = items
        .map(
          (stay) => `
            <article class="guilin-static-card guilin-static-stay">
              <img src="${safeImage(images[Number(stay.imageIndex)])}" alt="${escapeHtml(stay.name)}">
              <div class="guilin-static-card-body">
                <h4>${escapeHtml(stay.name)}</h4>
                <p class="guilin-static-location">${escapeHtml(stay.location)}</p>
                <p>${escapeHtml(stay.summary)}</p>
                <p class="guilin-static-budget">${escapeHtml(stay.budget)}</p>
                <div class="guilin-static-badges">${renderBadges(stay.tags)}</div>
                <p>${escapeHtml(stay.why)}</p>
                <a href="${safeLink(stay.url)}" target="_blank" rel="noopener noreferrer">Check current rooms</a>
              </div>
            </article>`
        )
        .join('');

      return `<details class="guilin-static-day" open>
        <summary><span><strong>${escapeHtml(group)}</strong></span><span>${items.length} stays</span></summary>
        <p class="guilin-static-intro">${escapeHtml(items[0]?.group_note)}</p>
        <div class="guilin-static-grid guilin-static-stay-grid">${cards}</div>
      </details>`;
    })
    .join('');

  return `<section id="hotels" class="guilin-static-section guilin-static-alt">
    <div class="guilin-static-wrap">
      <p class="guilin-static-kicker">Stays</p>
      <div class="guilin-static-heading">
        <h2>Carefully selected stays in the right route locations.</h2>
        <p>Hotels are grouped by route base, so the stay explains not just where to sleep, but why that location fits this part of the journey.</p>
      </div>
      <div class="guilin-static-list">${groupCards}</div>
    </div>
  </section>`;
}

const STATIC_GUIDE_STYLE = `<style id="guilin-static-fallback-style">
  .guilin-static-section{padding:5rem 1.25rem;background:#fff;color:#0f172a}
  .guilin-static-alt{background:#f8fafc}
  .guilin-static-wrap{max-width:80rem;margin:0 auto}
  .guilin-static-heading{display:flex;align-items:baseline;gap:1.25rem;margin-bottom:1.75rem}
  .guilin-static-heading h2{margin:0;font-size:clamp(2rem,4vw,3.25rem);line-height:1.05;font-weight:900}
  .guilin-static-heading p,.guilin-static-intro{color:#475569;line-height:1.7}
  .guilin-static-kicker,.guilin-static-label{color:#047857;text-transform:uppercase;letter-spacing:.18em;font-weight:900}
  .guilin-static-list{display:grid;gap:1rem}
  .guilin-static-day{border:1px solid #dbe4ee;border-radius:1.5rem;background:#fff;overflow:hidden}
  .guilin-static-day summary{display:flex;justify-content:space-between;gap:1rem;padding:1.1rem 1.35rem;cursor:pointer;background:#f8fafc}
  .guilin-static-day summary span:last-child{color:#64748b;text-align:right}
  .guilin-static-intro{margin:1.25rem 1.35rem 0}
  .guilin-static-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;padding:1.35rem}
  .guilin-static-card{overflow:hidden;border:1px solid #e2e8f0;border-radius:1.25rem;background:#fff}
  .guilin-static-card>img{display:block;width:100%;height:13rem;object-fit:cover;background:#eef2f7}
  .guilin-static-card-body{padding:1.1rem}
  .guilin-static-card h4{margin:.35rem 0 .65rem;font-size:1.15rem;line-height:1.35}
  .guilin-static-card p{margin:.55rem 0;color:#475569;line-height:1.55}
  .guilin-static-label{margin:0!important;font-size:.72rem}
  .guilin-static-badges{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.85rem}
  .guilin-static-badge{padding:.3rem .55rem;border-radius:999px;background:#ecfdf5;color:#047857;font-size:.72rem;font-weight:700}
  .guilin-static-location,.guilin-static-budget{font-weight:700;color:#334155!important}
  .guilin-static-card a{display:inline-block;margin-top:.8rem;color:#047857;font-weight:800;text-decoration:none}
  [data-planning-panel]{display:block!important}
  @media(max-width:800px){
    .guilin-static-heading,.guilin-static-day summary{display:block}
    .guilin-static-day summary span{display:block}.guilin-static-day summary span:last-child{text-align:left;margin-top:.4rem}
    .guilin-static-grid{grid-template-columns:1fr}
  }
</style>`;

/**
 * Guilin's original paid guide fills Dining and Stays with JavaScript.
 * Paid guides deliberately run without scripts, so convert its embedded JSON
 * to static, complete markup before the document enters the sandbox.
 */
export function materializeGuilinPaidGuide(html: string, slug: string) {
  if (slug !== GUILIN_SLUG) return html;

  const dining = renderDining(html);
  const stays = renderStays(html);
  if (!dining || !stays) return html;

  return html
    .replace(/<section\s+id=["']dining["'][\s\S]*?<\/section>/i, dining)
    .replace(/<section\s+id=["']hotels["'][\s\S]*?<\/section>/i, stays)
    // The data has now been materialized. Removing the inert script prevents
    // its multi-megabyte base64 image arrays from being stored twice.
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/head>/i, `${STATIC_GUIDE_STYLE}</head>`);
}
