import { createIcons, icons } from 'lucide';

const STORAGE_KEY = 'capsLockFixer:exceptions';

const DEFAULT_EXCEPTIONS = [
  'CPF', 'CNPJ', 'RG', 'CEP', 'SQL', 'HTML', 'CSS', 'JS',
  'API', 'URL', 'URI', 'HTTP', 'HTTPS', 'JSON', 'XML', 'PDF', 'IA',
  'PA', 'FOPA', 'GMUD', 'DBA', 'PR'
];

function loadExceptions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Falha ao ler exceções salvas, usando padrão.', e);
  }
  return [...DEFAULT_EXCEPTIONS];
}

function saveExceptions(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Falha ao salvar exceções.', e);
  }
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function fixCapsLock(text, exceptions) {
  if (!text) return '';

  // 1. Tudo para minúsculo
  let result = text.toLowerCase();

  // 2. Capitaliza a 1ª letra do texto e a 1ª letra após . ! ?
  result = result.replace(/(^\s*[a-zà-ÿ])|([.!?]\s+)([a-zà-ÿ])/gi, (match) => {
    return match.toUpperCase();
  });

  // 3. Aplica exceções por cima (sempre vencem), respeitando \b (fronteira de palavra)
  exceptions.forEach((word) => {
    if (!word) return;
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi');
    result = result.replace(pattern, word);
  });

  return result;
}

export const capsLockFixerTool = {
  id: 'caps-lock-fixer',
  name: 'Corretor de Caps Lock',
  category: 'Texto',
  icon: 'case-sensitive',
  description: 'Corrige texto digitado acidentalmente com Caps Lock ligado, convertendo para minúsculas com capitalização normal de frases, preservando siglas como CPF, SQL e HTML.',
  render: (container) => {
    let exceptions = loadExceptions();

    container.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
          <i data-lucide="case-sensitive" class="w-5 h-5 text-indigo-400"></i> Corretor de Caps Lock
        </h2>
        <p class="text-sm text-slate-400">
          Cole o texto com Caps Lock acidental. Ele será convertido para minúsculas com capitalização
          normal de frases, mantendo em maiúsculo as siglas cadastradas na lista de exceções abaixo.
        </p>

        <details class="bg-slate-900 border border-slate-700 rounded-lg group">
          <summary class="px-3 py-2 cursor-pointer text-sm font-medium text-slate-300 flex items-center justify-between select-none">
            <span class="flex items-center gap-2">
              <i data-lucide="list" class="w-4 h-4 text-indigo-400"></i> Lista de exceções (sempre maiúsculas)
            </span>
            <i data-lucide="chevron-down" class="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform"></i>
          </summary>
          <div class="px-3 pb-3 pt-1 space-y-3">
            <div id="exceptionsList" class="flex flex-wrap gap-2"></div>
            <div class="flex gap-2">
              <input id="newExceptionInput" type="text" placeholder="Ex: NPS, ROI, UUID..."
                class="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              <button id="btnAddException" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1">
                <i data-lucide="plus" class="w-4 h-4"></i> Adicionar
              </button>
            </div>
          </div>
        </details>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Texto Original:</label>
          <textarea id="capsIn" rows="8" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm" placeholder="Cole aqui o texto com CAPS LOCK acidental..."></textarea>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-sm font-medium text-slate-300">Resultado corrigido:</label>
            <button id="copyCaps" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar</button>
          </div>
          <textarea id="capsOut" rows="8" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-indigo-300 font-mono text-sm"></textarea>
        </div>
      </div>
    `;

    const capsIn = container.querySelector('#capsIn');
    const capsOut = container.querySelector('#capsOut');
    const exceptionsListEl = container.querySelector('#exceptionsList');
    const newExceptionInput = container.querySelector('#newExceptionInput');

    const renderExceptions = () => {
      exceptionsListEl.innerHTML = exceptions
        .map((word, idx) => `
          <span class="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono rounded-full pl-3 pr-1.5 py-1">
            ${word}
            <button data-remove-idx="${idx}" class="hover:text-red-400 text-slate-500 rounded-full p-0.5" title="Remover">
              <i data-lucide="x" class="w-3 h-3 pointer-events-none"></i>
            </button>
          </span>
        `)
        .join('');

      exceptionsListEl.querySelectorAll('[data-remove-idx]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.getAttribute('data-remove-idx'));
          exceptions.splice(idx, 1);
          saveExceptions(exceptions);
          renderExceptions();
          convert();
        });
      });

      createIcons({ icons });
    };

    const convert = () => {
      capsOut.value = fixCapsLock(capsIn.value, exceptions);
    };

    const addException = () => {
      const raw = newExceptionInput.value.trim();
      if (!raw) return;
      const word = raw.toUpperCase();
      if (!exceptions.includes(word)) {
        exceptions.push(word);
        saveExceptions(exceptions);
        renderExceptions();
        convert();
      }
      newExceptionInput.value = '';
      newExceptionInput.focus();
    };

    capsIn.addEventListener('input', convert);
    container.querySelector('#btnAddException').addEventListener('click', addException);
    newExceptionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addException();
      }
    });

    container.querySelector('#copyCaps').addEventListener('click', async (e) => {
      try {
        await navigator.clipboard.writeText(capsOut.value);
        const btn = e.currentTarget;
        const original = btn.innerHTML;
        btn.textContent = 'Copiado!';
        setTimeout(() => { btn.innerHTML = original; }, 1500);
      } catch (err) {
        console.error('Falha ao copiar:', err);
      }
    });

    renderExceptions();
  },
};
