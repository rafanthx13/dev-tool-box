import { setupCopyButton } from "../utils/functions";

export const kebabCase = {
  id: "kebab-case",
  name: "Kebab Case Converter",
  category: "Texto",
  icon: "type",
  description: "Converte frases ou palavras para o formato separado por hífens (kebab-case).",
  render: (container) => {
    container.innerHTML = `
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
            <i data-lucide="type" class="w-5 h-5 text-indigo-400"></i> Converter para Kebab-Case
          </h2>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Texto Original:</label>
            <textarea id="kebabIn" rows="4" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm" placeholder="Digite seu texto aqui..."></textarea>
          </div>
          <button id="btnKebab" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <i data-lucide="arrow-right" class="w-4 h-4"></i> Converter
          </button>
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-sm font-medium text-slate-300">Resultado em kebab-case:</label>
              <button id="copyKebab" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar</button>
            </div>
            <textarea id="kebabOut" rows="4" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-indigo-300 font-mono text-sm"></textarea>
          </div>
        </div>
      `;

    const convert = () => {
      const val = container.querySelector("#kebabIn").value;
      const res = val.toLowerCase().trim().replace(/\s+/g, "-");
      container.querySelector("#kebabOut").value = res;
    };

    container.querySelector("#btnKebab").addEventListener("click", convert);
    container.querySelector("#kebabIn").addEventListener("input", convert);
    setupCopyButton(container, "#copyKebab", "#kebabOut");
  },
};
