import { escapeHtml, setupCopyButton } from '../utils/functions';

export const validatorCpfCnpj = {
  id: "validador-cpf-cnpj",
  name: "Validador CPF/CNPJ",
  category: "Validação & Dados",
  icon: "shield-alert",
  description: "Valida se o Excel removeu zeros à esquerda de CPFs (11 dígitos) ou CNPJs (14 dígitos) e restaura os zeros faltantes.",
  render: (container) => {
    container.innerHTML = /*html*/`
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
                <i data-lucide="shield-alert" class="w-5 h-5 text-amber-400"></i> Validador e Corretor de CPF / CNPJ (Zeros à Esquerda)
              </h2>
              <p class="text-xs text-slate-400 mt-1">Identifica linhas em que o Excel converteu para número e "comeu" os zeros iniciais.</p>
            </div>
            <button id="btnLoadTest" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto border border-slate-700">
              <i data-lucide="flask-conical" class="w-3.5 h-3.5 text-indigo-400"></i> Carregar Exemplo de Teste
            </button>
          </div>

          <!-- Input Textarea sem placeholder -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Cole a lista de CPFs / CNPJs (Um por linha):</label>
            <textarea id="cpfIn" rows="6" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm"></textarea>
          </div>

          <!-- Summary Badges -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
              <span class="text-xs text-slate-400 block">Total de Linhas</span>
              <span id="statTotal" class="text-lg font-bold text-slate-200">0</span>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
              <span class="text-xs text-slate-400 block">Válidos (11 ou 14d)</span>
              <span id="statValid" class="text-lg font-bold text-emerald-400">0</span>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
              <span class="text-xs text-slate-400 block">Faltando Zeros</span>
              <span id="statInvalid" class="text-lg font-bold text-amber-400">0</span>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
              <span class="text-xs text-slate-400 block">Outros Tamanhos</span>
              <span id="statUnknown" class="text-lg font-bold text-rose-400">0</span>
            </div>
          </div>

          <!-- Interactive Results Table -->
          <div>
            <span class="block text-sm font-medium text-slate-300 mb-2">Diagnóstico Linha a Linha:</span>
            <div class="overflow-x-auto border border-slate-800 rounded-xl max-h-60 overflow-y-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead class="bg-slate-900 sticky top-0 text-slate-400 border-b border-slate-800 font-mono">
                  <tr>
                    <th class="p-2.5 w-12 text-center">#</th>
                    <th class="p-2.5">Valor Inserido</th>
                    <th class="p-2.5 text-center">Dígitos</th>
                    <th class="p-2.5">Diagnóstico</th>
                    <th class="p-2.5">Valor Corrigido (Com Zeros)</th>
                  </tr>
                </thead>
                <tbody id="cpfTableBody" class="divide-y divide-slate-800/60 font-mono">
                  <tr><td colspan="5" class="p-4 text-center text-slate-500 font-sans">Nenhum dado inserido.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Action & Corrected Output -->
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-sm font-medium text-slate-300">Lista Completa Corrigida (Pronta para colar no Excel):</label>
              <button id="copyCpfOut" class="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar Corrigidos
              </button>
            </div>
            <textarea id="cpfOut" rows="5" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-emerald-300 font-mono text-sm"></textarea>
          </div>
        </div>
      `;

    const inputEl = container.querySelector("#cpfIn");
    const tableBody = container.querySelector("#cpfTableBody");
    const outputEl = container.querySelector("#cpfOut");

    const processLines = () => {
      const rawText = inputEl.value;
      const lines = rawText.split("\n");

      let countTotal = 0;
      let countValid = 0;
      let countInvalid = 0;
      let countUnknown = 0;

      const results = [];
      const correctedLines = [];

      lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        countTotal++;
        const cleanDigits = trimmed.replace(/\D/g, "");
        const len = cleanDigits.length;

        let statusTag = "";
        let corrected = cleanDigits;

        if (len === 11) {
          countValid++;
          statusTag = `<span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-sans">✅ CPF Válido (11 dígitos)</span>`;
        } else if (len === 14) {
          countValid++;
          statusTag = `<span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-sans">✅ CNPJ Válido (14 dígitos)</span>`;
        } else if (len > 0 && len < 11) {
          countInvalid++;
          const missing = 11 - len;
          corrected = cleanDigits.padStart(11, "0");
          statusTag = `<span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-sans">⚠️ Faltam ${missing} zero(s) (Preenchido para CPF 11d)</span>`;
        } else if (len > 11 && len < 14) {
          countInvalid++;
          const missing = 14 - len;
          corrected = cleanDigits.padStart(14, "0");
          statusTag = `<span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-sans">⚠️ Faltam ${missing} zero(s) (Preenchido para CNPJ 14d)</span>`;
        } else {
          countUnknown++;
          statusTag = `<span class="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-sans">❌ Tamanho Anômalo (${len} dígitos)</span>`;
        }

        correctedLines.push(corrected);

        results.push(`
            <tr class="hover:bg-slate-800/40 transition-colors">
              <td class="p-2.5 text-center text-slate-500">${index + 1}</td>
              <td class="p-2.5 text-slate-200">${escapeHtml(trimmed)}</td>
              <td class="p-2.5 text-center font-bold ${len === 11 || len === 14 ? "text-emerald-400" : "text-amber-400"}">${len}</td>
              <td class="p-2.5">${statusTag}</td>
              <td class="p-2.5 text-emerald-300 font-bold">${corrected}</td>
            </tr>
          `);
      });

      container.querySelector("#statTotal").textContent = countTotal;
      container.querySelector("#statValid").textContent = countValid;
      container.querySelector("#statInvalid").textContent = countInvalid;
      container.querySelector("#statUnknown").textContent = countUnknown;

      if (results.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500 font-sans">Nenhum dado inserido.</td></tr>`;
        outputEl.value = "";
      } else {
        tableBody.innerHTML = results.join("");
        outputEl.value = correctedLines.join("\n");
      }
    };

    inputEl.addEventListener("input", processLines);

    // Button Load Test Case
    container.querySelector("#btnLoadTest").addEventListener("click", () => {
      inputEl.value = `8888888\n9999999\n124241443\n12345678901\n12345678000195`;
      processLines();
    });

    setupCopyButton(container, "#copyCpfOut", "#cpfOut");
  },
};
