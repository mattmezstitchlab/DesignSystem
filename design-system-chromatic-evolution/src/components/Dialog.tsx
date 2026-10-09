import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icons';

type DialogProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  notification?: ReactNode;
  onDismissNotification?: () => void;
};

export default function Dialog({ title, onClose, children, className = '', notification, onDismissNotification }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const dialog = ref.current;
    document.body.style.overflow = 'hidden';
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      if (previousFocus?.isConnected && previousFocus.getClientRects().length && !dialog?.contains(previousFocus)) {
        previousFocus.focus({ preventScroll: true });
      } else {
        const fallback = [...document.querySelectorAll<HTMLElement>('.mobile-toggle, .header-cta, .brand')].find((element) => element.getClientRects().length);
        fallback?.focus({ preventScroll: true });
      }
    };
  }, []);

  return createPortal(
    <dialog ref={ref} className={`app-dialog ${className}`} aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="dialog-shell">
        <header className="dialog-header"><div><span className="eyebrow">LE MONDE AIME&reg;</span><h2 id={titleId}>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Fermer la fenetre" autoFocus><Icon name="close" /></button></header>
        <div className="dialog-content">{children}</div>
        {notification && <div className="dialog-notification" role="status"><Icon name="check" size={16} /><span>{notification}</span><button onClick={onDismissNotification} aria-label="Fermer la notification"><Icon name="close" size={15} /></button></div>}
      </div>
    </dialog>, document.body,
  );
}