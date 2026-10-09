import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Colors from './components/Colors';
import Dialog from './components/Dialog';
import Documentation from './components/Documentation';
import OriginalLab from './components/OriginalLab';
import { Brand, Flower, Icon } from './components/Icons';
import { copyText, neutrals, token } from './tokens';

type Notify = (message: ReactNode) => void;
type Overlay = { type: 'docs' | 'compare' | 'example' | 'lab'; section?: string } | null;

function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: ReactNode; description: ReactNode }) {
  return <div className="section-top"><div><p className="section-number">{number} <span>/</span> {eyebrow}</p><h2>{title}<span className="title-period">.</span></h2><p className="section-description">{description}</p></div></div>;
}

function Foundations() {
  const pictograms = ['heart', 'music', 'calendar', 'pin', 'people', 'mail', 'camera', 'chat', 'edit', 'phone'];
  return (
    <section id="fondations" className="reference-section" aria-label="Fondations">
      <SectionHeading number="02" eyebrow="LES FONDATIONS" title={<>L'harmonie dans les d&eacute;tails</>} description={<>Les bases d'une exp&eacute;rience coh&eacute;rente et durable.</>} />
      <div className="foundations-grid">
        <div className="typography-foundation">
          <h3>Typographie</h3>
          <div className="font-specimens">
            <div><span className="manrope-sample">Aa</span><strong>Manrope</strong><small>Titres &amp; hi&eacute;rarchie</small></div>
            <div><span className="dm-sample">Aa</span><strong>DM Sans</strong><small>Texte &amp; interfaces</small></div>
          </div>
          <p className="rule-note">Deux typographies conserv&eacute;es. Une m&ecirc;me attention &agrave; la lisibilit&eacute;.</p>
        </div>
        <div className="scale-foundation">
          <h3>Hi&eacute;rarchie</h3>
          <div className="type-scale"><p className="type-one">Headline 1 <span>64 / 72</span></p><p className="type-two">Headline 2 <span>48 / 56</span></p><p className="type-three">Headline 3 <span>32 / 40</span></p><p>Texte <span>18 / 28</span></p><p className="type-small">Texte petit <span>14 / 20</span></p></div>
        </div>
        <div className="spacing-foundation">
          <h3>Espacement</h3>
          <div className="spacing-scale">{[4, 8, 16, 24, 48].map((step, index) => <div key={step}><i style={{ width: step }} /><span>{step} px</span><small>{['XS', 'S', 'M', 'L', 'XL'][index]}</small></div>)}</div>
          <p className="rule-note">Grille de 4 px.<br />Marges fluides, de 20 &agrave; 64 px.</p>
        </div>
        <div className="icons-foundation">
          <h3>Ic&ocirc;nes &amp; pictos</h3>
          <div className="icon-grid">{pictograms.map((icon) => <Icon name={icon} size={24} key={icon} />)}</div>
          <p className="rule-note">Pictogrammes du laboratoire.<br />Grille 24 px, trait 1,5 px.<br />Pas un inventaire Lucide applicatif.</p>
        </div>
      </div>
    </section>
  );
}

