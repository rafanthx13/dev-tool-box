import { escapeHtml, setupCopyButton } from "../utils/functions";

export const removeBlankLines = {
  id: "remove-blank-lines",
  name: "Removedor de Linhas Vazias",
  category: "Texto",
  icon: "eraser",
  description:
    "Remove linhas em branco desnecessárias de um texto, útil para corrigir tabelas Markdown geradas por IA com quebras de linha extras.",
  render: (container) => {
    container.innerHTML = `
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
            <i data-lucide="eraser" class="w-5 h-5 text-indigo-400"></i> Remover Linhas Vazias
          </h2>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Modo:</label>
            <div class="flex flex-col sm:flex-row gap-2">
              <label class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-3 cursor-pointer flex-1 hover:border-indigo-500 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:bg-slate-800">
                <input type="radio" name="blankMode" value="all" checked class="accent-indigo-500">
                <span class="text-sm text-slate-200">
                  Remover todas
                  <span class="block text-xs text-slate-400">Ideal para tabelas Markdown quebradas</span>
                </span>
              </label>
              <label class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-3 cursor-pointer flex-1 hover:border-indigo-500 transition-colors has-[:checked]:border-indigo-500 has-[:checked]:bg-slate-800">
                <input type="radio" name="blankMode" value="collapse" class="accent-indigo-500">
                <span class="text-sm text-slate-200">
                  Colapsar múltiplas
                  <span class="block text-xs text-slate-400">Mantém 1 linha entre parágrafos</span>
                </span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Texto Original:</label>
            <textarea id="blankIn" rows="8" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm" placeholder="Cole aqui o texto com linhas em branco extras..."></textarea>
          </div>
          <button id="btnBlank" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <i data-lucide="arrow-right" class="w-4 h-4"></i> Remover
          </button>
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-sm font-medium text-slate-300">Resultado:</label>
              <button id="copyBlank" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar</button>
            </div>
            <textarea id="blankOut" rows="8" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-indigo-300 font-mono text-sm"></textarea>
          </div>
        </div>
      `;

    const getMode = () =>
      container.querySelector('input[name="blankMode"]:checked').value;

    const convert = () => {
      const val = container.querySelector("#blankIn").value;
      const mode = getMode();

      let res;
      if (mode === "all") {
        res = val
          .split("\n")
          .filter((line) => line.trim() !== "")
          .join("\n");
      } else {
        // Colapsa 2+ quebras de linha (com ou sem espaços) em uma única quebra dupla
        res = val
          .split("\n")
          .reduce((acc, line) => {
            const isBlank = line.trim() === "";
            const lastWasBlank =
              acc.length > 0 && acc[acc.length - 1].trim() === "";
            if (isBlank && lastWasBlank) return acc; // pula duplicata
            acc.push(line);
            return acc;
          }, [])
          .join("\n");
      }

      container.querySelector("#blankOut").value = res;
    };

    container.querySelector("#btnBlank").addEventListener("click", convert);
    container.querySelector("#blankIn").addEventListener("input", convert);
    container.querySelectorAll('input[name="blankMode"]').forEach((radio) => {
      radio.addEventListener("change", convert);
    });
    setupCopyButton(container, "#copyBlank", "#blankOut");
  },
};
