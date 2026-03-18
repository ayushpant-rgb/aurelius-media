import { readFileSync } from 'fs';

const thriveUrls = readFileSync('docs/competitor-data/thrive-urls.txt', 'utf8').split('\n').filter(Boolean);
const disruptiveUrls = readFileSync('docs/competitor-data/disruptive-urls.txt', 'utf8').split('\n').filter(Boolean);

function analyzeUrls(urls, name) {
  console.log('\n=== ' + name + ' (' + urls.length + ' URLs) ===\n');

  const bestOf = [], comparison = [], howto = [], location = [], industry = [], service = [], blog = [], other = [];

  for (const url of urls) {
    const u = url.toLowerCase();
    if (/best.{0,30}(agenc|compan|firm|service|tool|platform)/.test(u)) bestOf.push(url);
    else if (/\bvs\b|versus|compar/.test(u)) comparison.push(url);
    else if (/how-to|how_to|\/guide|tutorial|tips-|steps-|-ways-/.test(u)) howto.push(url);
    else if (/\/news\/|\/blog\/|\/insights\//.test(u)) blog.push(url);
    else if (/\/services?\/|\/advertising|\/seo-|\/ppc|\/social-media-adv|\/creative-s|\/lifecycle|\/conversion-rate|\/data-analytic|\/lead-gen/.test(u)) service.push(url);
    else if (/san-antonio|san-francisco|los-angeles|new-york|chicago|dallas|austin|houston|miami|phoenix|seattle|local-digital|locations\//.test(u)) location.push(url);
    else if (/\/industr|ecommerce-seo|healthcare|finance-|saas-|home-services/.test(u)) industry.push(url);
    else other.push(url);
  }

  console.log('Content type breakdown:');
  const all = { bestOf, comparison, howto, blog, service, location, industry, other };
  for (const [type, list] of Object.entries(all)) {
    if (list.length) console.log('  ' + type.padEnd(12) + ': ' + list.length);
  }

  if (bestOf.length) {
    console.log('\n"BEST OF" ROUNDUP PAGES (' + bestOf.length + '):');
    bestOf.slice(0, 25).forEach(u => console.log('  ' + u));
  }

  if (comparison.length) {
    console.log('\nCOMPARISON PAGES (' + comparison.length + '):');
    comparison.slice(0, 10).forEach(u => console.log('  ' + u));
  }

  if (location.length) {
    console.log('\nLOCATION PAGES (' + location.length + '):');
    location.slice(0, 15).forEach(u => console.log('  ' + u));
  }

  if (industry.length) {
    console.log('\nINDUSTRY PAGES (' + industry.length + '):');
    industry.slice(0, 15).forEach(u => console.log('  ' + u));
  }
}

analyzeUrls(thriveUrls, 'THRIVE AGENCY');
analyzeUrls(disruptiveUrls, 'DISRUPTIVE ADVERTISING');
