(() => {
  const root = document.getElementById('couleurs-univers');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-universe-choice]')];
  const feedback = root.querySelector('#chromatic-feedback');
  const css = () => getComputedStyle(root);
  const token = (name) => css().getPropertyValue('--' + name).trim();
  const selectedTab = () => tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');
  const gradient = (prefix) => `linear-gradient(115deg, ${token(prefix + '-start')} 0%, ${token(prefix + '-middle')} 52%, ${token(prefix + '-end')} 100%)`;

  function selectUniverse(tab, focus = false) {
    root.dataset.universe = tab.dataset.universeChoice;
    root.querySelector('#chromatic-panel').setAttribute('aria-labelledby', tab.id);
    tabs.forEach((item) => {
      item.setAttribute('aria-selected', String(item === tab));
      item.tabIndex = item === tab ? 0 : -1;
    });
    ['start', 'middle', 'end'].forEach((stop) => {
      const value = token(tab.dataset.prefix + '-' + stop);
      root.querySelector(`[data-stop-swatch="${stop}"]`).style.background = value;
      root.querySelector(`[data-stop-value="${stop}"]`).textContent = value;
      root.querySelector(`[data-stop-name="${stop}"]`).textContent = tab.dataset['color' + stop[0].toUpperCase() + stop.slice(1)];
      root.querySelector(`[data-copy-stop="${stop}"]`).setAttribute('aria-label', 'Copier ' + value);
    });
    root.querySelector('[data-universe-description]').textContent = tab.dataset.description;
    if (focus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectUniverse(tab));
    tab.addEventListener('keydown', (event) => {
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
      if (next < 0) return;
      event.preventDefault();
      selectUniverse(tabs[next], true);
    });
  });

  async function copy(value) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const previous = document.activeElement;
        const field = document.createElement('textarea');
        field.value = value;
        field.style.cssText = 'position:fixed;opacity:0;left:0;top:0';
        document.body.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        previous?.focus();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      feedback.textContent = 'Code copie : ' + value;
    } catch {
      feedback.textContent = 'Presse-papiers indisponible. Code a copier manuellement : ' + value;
    }
  }

  root.querySelectorAll('[data-copy-token]').forEach((button) => button.addEventListener('click', () => copy(token(button.dataset.copyToken))));
  root.querySelectorAll('[data-copy-stop]').forEach((button) => button.addEventListener('click', () => copy(token(selectedTab().dataset.prefix + '-' + button.dataset.copyStop))));
  root.querySelector('[data-copy-signature]').addEventListener('click', () => copy(gradient('signature')));
  root.querySelectorAll('[data-token-label]').forEach((label) => { label.textContent = token(label.dataset.tokenLabel); });
  root.querySelectorAll('[data-surface-choice]').forEach((button) => button.addEventListener('click', () => {
    root.dataset.surface = button.dataset.surfaceChoice;
    root.querySelectorAll('[data-surface-choice]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  }));
  root.querySelectorAll('[data-chromatic-action]').forEach((button) => button.addEventListener('click', () => {
    feedback.textContent = 'Action de demonstration confirmee. Aucun envoi, aucun dossier cree.';
  }));

  function contrast(a, b) {
    const luminance = (color) => {
      const channels = color.replace('#', '').match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255);
      const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
      return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
    };
    const left = luminance(a);
    const right = luminance(b);
    return (Math.max(left, right) + .05) / (Math.min(left, right) + .05);
  }
  function updateContrast() {
    const foreground = token(root.querySelector('#chromatic-foreground').value);
    const background = token(root.querySelector('#chromatic-background').value);
    const ratio = contrast(foreground, background);
    const specimen = root.querySelector('[data-contrast-specimen]');
    specimen.style.color = foreground;
    specimen.style.background = background;
    root.querySelector('[data-contrast-result]').textContent = ratio.toFixed(2) + ':1 - ' + (ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'AA non atteint');
  }
  root.querySelectorAll('.chromatic-contrast-selects select').forEach((select) => select.addEventListener('change', updateContrast));
  selectUniverse(tabs[0]);
  updateContrast();
})();