function Components({ notify, onExample, onLab }: { notify: Notify; onExample: () => void; onLab: () => void }) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(true);
  const [values, setValues] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<ReactNode>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  const getErrors = (next: typeof values) => ({ name: next.name.trim() ? '' : 'Indiquez un nom fictif.', email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim()) ? '' : 'Indiquez un email valide.' });
  function updateValue(field: 'name' | 'email', value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    setStatus(null);
    if (submitted) setErrors(getErrors(next));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = getErrors(values);
    setErrors(next);
    setSubmitted(true);
    if (next.name || next.email) {
      setStatus(<>Corrigez les champs signal&eacute;s.</>);
      event.currentTarget.querySelector<HTMLInputElement>(next.name ? '#demo-name' : '#demo-email')?.focus();
    } else setStatus(<>Formulaire valide. Confirmation locale, aucun envoi.</>);
  }
  function simulate() {
    if (loading) return;
    setLoading(true);
    timeout.current = setTimeout(() => { setLoading(false); notify(<>Simulation termin&eacute;e. Aucune requ&ecirc;te envoy&eacute;e.</>); }, 800);
  }

  return <section id="composants" className="reference-section" aria-label="Composants"><div className="section-top"><div><p className="section-number">03 <span>/</span> LES COMPOSANTS</p><h2>Les m&ecirc;mes gestes. Une nouvelle nuance<span className="title-period">.</span></h2><p className="section-description">Des aper&ccedil;us chromatiques, sans changer les contrats du laboratoire.</p></div><button className="text-button" onClick={onLab}>Le laboratoire complet <Icon name="diagonal" size={16} /></button></div><div className="components-grid"><div className="component-block"><h3>Boutons</h3><div className="button-examples"><button className="button primary" onClick={() => notify(<>Action de d&eacute;monstration confirm&eacute;e. Aucun envoi.</>)}>Bouton principal <Icon size={16} /></button><button className="button secondary" onClick={onExample}>Bouton secondaire <Icon name="diagonal" size={16} /></button><button className="button secondary" onClick={simulate} disabled={loading} aria-busy={loading}>{loading && <span className="spinner" />}{loading ? 'Chargement...' : 'Simuler le chargement'}</button><button className="button" disabled>D&eacute;sactiv&eacute;</button></div><p className="rule-note">Une action principale par bloc.<br />Cibles de 44 px minimum.</p></div><div className="component-block"><h3>Chips / Tags</h3><div className="chip-examples"><button className={`chip ${selected ? 'selected' : ''}`} aria-pressed={selected} onClick={() => setSelected(!selected)}>{selected && <Icon name="check" size={14} />}Mariage</button><button className="chip" onClick={() => notify(<>Suggestion locale s&eacute;lectionn&eacute;e : musique live.</>)}><Icon name="music" size={15} />Musique live</button><button className="chip" disabled>Indisponible</button></div><p className="rule-note">Une s&eacute;lection discr&egrave;te.<br />La coche compl&egrave;te la couleur.</p><div className="focus-demo"><span className="focus-demo-line" /><span>Un focus doux,<br />toujours visible au clavier.</span></div></div><div className="component-block"><h3>Champs de formulaire</h3><form className="mini-form" noValidate onSubmit={submit}><label htmlFor="demo-name">Nom complet<input id="demo-name" placeholder="Alex Martin" value={values.name} onChange={(event) => updateValue('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby="demo-name-error" autoComplete="off" maxLength={80} /></label><span id="demo-name-error" className="field-error">{errors.name}</span><label htmlFor="demo-email">Email<input id="demo-email" type="email" placeholder="alex@example.com" value={values.email} onChange={(event) => updateValue('email', event.target.value)} aria-invalid={!!errors.email} aria-describedby="demo-email-error" autoComplete="off" /></label><span id="demo-email-error" className="field-error">{errors.email}</span><button className="text-button form-test" type="submit">Tester le formulaire <Icon size={15} /></button><p className={`form-status ${errors.name || errors.email ? 'is-error' : ''}`} role="status">{status}</p></form><p className="rule-note">Donn&eacute;es fictives uniquement.<br />Bordure fine, halo bleu p&eacute;trole.</p></div><div className="component-block"><h3>Carte / Card</h3><button className="service-card" onClick={onExample}><img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80" width="600" height="300" loading="lazy" alt="Un musicien joue du saxophone en live." /><span className="service-card-body"><strong>Prestation saxophone</strong><span>Une ambiance &eacute;l&eacute;gante<br />pour votre mariage.</span><Icon name="diagonal" size={17} /></span></button><p className="rule-note">Image 2:1, rayon 12 px.<br />Une seule cible de navigation.</p></div></div></section>;
}

function Assistant() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [unavailable, setUnavailable] = useState(false);
  const [status, setStatus] = useState<ReactNode>(<>Prototype local, sans r&eacute;servation ni collecte de donn&eacute;es.</>);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages]);

  function send(event: FormEvent) {
    event.preventDefault();
    if (unavailable) {
      setStatus(<>Indisponibilit&eacute; simul&eacute;e. Votre texte est conserv&eacute; : d&eacute;sactivez la simulation puis r&eacute;essayez.</>);
      input.current?.focus();
      return;
    }
    if (!text.trim()) {
      setStatus(<>Dites-nous quelques mots avant d'afficher votre message.</>);
      input.current?.focus();
      return;
    }
    setMessages((previous) => [...previous, text.trim()].slice(-20));
    setText('');
    setStatus(<>Message affich&eacute; localement. Aucun envoi, aucune r&eacute;ponse IA.</>);
    input.current?.focus();
  }

  return <section id="assistant" className="reference-section assistant-section" aria-label="Bloc conversation"><SectionHeading number="04" eyebrow="LE BLOC CONVERSATION" title="La technologie au service de l'humain" description={<>Un exemple concret d'exp&eacute;rience utilisateur, tout simplement.</>} /><div className="assistant-stage"><img className="assistant-photo" src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=85" width="2000" height="1000" loading="lazy" alt="Une reception de mariage fleurie, dans une ambiance chaleureuse." /><div className="assistant-stage-shade" /><div className="assistant-editorial"><span className="eyebrow">ASSISTANT DE PROJET</span><h3>Discutez de votre<br />projet de mariage.</h3><p>Un assistant pour vous aider &agrave; imaginer la bonne formule, poser vos questions et avancer sereinement.</p><small>D&eacute;monstration locale &middot; aucun envoi &middot; aucune IA connect&eacute;e</small></div><div className="chat-panel"><header className="chat-header"><div className="chat-avatar"><Flower /></div><span><strong>L'assistant AIME</strong><small>Imaginons votre projet ensemble.</small></span><span className="chat-availability" aria-label={unavailable ? 'Indisponibilite simulee' : 'Demonstration disponible'} data-unavailable={unavailable} /></header><div className="chat-log" ref={log} tabIndex={0} role="log" aria-live="polite" aria-relevant="additions" aria-label="Messages de demonstration"><div className="assistant-bubble"><strong>Bonjour !</strong><p>Je suis votre assistant pour imaginer ensemble une ambiance musicale sur mesure.</p><p>Dites-moi en quelques mots votre projet.</p></div>{messages.map((message, index) => <p className="user-bubble" key={`${index}-${message}`}>{message}</p>)}</div><div className="chat-suggestions">{['Un mariage', 'Les prestations', 'Une ambiance musicale'].map((suggestion) => <button key={suggestion} onClick={() => { setText(suggestion); input.current?.focus(); }}>{suggestion}<Icon name="diagonal" size={12} /></button>)}</div><form className="chat-form" onSubmit={send}><label className="sr-only" htmlFor="chat-input">Votre message de d&eacute;monstration</label><input id="chat-input" ref={input} value={text} onChange={(event) => setText(event.target.value)} placeholder="Parlez-nous de votre projet..." autoComplete="off" maxLength={1000} /><button className="chat-send" type="submit" aria-label="Afficher le message localement"><Icon name="arrow" size={19} /></button></form><p className={`chat-status ${unavailable ? 'is-error' : ''}`} role="status">{status}</p><label className="chat-error-toggle"><input type="checkbox" checked={unavailable} onChange={(event) => { setUnavailable(event.target.checked); setStatus(event.target.checked ? <>Indisponibilit&eacute; simul&eacute;e : le texte reste dans le champ.</> : <>D&eacute;monstration disponible. Aucun envoi, aucune r&eacute;ponse IA.</>); }} />Simuler une indisponibilit&eacute; locale</label></div></div><p className="rule-note assistant-reference">Panneau compact, hauteur ma&icirc;tris&eacute;e, d&eacute;filement interne. Le moteur du laboratoire original reste inchang&eacute; dans la proposition export&eacute;e.</p></section>;
}

function Comparison() {
  const old = [{ name: 'Vert profond', color: '#1F3F28' }, { name: 'Vert accent', color: '#A3D65C' }, { name: 'Sable', color: '#F6F7F5' }, { name: 'Gris texte', color: '#485563' }, { name: 'Bordures', color: '#E5E7EB' }];
  return <div className="comparison-content"><p className="dialog-intro">Une &eacute;volution de la palette du design system, pas une reconstruction du site Matt Mez Sax.</p><div className="comparison-columns"><div><p className="section-number">LA PALETTE ACTUELLE</p><h3>Une identit&eacute; v&eacute;g&eacute;tale.</h3><div className="comparison-swatches">{old.map((item) => <div key={item.color}><i style={{ background: item.color }} /><strong>{item.name}</strong><code>{item.color}</code></div>)}</div><button className="button old-button" disabled>Action principale</button><p>Le vert profond organise la lecture et les actions. Le lime est l'accent dominant.</p></div><div><p className="section-number">LA PALETTE PROPOS&Eacute;E</p><h3>Une identit&eacute; lumineuse.</h3><div className="comparison-swatches">{[neutrals[0], { name: 'Bleu petrole', color: token('signature-start') }, { name: 'Turquoise', color: token('signature-middle') }, { name: "Vert d'eau", color: token('signature-end') }, neutrals[1]].map((item) => <div key={item.color}><i style={{ background: item.color }} /><strong>{item.name}</strong><code>{item.color}</code></div>)}</div><span className="button primary">Action principale</span><p>Le noir organise la lecture. Les gris hi&eacute;rarchisent. Le bleu-vert apporte l'&eacute;motion.</p></div></div><div className="comparison-preserved"><Icon name="check" size={18} /><p>Logo, Manrope, DM Sans, grille de 4 px et rayons de base conserv&eacute;s. Les palettes d'univers restent exploratoires.</p></div></div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('couleurs');
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [toast, setToast] = useState<ReactNode>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  function notify(message: ReactNode) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }
  function navigate(id: string) {
    setActive(id);
    setMenuOpen(false);
    if (menuOpen) menuButton.current?.focus({ preventScroll: true });
  }
  async function copy(value: string, label?: string) {
    if (await copyText(value)) notify(<>{label ?? 'Code'} copi&eacute; dans le presse-papiers.</>);
    else { notify(<>Presse-papiers indisponible. Le code est affich&eacute; dans la documentation.</>); setOverlay({ type: 'docs', section: 'tokens' }); }
  }

  useEffect(() => {
    function escape(event: KeyboardEvent) { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } }
    function outside(event: PointerEvent) { if (menuOpen && !header.current?.contains(event.target as Node)) setMenuOpen(false); }
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-15% 0px -65% 0px' });
    ['couleurs', 'fondations', 'composants', 'assistant', 'ressources'].forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => { observer.disconnect(); if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, []);

  const links = [{ id: 'fondations', label: 'Fondations' }, { id: 'couleurs', label: 'Couleurs & Univers' }, { id: 'composants', label: 'Composants' }, { id: 'assistant', label: 'Assistant' }];
  const resources = [
    { title: <>Biblioth&egrave;que interactive</>, description: <>Navigation, &eacute;tats, formulaires et documents.</>, section: 'bibliotheque', icon: 'book' },
    { title: <>M&eacute;dias &amp; INSTANTS</>, description: <>Carrousel, galerie et lecture vid&eacute;o locale.</>, section: 'medias', icon: 'camera' },
    { title: <>Atelier Landing / &eacute;diteur</>, description: <>Brouillon, aper&ccedil;u mobile et sauvegarde en m&eacute;moire.</>, section: 'atelier', icon: 'edit' },
    { title: 'Application & matrice', description: <>Correspondances propos&eacute;es, risques et limites.</>, section: 'matrice', icon: 'diagonal' },
  ];

  return <>
    <a href="#contenu" className="skip-link">Aller au contenu</a>
    <header className="site-header" ref={header}>
      <div className="wrap header-inner">
        <div className="brand-group"><Brand /><span className="brand-divider" /><span className="header-label">Design<br />System</span></div>
        <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
          {links.map((link) => <a key={link.id} href={`#${link.id}`} className={active === link.id ? 'nav-current' : ''} aria-current={active === link.id ? 'location' : undefined} onClick={() => navigate(link.id)}>{link.label}</a>)}
          <button className="mobile-doc-link" onClick={() => { menuButton.current?.focus(); setOverlay({ type: 'docs' }); setMenuOpen(false); }}>Documentation <Icon name="diagonal" size={16} /></button>
        </nav>
        <button className="button primary header-cta" onClick={() => setOverlay({ type: 'docs' })}>Utiliser ce syst&egrave;me <Icon name="diagonal" size={15} /></button>
        <button className="icon-button mobile-toggle" ref={menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}><Icon name={menuOpen ? 'close' : 'menu'} size={24} /></button>
      </div>
    </header>
    <main id="contenu"><section id="accueil" className="hero" aria-labelledby="hero-title"><div className="hero-image-plane" aria-hidden="true"><img src="/images/chromatic-flower.jpg" width="1536" height="1024" fetchPriority="high" alt="" /></div><div className="wrap hero-inner"><div className="hero-copy"><p className="hero-eyebrow"><span /> UNE AUTRE ID&Eacute;E DU DIGITAL</p><h1 id="hero-title">Le digital,<br /><span className="chromatic-text">l'&eacute;motion,</span> sur<br />mesure.</h1><p className="hero-lead"><strong>LE MONDE AIME<sup>&reg;</sup></strong> con&ccedil;oit des exp&eacute;riences digitales o&ugrave; la technologie sert l'humain, l'&eacute;motion et les projets qui comptent.</p><div className="hero-actions"><a href="#couleurs" className="button primary">D&eacute;couvrir le design system <Icon size={17} /></a><button className="text-button" onClick={() => setOverlay({ type: 'docs', section: 'principles' })}>Notre philosophie <Icon name="diagonal" size={15} /></button></div></div></div></section>
      <div className="wrap main-content"><Colors onCopy={copy} onCompare={() => setOverlay({ type: 'compare' })} onExample={() => setOverlay({ type: 'example' })} /><Foundations /><Components notify={notify} onExample={() => setOverlay({ type: 'example' })} onLab={() => setOverlay({ type: 'lab', section: 'composants' })} /><Assistant /><section id="ressources" className="reference-section resources-section" aria-label="Documentation et laboratoire"><div className="section-top"><div><p className="section-number">05 <span>/</span> POUR ALLER PLUS LOIN</p><h2>Un syst&egrave;me ouvert. Un cadre pr&eacute;cis<span className="title-period">.</span></h2><p className="section-description">Retrouver le laboratoire original et pr&eacute;parer l'&eacute;volution, sans publication.</p></div><button className="text-button" onClick={() => setOverlay({ type: 'docs', section: 'pr' })}>La proposition de PR <Icon name="diagonal" size={16} /></button></div><div className="resource-links">{resources.map((resource) => <button key={resource.section} className="resource-link" onClick={() => setOverlay({ type: 'lab', section: resource.section })}><Icon name={resource.icon} size={23} /><span><strong>{resource.title}</strong><small>{resource.description}</small></span><Icon name="diagonal" size={20} /></button>)}</div><p className="scope-note"><span className="scope-dot" />Aper&ccedil;u ind&eacute;pendant. Aucun changement dans Matt Mez Admin, aucun appel Base44, aucune publication.</p></section></div>
    </main>
    <footer className="site-footer"><div className="wrap footer-inner"><Brand footer /><p>Le noir pour la lecture.<br />La couleur pour l'&eacute;motion.</p><div><button className="text-button" onClick={() => setOverlay({ type: 'docs' })}>Documentation <Icon name="diagonal" size={15} /></button><span>LE MONDE AIME&reg; &middot; Laboratoire de design</span></div></div><div className="footer-signature" /></footer>
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast && <><Icon name="check" size={17} /><span>{toast}</span><button className="toast-dismiss" aria-label="Fermer la notification" onClick={() => setToast(null)}><Icon name="close" size={15} /></button></>}</div>
    {overlay?.type === 'docs' && <Dialog title="Le langage LE MONDE AIME" onClose={() => setOverlay(null)} notification={toast} onDismissNotification={() => setToast(null)}><Documentation initialTab={overlay.section} onCopy={copy} notify={notify} onLab={() => setOverlay({ type: 'lab' })} /></Dialog>}
    {overlay?.type === 'compare' && <Dialog title="Avant / Apr&egrave;s : la palette" onClose={() => setOverlay(null)}><Comparison /></Dialog>}
    {overlay?.type === 'example' && <Dialog title="Une carte, une seule intention" className="example-dialog" onClose={() => setOverlay(null)}><div className="example-content"><img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=85" alt="Un musicien au saxophone." width="900" height="450" /><p className="section-number">EXEMPLE DE COMPOSANT</p><h3>Prestation saxophone</h3><p>Une ambiance &eacute;l&eacute;gante pour votre mariage.</p><p className="rule-note">Une carte de d&eacute;monstration uniquement. Aucun tarif, aucune r&eacute;servation et aucun dossier client. La logique m&eacute;tier n'est pas connect&eacute;e.</p><button className="button primary" onClick={() => setOverlay({ type: 'lab', section: 'composants' })}>Voir le composant original <Icon name="diagonal" size={16} /></button></div></Dialog>}
    {overlay?.type === 'lab' && <Dialog title="Le laboratoire original" className="lab-dialog" onClose={() => setOverlay(null)}><OriginalLab section={overlay.section} /></Dialog>}
  </>;
}
