import { useEffect, useMemo, useState } from 'react';
import { loadOriginalSources, originalSrcDoc, REPOSITORY_URL, SOURCE_REVISION, type SourceFiles } from '../laboratory';
import { Flower, Icon } from './Icons';

export default function OriginalLab({ section = 'accueil' }: { section?: string }) {
  const [sources, setSources] = useState<SourceFiles | null>(null);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [evolved, setEvolved] = useState(true);
  const [width, setWidth] = useState<number | 'auto'>('auto');
  const [currentSection, setCurrentSection] = useState(section);

  useEffect(() => {
    let mounted = true;
    setError(false);
    loadOriginalSources().then((source) => { if (mounted) setSources(source); }).catch(() => { if (mounted) setError(true); });
    return () => { mounted = false; };
  }, [retry]);

  const document = useMemo(() => {
    if (!sources) return { html: '', error: false };
    try { return { html: originalSrcDoc(sources, evolved, currentSection), error: false }; }
    catch { return { html: '', error: true }; }
  }, [sources, evolved, currentSection]);

  if (error || document.error) return <div className="lab-error"><h3>Les sources ne sont pas disponibles.</h3><p>Le laboratoire d'origine n'a pas pu &ecirc;tre charg&eacute;. L'aper&ccedil;u reste utilisable ; aucune source n'a &eacute;t&eacute; remplac&eacute;e par un faux composant.</p><button className="button primary" onClick={() => setRetry((value) => value + 1)}>R&eacute;essayer <Icon name="reset" size={16} /></button><p><a className="text-button" href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer">Lire le d&eacute;p&ocirc;t public <Icon name="diagonal" size={16} /></a></p></div>;
  if (!sources) return <div className="lab-loading"><Flower /><strong>Lecture du laboratoire original</strong><p>Les cinq fichiers publics sont charg&eacute;s en lecture seule,<br />&agrave; une r&eacute;vision fixe. Aucun acc&egrave;s Base44.</p></div>;

  return (
    <div>
      <div className="lab-toolbar">
        <div className="lab-state-switch" role="group" aria-label="Palette du laboratoire">
          <button onClick={() => { setEvolved(false); if (currentSection === 'couleurs-univers') setCurrentSection('fondations'); }} className={!evolved ? 'selected' : ''} aria-pressed={!evolved}>Palette actuelle</button>
          <button onClick={() => setEvolved(true)} className={evolved ? 'selected' : ''} aria-pressed={evolved}>Proposition</button>
        </div>
        <label>Section
          <select value={currentSection} onChange={(event) => setCurrentSection(event.target.value)}>
            <option value="accueil">Accueil original</option>
            {evolved && <option value="couleurs-univers">Couleurs &amp; Univers</option>}
            <option value="fondations">Fondations</option><option value="composants">Composants</option>
            <option value="assistant">Assistant</option><option value="integration">Application</option>
            <option value="bibliotheque">Biblioth&egrave;que</option><option value="medias">M&eacute;dias &amp; INSTANTS</option>
            <option value="atelier">Atelier / &eacute;diteur</option><option value="comparaison">Avant / Apr&egrave;s</option>
            <option value="matrice">Matrice</option>
          </select>
        </label>
        <div className="lab-viewport-options" role="group" aria-label="Largeur de comparaison">
          {(['auto', 375, 390, 768, 1024, 1440] as const).map((size) => <button key={size} className={width === size ? 'selected' : ''} aria-pressed={width === size} onClick={() => setWidth(size)}>{size === 'auto' ? 'Auto' : `${size} px`}</button>)}
        </div>
      </div>
      <div className="lab-frame-container">
        <iframe title={`Laboratoire HTML original - ${evolved ? 'proposition chromatique' : 'palette actuelle'}`} srcDoc={document.html} sandbox="allow-scripts allow-downloads allow-popups" referrerPolicy="no-referrer" style={{ width: width === 'auto' ? '100%' : `${width}px`, maxWidth: 'none' }} />
      </div>
      <p className="lab-notice">Sources originales, r&eacute;vision {SOURCE_REVISION.slice(0, 7)}. Logo, sections, photographies et scripts conserv&eacute;s. L'iframe est isol&eacute;e du preview React. Les largeurs sont des outils de comparaison, pas des tests navigateur d&eacute;j&agrave; effectu&eacute;s.</p>
    </div>
  );
}