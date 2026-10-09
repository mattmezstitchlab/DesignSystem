import { strToU8, zipSync } from 'fflate';
import sectionHtml from '../public/proposal/couleurs-univers.html?raw';
import sectionCss from '../public/proposal/couleurs-univers.css?raw';
import sectionJs from '../public/proposal/couleurs-univers.js?raw';
import evolutionDoc from '../public/proposal/CHROMATIC_EVOLUTION.md?raw';
import prDoc from '../public/proposal/PULL_REQUEST.md?raw';
import { saveFile, token, tokenCss } from './tokens';

export const SOURCE_REVISION = '6d55f768fef5515e9fb41d42a088269c09f28b1d';
export const REPOSITORY_URL = 'https://github.com/mattmezstitchlab/lemondeaimedesignsystem';
const RAW_BASE = `https://raw.githubusercontent.com/mattmezstitchlab/lemondeaimedesignsystem/${SOURCE_REVISION}`;
const sourceNames = ['index.html', 'design-system.css', 'design-system.js', 'component-lab.js', 'DESIGN_SYSTEM.md'] as const;
export type SourceFiles = Record<typeof sourceNames[number], string>;
let cachedSources: Promise<SourceFiles> | null = null;

export function loadOriginalSources(): Promise<SourceFiles> {
  if (cachedSources) return cachedSources;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 18000);
  cachedSources = Promise.all(sourceNames.map(async (name) => {
    const response = await fetch(`${RAW_BASE}/${name}`, { signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
    if (!response.ok) throw new Error(`Lecture de ${name} impossible (${response.status}).`);
    return [name, await response.text()] as const;
  })).then((entries) => {
    const sources = Object.fromEntries(entries) as SourceFiles;
    const document = new DOMParser().parseFromString(sources['index.html'], 'text/html');
    if (!document.getElementById('flower') || !document.getElementById('demo-form') || !document.getElementById('atelier') || !sources['design-system.css'].includes('--deep:')) throw new Error('La structure source ne correspond pas a la revision inspectee.');
    return sources;
  }).catch((error) => {
    cachedSources = null;
    throw error;
  }).finally(() => window.clearTimeout(timeout));
  return cachedSources;
}

const literalTokens: Record<string, string> = {
  '#1f3f28': 'var(--ink)', '#192e28': 'var(--ink)', '#1d252c': 'var(--ink)',
  '#a3d65c': 'var(--accent)', '#f6f7f5': 'var(--sand)', '#485563': 'var(--text)',
  '#e5e7eb': 'var(--line)', '#537d36': 'var(--focus)', '#7a8b83': 'var(--line)',
  '#d9edc2': 'var(--accent-soft)', '#fcfef9': 'var(--white)', '#a3d65c40': 'var(--focus-ring)',
  '#1f3f2826': 'var(--shadow-hover)', '#1d252c08': 'var(--shadow-soft)',
  '#68737f': 'var(--text)', '#66717e': 'var(--text)', '#f0f1f2': 'var(--line)',
};

export function migrateCss(css: string) {
  const root = css.match(/:root\s*\{([^}]*)\}/);
  if (!root) throw new Error('Les tokens source sont introuvables.');
  let nextTokens = tokenCss;
  // Preserve every nonchromatic source token, including fonts and geometry.
  const chromaticNames = new Set(['deep', 'accent', 'sand', 'text', 'line', 'ink', 'focus']);
  for (const match of root[1].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    if (chromaticNames.has(match[1])) continue;
    const declaration = `--${match[1]}: ${match[2].trim()};`;
    const existing = new RegExp(`--${match[1]}:\\s*[^;]+;`);
    nextTokens = existing.test(nextTokens) ? nextTokens.replace(existing, declaration) : nextTokens.replace(':root {', `:root {\n  ${declaration}`);
  }
  const replacements: Record<string, number> = {};
  let rules = css.replace(root[0], '');
  rules = rules.replace(/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{3})\b/gi, (original) => {
    const lower = original.toLowerCase();
    const replacement = literalTokens[lower];
    if (replacement) { replacements[lower] = (replacements[lower] ?? 0) + 1; return replacement; }
    const translucentAccent = lower.match(/^#a3d65c([\da-f]{2})$/);
    if (translucentAccent) {
      replacements[lower] = (replacements[lower] ?? 0) + 1;
      return `color-mix(in srgb, var(--accent) ${Math.round(parseInt(translucentAccent[1], 16) / 255 * 100)}%, transparent)`;
    }
    return original;
  });
  rules = rules.replace(/button:disabled\s*\{[^}]*\}/, 'button:disabled { cursor: not-allowed; opacity: 1; background: var(--surface); color: var(--text); border-color: var(--line); box-shadow: none; }');
  rules = rules.replace(/\.primary:hover[^\{]*\{[^}]*\}/, (rule) => rule.replace(/background:\s*var\(--deep\)/, 'background: var(--action-hover)'));
  rules = rules.replace(/\bnav\s*\{[^}]*\}/, (rule) => rule.replace(/color:\s*var\(--text\)/, 'color: var(--ink)'));
  return { css: `${nextTokens}\n${rules.trim()}\n`, replacements };
}

