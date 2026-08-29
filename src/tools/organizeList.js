import { setupCopyButton } from "../utils/functions";

const EXAMPLE_TEXT = `

  zebra
usuarios
Usuarios
  pedidos

pedidos


enderecos
  abc
abc

`;

function organizeLines(text) {
  const lines = text.split('\n');

  const trimmed = lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const unique = [...new Set(trimmed)];

  unique.sort((a, b) => a.localeCompare(b, 'pt-BR'));

  return unique.join('\n');
}

export const organizeList = {
  id: 'organizar-lista',
  name: 'Organizador de Listas',
  category: 'Texto',
  icon: 'list-ordered',
  description: 'Ordena alfabeticamente, remove linhas duplicadas, aplica trim e limpa linhas em branco de uma lista de registros (ex: nomes de tabelas coletados de várias fontes).',
  render: (container) => {
    container.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
          <i data-lucide="list-ordered" class="w-5 h-5 text-indigo-400"></i> Organizador de Listas
        </h2>
        <p class="text-sm text-slate-400">
          Cole uma lista com um registro por linha (ex: nomes de tabelas). O resultado sai ordenado
          alfabeticamente, sem duplicatas, sem espaços sobrando e sem linhas em branco.
        </p>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-sm font-medium text-slate-300">Lista original:</label>
            <button id="btnExampleList" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
              <i data-lucide="wand-2" class="w-3.5 h-3.5"></i> Ver exemplo
            </button>
          </div>
          <textarea id="listIn" rows="10" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm" placeholder="Cole aqui um registro por linha..."></textarea>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-sm font-medium text-slate-300">Resultado (ordenado, sem duplicatas):</label>
            <button id="copyList" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar</button>
          </div>
          <textarea id="listOut" rows="10" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-indigo-300 font-mono text-sm"></textarea>
        </div>

        <p id="listCount" class="text-xs text-slate-500"></p>
      </div>
    `;

    const listIn = container.querySelector('#listIn');
    const listOut = container.querySelector('#listOut');
    const listCount = container.querySelector('#listCount');

    const convert = () => {
      const inputLineCount = listIn.value.split('\n').filter((l) => l.trim().length > 0).length;
      const result = organizeLines(listIn.value);
      listOut.value = result;

      const outputLineCount = result ? result.split('\n').length : 0;
      const removed = inputLineCount - outputLineCount;

      listCount.textContent = result
        ? `${outputLineCount} registro(s) único(s)${removed > 0 ? ` — ${removed} duplicata(s)/vazia(s) removida(s)` : ''}.`
        : '';
    };

    listIn.addEventListener('input', convert);

    container.querySelector('#btnExampleList').addEventListener('click', () => {
      listIn.value = EXAMPLE_TEXT;
      convert();
    });

    setupCopyButton(container, '#copyList', '#listOut');
  },
};
