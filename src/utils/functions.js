export function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function setupCopyButton(container, btnSelector, targetSelector) {
  const btn = container.querySelector(btnSelector);
  const target = container.querySelector(targetSelector);
  if (!btn || !target) return;

  btn.addEventListener('click', () => {
    if (!target.value) return;
    navigator.clipboard.writeText(target.value).then(() => {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Copiado!`;
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 1500);
    });
  });
}