export function createProposal(sources: SourceFiles) {
  const before = new DOMParser().parseFromString(sources['index.html'], 'text/html');
  let html = sources['index.html'];
  const target = /<section\b[^>]*\bid="fondations"[^>]*>/;
  const match = target.exec(html);
  if (!match) throw new Error('Le point d insertion de la section est introuvable.');
  html = html.slice(0, match.index) + sectionHtml + '\n\n    ' + html.slice(match.index);
  html = html.replace(/(<link\b[^>]*href="design-system\.css"[^>]*>)/, '$1\n  <link rel="stylesheet" href="couleurs-univers.css">');
  html = html.replace(/(<script\b[^>]*src="component-lab\.js"[^>]*>\s*<\/script>)/, '$1\n  <script src="couleurs-univers.js" defer></script>');
  html = html.replace('<a href="#fondations">Fondations</a>', '<a href="#fondations">Fondations</a><a href="#couleurs-univers">Couleurs &amp; Univers</a>');
  html = html.replace(/(<meta\s+name="theme-color"\s+content=")[^"]+("[^>]*>)/, '$1#161616$2');

  const start = html.search(target);
  const end = html.indexOf('</section>', start);
  const labels: Record<string, string> = {
    'Vert profond': 'Noir principal', '#1F3F28': token('ink'),
    'Vert accent': 'Turquoise', '#A3D65C': token('signature-middle'),
    'Sable': 'Fond secondaire', '#F6F7F5': token('sand'),
    '#485563': token('text'), '#E5E7EB': token('line'),
  };
  let foundation = html.slice(start, end);
  for (const [previous, next] of Object.entries(labels)) foundation = foundation.split(previous).join(next);
  foundation = foundation.replace(/Texte sombre sur l.accent\. Jamais de texte vert accent sur blanc\./, 'Texte noir sur les accents clairs. Bleu p&eacute;trole pour le focus. Pas de turquoise en texte courant sur blanc.');
  html = html.slice(0, start) + foundation + html.slice(end);
  html = html.replace(/(Aper[^<]{0,12}u focus : bordure )verte( et halo l[^<]*ger)/, '$1bleu petrole$2');

  const after = new DOMParser().parseFromString(html, 'text/html');
  const preservedSections = [...before.querySelectorAll('main > section[id]')].map((section) => section.id);
  if (preservedSections.some((id) => !after.getElementById(id))) throw new Error('Une section originale manque. Export interrompu.');
  if (before.getElementById('flower')?.outerHTML !== after.getElementById('flower')?.outerHTML) throw new Error('Le symbole original a change. Export interrompu.');
  for (const script of ['design-system.js', 'component-lab.js']) {
    if (!after.querySelector(`script[src="${script}"]`)) throw new Error('Un script original manque. Export interrompu.');
  }
  if (!after.querySelector('link[href="couleurs-univers.css"]') || !after.querySelector('script[src="couleurs-univers.js"]') || !after.querySelector('a[href="#couleurs-univers"]')) throw new Error('L ajout de la section est incomplet. Export interrompu.');
  const migration = migrateCss(sources['design-system.css']);
  return {
    html,
    css: migration.css,
    report: { status: 'proposition_non_validee_visuellement', repository: REPOSITORY_URL, revision: SOURCE_REVISION, preservedSections, logoPreserved: true, originalScriptsUnchanged: true, replacements: migration.replacements, noReactInStaticProposal: true, branchCreated: false, pullRequestOpened: false, browserReviewPerformed: false },
  };
}

export function originalSrcDoc(sources: SourceFiles, evolved = true, section = 'accueil'): string {
  const proposal = evolved ? createProposal(sources) : null;
  const document = new DOMParser().parseFromString(proposal?.html ?? sources['index.html'], 'text/html');
  document.querySelectorAll('link[href="design-system.css"], link[href="couleurs-univers.css"], script[src="design-system.js"], script[src="component-lab.js"], script[src="couleurs-univers.js"]').forEach((node) => node.remove());
  // srcdoc otherwise inherits the parent's base URL, including fragment links.
  const base = document.createElement('base');
  base.href = 'about:srcdoc';
  document.head.prepend(base);
  document.querySelectorAll('a[href="index%209.html"]').forEach((link) => {
    link.setAttribute('href', `${REPOSITORY_URL}/blob/${SOURCE_REVISION}/index%209.html`);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  const style = document.createElement('style');
  style.textContent = (proposal?.css ?? sources['design-system.css']) + (evolved ? '\n' + sectionCss : '');
  document.head.append(style);
  for (const source of [sources['design-system.js'], sources['component-lab.js'], ...(evolved ? [sectionJs] : [])]) {
    const script = document.createElement('script');
    script.textContent = source.replace(/<\/script/gi, '<\\/script');
    document.body.append(script);
  }
  const scroll = document.createElement('script');
  scroll.textContent = `requestAnimationFrame(() => { const target = document.getElementById(${JSON.stringify(section)}); if (target instanceof HTMLDetailsElement) target.open = true; target?.scrollIntoView({block:'start', behavior:'auto'}); });`;
  document.body.append(scroll);
  return '<!doctype html>\n' + document.documentElement.outerHTML;
}

export async function exportProposal() {
  const sources = await loadOriginalSources();
  const proposal = createProposal(sources);
  const files: Record<string, Uint8Array> = {
    'index.html': strToU8(proposal.html),
    'design-system.css': strToU8(proposal.css),
    'design-system.js': strToU8(sources['design-system.js']),
    'component-lab.js': strToU8(sources['component-lab.js']),
    'couleurs-univers.css': strToU8(sectionCss),
    'couleurs-univers.js': strToU8(sectionJs),
    'DESIGN_SYSTEM.md': strToU8(sources['DESIGN_SYSTEM.md'] + '\n\n---\n\n' + evolutionDoc),
    'PULL_REQUEST.md': strToU8(prDoc),
    'chromatic-migration.json': strToU8(JSON.stringify(proposal.report, null, 2)),
  };
  const zipped = zipSync(files, { level: 6 });
  saveFile(new Blob([new Uint8Array(zipped)], { type: 'application/zip' }), 'le-monde-aime-proposition-chromatique.zip');
}