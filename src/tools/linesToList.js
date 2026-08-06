import { setupCopyButton } from "../utils/functions";

export const linesToList = {
  id: "lines-to-list",
  name: "Linhas para Lista SQL (IN)",
  category: "SQL & Dados",
  icon: "list-ordered",
  description:
    "Transforma linhas em uma lista separada por vírgulas, com opção de aspas para usar na cláusula WHERE IN (...).",
  render: (container) => {
    container.innerHTML = /*html*/`
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
            <i data-lucide="list-ordered" class="w-5 h-5 text-indigo-400"></i> Sequência de Números / Palavras para SQL IN
          </h2>
          <p class="text-sm text-slate-400">Insira valores (um por linha) vindos de colunas de Excel/CSV para gerar uma string formatada para a cláusula IN do SQL.</p>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Sequência (uma por linha):</label>
            <textarea id="seqIn" rows="6" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm" placeholder="1001&#10;1002&#10;1003"></textarea>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="chkQuotes" class="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500">
            <label for="chkQuotes" class="text-sm font-medium text-slate-300">Adicionar aspas duplas ("valor")</label>
          </div>
          <button id="btnSeq" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <i data-lucide="sparkles" class="w-4 h-4"></i> Formatar
          </button>
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-sm font-medium text-slate-300">Resultado:</label>
              <button id="copySeq" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar</button>
            </div>
            <textarea id="seqOut" rows="4" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-emerald-300 font-mono text-sm"></textarea>
          </div>
        </div>
      `;

    container.querySelector("#btnSeq").addEventListener("click", () => {
      const raw = container
        .querySelector("#seqIn")
        .value.trim()
        .split("\n")
        .filter(Boolean);
      const quotes = container.querySelector("#chkQuotes").checked;
      const formatted = raw
        .map((i) => (quotes ? `"${i.trim()}"` : i.trim()))
        .join(", ");
      container.querySelector("#seqOut").value = formatted;
    });

    setupCopyButton(container, "#copySeq", "#seqOut");
  },
};
