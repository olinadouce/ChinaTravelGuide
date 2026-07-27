import { describe, expect, it } from 'vitest';

import { materializeGuilinPaidGuide } from './guilin-paid-guide';

const fixture = `<!doctype html><html><head></head><body>
<section id="dining"><div id="dining-day-list"></div></section>
<section id="hotels"><div id="stay-base-list"></div></section>
<div data-planning-panel hidden>Planning details</div>
<script>
const foodImages = ["data:image/jpeg;base64,Zm9vZA=="];
const diningData = [{"day":"Day 1","title":"Arrival","route":"Guilin","intro":"First day","budget":"CNY 100","breakfast":"Rice noodles","lunch":"Lunch","dinner":"Dinner"}];
const diningVisuals = {"0":{"breakfast":{"title":"Noodles","imageIndex":0,"tags":["Local"]},"lunch":{"title":"Lunch","imageIndex":0,"tags":[]},"dinner":{"title":"Dinner","imageIndex":0,"tags":[]}}};
const stayImages = ["data:image/jpeg;base64,c3RheQ=="];
const stayData = [{"name":"Hotel <One>","location":"Guilin","summary":"Summary","budget":"CNY 500","why":"Central","url":"https://example.com","tags":["City"],"group":"Guilin base","group_note":"City access","imageIndex":0}];
</script></body></html>`;

describe('materializeGuilinPaidGuide', () => {
  it('turns script-only dining and stay data into safe static markup', () => {
    const result = materializeGuilinPaidGuide(fixture, 'guilin-yangshuo-longji');

    expect(result).toContain('Rice noodles');
    expect(result).toContain('Hotel &lt;One&gt;');
    expect(result).toContain('data:image/jpeg;base64,Zm9vZA==');
    expect(result).toContain('guilin-static-fallback-style');
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('const diningData');
  });

  it('does not alter another package', () => {
    expect(materializeGuilinPaidGuide(fixture, 'henan-history')).toBe(fixture);
  });
});
