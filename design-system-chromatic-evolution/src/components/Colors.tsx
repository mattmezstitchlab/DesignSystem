import { useRef, useState, type KeyboardEvent } from 'react';
import { contrast, gradientCss, neutrals, token, universes, type Surface } from '../tokens';
import { Flower, Icon } from './Icons';

type Props = {
  onCopy: (value: string, label?: string) => void;
  onCompare: () => void;
  onExample: () => void;
};

export default function Colors({ onCopy, onCompare, onExample }: Props) {
  const [selected, setSelected] = useState(0);
  const [surface, setSurface] = useState<Surface>('light');
  const [foreground, setForeground] = useState(token('ink'));
  const [background, setBackground] = useState(token('white'));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const universe = universes[selected];
  const ratio = contrast(foreground, background);
  const accessible = ratio >= 4.5;
  const foregrounds = [...neutrals.slice(0, 3), { name: universes[0].colors[0], color: token('signature-start') }, { name: 'Turquoise', color: token('signature-middle') }, neutrals[5]];
  const backgrounds = [neutrals[5], neutrals[4], neutrals[0], { name: "Vert d'eau", color: token('signature-end') }];

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % universes.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + universes.length) % universes.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = universes.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="couleurs" className="reference-section colors-section" aria-labelledby="colors-title">
      <div className="section-top">
        <div>
          <p className="section-number">01 <span>/</span> L'EXPRESSION CHROMATIQUE</p>
          <h2 id="colors-title">Couleurs &amp; Univers<span className="title-period">.</span></h2>
          <p className="section-description">Une base neutre. Une signature vivante. Des nuances &agrave; explorer.</p>
        </div>
        <button className="text-button compare-link" onClick={onCompare}>Voir l'avant / apr&egrave;s <Icon name="diagonal" size={16} /></button>
      </div>

      <div className="subsection-label"><h3>La palette neutre</h3><span>Cliquez pour copier un code</span></div>
      <div className="neutral-palette">
        {neutrals.map((item) => (
          <div className="neutral-color" key={item.token}>
            <button className={`swatch swatch-${item.token}`} style={{ background: item.color, color: contrast(token('white'), item.color) >= 4.5 ? token('white') : token('ink') }} aria-label={`Copier ${item.name} : ${item.color}`} onClick={() => onCopy(item.color, item.name)}>
              <Icon name="copy" size={18} />
            </button>
            <h4>{item.name}</h4><code className="code-link">{item.color}</code><p>{item.use}</p>
          </div>
        ))}
      </div>
      <div className="alternative-surface-note"><i style={{ background: token('surface') }} /><span>Surface alternative</span><button onClick={() => onCopy(token('surface'), 'Surface alternative')}>{token('surface')} <Icon name="copy" size={12} /></button></div>

      <div className="signature-heading">
        <h3>Le d&eacute;grad&eacute; signature</h3>
        <span>Bleu p&eacute;trole <span aria-hidden="true">&rarr;</span> turquoise <span aria-hidden="true">&rarr;</span> vert d'eau</span>
      </div>
      <div className="signature-band">
        <span className="signature-wordmark">LE MONDE AIME<sup>&reg;</sup></span>
        <button className="signature-copy" onClick={() => onCopy(gradientCss(universes[0]), 'CSS signature')}><Icon name="copy" size={15} /> Copier le CSS</button>
      </div>
      <div className="signature-stops">
        <span>{token('signature-start')} <small>0 %</small></span>
        <span>{token('signature-middle')} <small>52 %</small></span>
        <span>{token('signature-end')} <small>100 %</small></span>
      </div>

      <div className="universes-heading"><h3>Un langage commun, des univers singuliers.</h3><span>Palettes exploratoires</span></div>
      <div className="universe-tabs" role="tablist" aria-label="Palettes des univers AIME">
        {universes.map((item, index) => (
          <button key={item.id} ref={(element) => { tabs.current[index] = element; }} role="tab" id={`universe-tab-${item.id}`} aria-selected={selected === index} aria-controls="universe-panel" tabIndex={selected === index ? 0 : -1} className={selected === index ? 'is-selected' : ''} onClick={() => setSelected(index)} onKeyDown={(event) => onTabKey(event, index)}>
            <span className="universe-dot" style={{ background: gradientCss(item) }} />{item.label}
            {selected === index && <Icon name="check" size={15} />}
          </button>
        ))}
      </div>

      <div className="universe-panel" id="universe-panel" role="tabpanel" aria-labelledby={`universe-tab-${universe.id}`} data-universe={universe.id}>
        <div className="universe-palette" key={universe.id}>
          <div className="universe-art" aria-hidden="true"><Flower /><span>{universe.short}</span></div>
          <div className="universe-stops">
            {universe.stops.map((color, index) => (
              <button key={color} onClick={() => onCopy(color, universe.colors[index])} className="universe-color" aria-label={`Copier ${universe.colors[index]} : ${color}`}>
                <i style={{ background: color }} /><span>{universe.colors[index]}<code>{color}</code></span><Icon name="copy" size={15} />
              </button>
            ))}
          </div>
          <p className="universe-description">{universe.description}</p>
        </div>
        <div className="application-preview" data-surface={surface}>
          <div className="preview-toolbar">
            <span>DANS L'INTERFACE</span>
            <div className="surface-switch" role="group" aria-label="Fond de l'apercu">
              <button aria-pressed={surface === 'light'} className={surface === 'light' ? 'selected' : ''} onClick={() => setSurface('light')} aria-label="Fond blanc"><Icon name="sun" size={16} /><span>Clair</span></button>
              <button aria-pressed={surface === 'dark'} className={surface === 'dark' ? 'selected' : ''} onClick={() => setSurface('dark')} aria-label="Fond sombre"><Icon name="moon" size={16} /><span>Sombre</span></button>
            </div>
          </div>
          <h4>L'essentiel, avec une nuance.</h4>
          <p>La couleur accompagne l'exp&eacute;rience.<br />Elle ne remplace jamais la lisibilit&eacute;.</p>
          <div className="preview-actions">
            <button className="button preview-primary" onClick={onExample}>Bouton principal <Icon size={16} /></button>
            <button className="button button-accent" onClick={() => onCopy(gradientCss(universe), universe.label)}><span>Bouton accent <Icon name="diagonal" size={15} /></span></button>
          </div>
          <button className="sample-card" onClick={onExample}>
            <span className="sample-card-accent" /><span><strong>Un projet qui vous ressemble.</strong><small>Une ambiance &eacute;l&eacute;gante pour votre mariage.</small></span><Icon name="diagonal" size={18} />
          </button>
        </div>
      </div>
      <p className="exploration-note"><Icon name="info" size={15} />Ces associations sont des propositions, pas des identit&eacute;s d&eacute;finitives. Aucun projet r&eacute;el n'est modifi&eacute;.</p>

      <details className="contrast-details">
        <summary><span>R&egrave;gles d'utilisation &amp; contrastes</span><span>Concevoir avec attention <Icon name="down" size={18} /></span></summary>
        <div className="contrast-content">
          <div className="usage-rules">
            <h3>Une couleur, un r&ocirc;le.</h3>
            <p><strong>Le noir pour la lecture.</strong> Titres, navigation et actions principales.</p>
            <p><strong>Le gris pour les descriptions.</strong> Une hi&eacute;rarchie claire, sans couleur superflue.</p>
            <p><strong>La couleur pour l'&eacute;motion.</strong> Accents, s&eacute;lections et illustrations. Jamais un paragraphe en d&eacute;grad&eacute;.</p>
            <p className="rule-note">Gris discret : rep&egrave;res non essentiels seulement. Un texte courant exige un ratio minimum de 4,5:1.</p>
          </div>
          <div className="contrast-tester">
            <h3>Tester une association</h3>
            <div className="contrast-selects">
              <label>Texte<select value={foreground} onChange={(event) => setForeground(event.target.value)}>{foregrounds.map((item) => <option key={item.color} value={item.color}>{item.name}</option>)}</select></label>
              <label>Fond<select value={background} onChange={(event) => setBackground(event.target.value)}>{backgrounds.map((item) => <option key={item.color} value={item.color}>{item.name}</option>)}</select></label>
            </div>
            <div className="contrast-result">
              <div className="contrast-specimen" style={{ color: foreground, background }}>Aa <span>Le monde aime.</span></div>
              <div aria-live="polite"><strong>{ratio.toFixed(2)}<small>:1</small></strong><span className={accessible ? 'contrast-pass' : 'contrast-fail'}><Icon name={accessible ? 'check' : 'info'} size={14} />{ratio >= 7 ? 'AAA, texte courant' : accessible ? 'AA, texte courant' : 'AA non atteint'}</span></div>
            </div>
            <p className="rule-note">Calcul WCAG par luminance relative. Sur un d&eacute;grad&eacute;, v&eacute;rifier chaque zone sous le texte. Le bouton accent utilise une surface unie prot&eacute;g&eacute;e.</p>
          </div>
        </div>
      </details>
    </section>
  );
}