import TurndownService from 'turndown';

export const htmlToMdTool = {
    id: 'html-to-markdown-paste',
    name: 'Colar como Markdown',
    category: 'Texto',
    icon: 'clipboard-paste',
    description: 'Cole um texto formatado (negrito, código, listas) copiado de sites como o Claude e converta automaticamente para Markdown puro, sem perder a formatação.',
    render: (container) => {
      container.innerHTML = /*html*/`
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
            <i data-lucide="clipboard-paste" class="w-5 h-5 text-indigo-400"></i> Colar como Markdown
          </h2>
          <p class="text-sm text-slate-400">
            Cole (Ctrl+V) um trecho de texto formatado abaixo — por exemplo, uma resposta do Claude com negrito e código.
            Ele já aparece convertido em Markdown puro, pronto pra copiar.
          </p>

          <div class="flex justify-between items-center mb-1">
            <label class="text-sm font-medium text-slate-300">Cole aqui (vira Markdown automaticamente):</label>
            <div class="flex gap-3">
              <button id="btnClearPaste" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
                <i data-lucide="eraser" class="w-3.5 h-3.5"></i> Limpar
              </button>
              <button id="copyMd" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar
              </button>
            </div>
          </div>

          <div id="pasteZone" contenteditable="true"
               class="w-full min-h-[220px] bg-slate-950 border border-slate-800 rounded-lg p-3 text-indigo-300 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none whitespace-pre-wrap"
               data-placeholder="Cole (Ctrl+V) o texto formatado aqui...">
          </div>
        </div>

        <style>
          #pasteZone:empty:before {
            content: attr(data-placeholder);
            color: #64748b;
            font-family: ui-sans-serif, system-ui, sans-serif;
          }
        </style>
      `;

      const pasteZone = container.querySelector('#pasteZone');

      const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
      });

      pasteZone.addEventListener('paste', (e) => {
        e.preventDefault();

        const clipboardData = e.clipboardData || window.clipboardData;
        const html = clipboardData.getData('text/html');
        const plain = clipboardData.getData('text/plain');

        const markdown = html ? turndownService.turndown(html) : plain;

        pasteZone.innerText = markdown;
      });

      container.querySelector('#btnClearPaste').addEventListener('click', () => {
        pasteZone.innerText = '';
      });

      container.querySelector('#copyMd').addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pasteZone.innerText);
          const btn = container.querySelector('#copyMd');
          const original = btn.innerHTML;
          btn.innerHTML = `Copiado!`;
          setTimeout(() => {
            btn.innerHTML = original;
          }, 1500);
        } catch (err) {
          console.error('Falha ao copiar:', err);
        }
      });
    }
};
