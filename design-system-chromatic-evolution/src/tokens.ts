import tokenCss from '../public/proposal/chromatic-tokens.css?raw';

export { tokenCss };

export function token(name: string): string {
  const match = tokenCss.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`Unknown color token: ${name}`);
  const value = match[1].trim();
  const reference = value.match(/^var\(--([\w-]+)\)$/);
  return reference ? token(reference[1]) : value;
}

export const neutrals = [
  { name: 'Noir principal', token: 'ink', use: 'Titres & lecture' },
  { name: 'Gris secondaire', token: 'text', use: 'Descriptions' },
  { name: 'Gris discret', token: 'muted', use: 'Rep\u00e8res non essentiels' },
  { name: 'Bordure', token: 'line', use: 'D\u00e9limitations' },
  { name: 'Fond secondaire', token: 'sand', use: 'Surfaces' },
  { name: 'Blanc', token: 'white', use: 'Fond principal' },
].map((item) => ({ ...item, color: token(item.token) }));

export const universes = [
  { id: 'general', label: 'Identit\u00e9 g\u00e9n\u00e9rale', short: 'LE MONDE AIME', prefix: 'signature', description: 'Une signature commune, entre profondeur et lumi\u00e8re.', colors: ['Bleu p\u00e9trole', 'Turquoise', "Vert d'eau"] },
  { id: 'wedding', label: 'Mariage', short: 'MARIAGE', prefix: 'wedding', description: 'Une expression lumineuse, douce et ouverte.', colors: ['Bleu lumineux', 'Cyan', 'Vert tendre'] },
  { id: 'studio', label: 'Studio / Cr\u00e9ation', short: 'STUDIO / CR\u00c9ATION', prefix: 'studio', description: 'Une expression cr\u00e9ative, sensible et singuli\u00e8re.', colors: ['Violet', 'Mauve', 'Fuchsia doux'] },
  { id: 'music', label: 'Musique / Artiste', short: 'MUSIQUE / ARTISTE', prefix: 'music', description: 'Une expression chaleureuse, vivante et po\u00e9tique.', colors: ['Corail', 'Rose', 'Lavande'] },
].map((universe) => ({
  ...universe,
  stops: ['start', 'middle', 'end'].map((stop) => token(`${universe.prefix}-${stop}`)),
}));

export type Universe = typeof universes[number];
export type Surface = 'light' | 'dark';

export function gradientCss(universe: Universe): string {
  return `linear-gradient(115deg, ${universe.stops[0]} 0%, ${universe.stops[1]} 52%, ${universe.stops[2]} 100%)`;
}

export function contrast(foreground: string, background: string): number {
  const luminance = (hex: string) => {
    const rgb = hex.replace('#', '').match(/.{2}/g)!.map((channel) => parseInt(channel, 16) / 255);
    const linear = rgb.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function saveFile(contents: string | Blob, filename: string, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(contents instanceof Blob ? contents : new Blob([contents], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
    const previous = document.activeElement as HTMLElement | null;
    const input = document.createElement('textarea');
    input.value = value;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.append(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    previous?.focus();
    return copied;
  } catch {
    return false;
  }
}