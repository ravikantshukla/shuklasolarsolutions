export function initBannerAutoHide() {
  const banner = document.getElementById('urgencyBanner');
  window.addEventListener('scroll', () => {
    banner.classList.toggle('hidden', window.scrollY > 120);
  }, { passive: true });
}

export function initCalculatorToggle() {
  const toggleButton = document.getElementById('toggleCalculator');
  const calculator = document.getElementById('calculatorPanel');

  toggleButton.addEventListener('click', () => {
    const isOpen = calculator.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    toggleButton.textContent = isOpen ? 'Hide Calculator' : 'Calculate Your Savings';
  });
}

export function setFooterYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}
