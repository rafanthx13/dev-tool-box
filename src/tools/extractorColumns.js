import { escapeHtml, setupCopyButton } from "../utils/functions";

export const extractorColumns = {
  id: "extrator-colunas-tabela",
  name: "Extrator de Colunas de tabela",
  category: "Validação & Dados",
  icon: "columns-3",
  description: "Cola tabelas do Teams/Excel e permite extrair e copiar individualmente qualquer coluna desejada.",
  render: (container) => {
    container.innerHTML = /*html*/`
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
                <i data-lucide="columns-3" class="w-5 h-5 text-indigo-400"></i> Extrator de Colunas Individuais (Teams / Excel)
              </h2>
              <p class="text-xs text-slate-400 mt-1">Cole a tabela inteira (copiada do Teams, Excel, Slack ou Web) para isolar e copiar apenas a coluna que você precisa.</p>
            </div>
            <button id="btnLoadTeamsTest" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto border border-slate-700">
              <i data-lucide="flask-conical" class="w-3.5 h-3.5 text-indigo-400"></i> Carregar Exemplo do Teams
            </button>
          </div>

          <!-- Input Textarea -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Cole a Tabela com Múltiplas Colunas:</label>
            <textarea id="tblIn" rows="5" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm" placeholder="Cole a tabela copiada do Teams ou Excel aqui..."></textarea>
          </div>

          <!-- Opções & Seleção de Coluna -->
          <div id="colButtonsContainer" class="hidden space-y-2 bg-slate-900/60 p-3 border border-slate-800 rounded-xl">
            <span class="block text-xs font-semibold uppercase tracking-wider text-slate-400">Clique na Coluna que deseja Copiar / Extrair:</span>
            <div id="colButtons" class="flex flex-wrap gap-2"></div>
          </div>

          <!-- Output Box & Preview Table -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <div class="flex flex-col">
              <div class="flex items-center justify-between mb-1">
                <label class="block text-sm font-medium text-slate-300">Coluna Extraída:</label>
                <button id="copyExtractedCol" class="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar Coluna
                </button>
              </div>
              <textarea id="colOut" readonly class="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg p-3 text-emerald-300 font-mono text-sm resize-none" placeholder="A coluna selecionada aparecerá aqui..."></textarea>
            </div>

            <div class="flex flex-col">
              <label class="block text-sm font-medium text-slate-300 mb-1">Visualização da Tabela Processada:</label>
              <div id="tablePreviewContainer" class="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg overflow-auto">
                <p class="p-4 text-slate-500 text-sm italic">Cole uma tabela acima para visualizar.</p>
              </div>
            </div>
          </div>
        </div>
      `;

    const tblIn = container.querySelector("#tblIn");
    const colButtonsContainer = container.querySelector("#colButtonsContainer");
    const colButtons = container.querySelector("#colButtons");
    const colOut = container.querySelector("#colOut");
    const previewContainer = container.querySelector("#tablePreviewContainer");

    let parsedRowsGlobal = [];
    let selectedColIdx = 0;

    const parseTable = () => {
      const text = tblIn.value.trim();
      if (!text) {
        colButtonsContainer.classList.add("hidden");
        previewContainer.innerHTML = `<p class="p-4 text-slate-500 text-sm italic">Cole uma tabela acima para visualizar.</p>`;
        colOut.value = "";
        return;
      }

      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length === 0) return;

      // Detect Separator: TAB (\t), Pipe (|), Semicolon (;), Comma (,) or Multiple Spaces
      const first = lines[0];
      let sep = "\t";
      if (first.includes("\t")) sep = "\t";
      else if (first.includes("|")) sep = "|";
      else if (first.includes(";") && !first.includes("\t")) sep = ";";
      else if (first.includes(",") && !first.includes("\t")) sep = ",";
      else sep = /\s{2,}/;

      parsedRowsGlobal = lines.map((line) =>
        line.split(sep).map((cell) =>
          cell
            .trim()
            .replace(/^\||\|$/g, "")
            .trim(),
        ),
      );
      const maxCols = Math.max(...parsedRowsGlobal.map((r) => r.length));

      // Render Column Choice Buttons
      colButtonsContainer.classList.remove("hidden");
      colButtons.innerHTML = "";

      for (let c = 0; c < maxCols; c++) {
        const headerName = parsedRowsGlobal[0][c] || `Coluna ${c + 1}`;
        const isSelected = c === selectedColIdx;
        const btn = document.createElement("button");
        btn.className = `px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all border ${
          isSelected
            ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20 font-bold"
            : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
        }`;
        btn.innerHTML = `<i data-lucide="column" class="w-3.5 h-3.5"></i> ${c + 1}. ${escapeHtml(headerName.slice(0, 20))}`;
        btn.addEventListener("click", () => {
          selectedColIdx = c;
          parseTable();
        });
        colButtons.appendChild(btn);
      }

      // Render Extracted Column Text
      const extractedValues = parsedRowsGlobal
        .map((row) => row[selectedColIdx] || "")
        .filter(Boolean);
      colOut.value = extractedValues.join("\n");

      // Render Table Preview HTML
      let tableHtml = `<table class="w-full text-left border-collapse text-xs font-mono"><thead class="bg-slate-900 sticky top-0 text-slate-300 border-b border-slate-800"><tr>`;
      for (let c = 0; c < maxCols; c++) {
        const isSel = c === selectedColIdx;
        tableHtml += `<th class="p-2 border-r border-slate-800 ${isSel ? "bg-indigo-950/80 text-indigo-300 font-bold" : ""}">Col ${c + 1}</th>`;
      }
      tableHtml += `</tr></thead><tbody class="divide-y divide-slate-800/60">`;

      parsedRowsGlobal.forEach((row, rIdx) => {
        tableHtml += `<tr class="${rIdx === 0 ? "bg-slate-900/40 font-semibold text-slate-200" : "hover:bg-slate-900/30"}">`;
        for (let c = 0; c < maxCols; c++) {
          const cellVal = row[c] || "";
          const isSel = c === selectedColIdx;
          tableHtml += `<td class="p-2 border-r border-slate-800 ${isSel ? "bg-indigo-950/40 text-emerald-300 font-bold" : "text-slate-300"}">${escapeHtml(cellVal)}</td>`;
        }
        tableHtml += `</tr>`;
      });
      tableHtml += `</tbody></table>`;

      previewContainer.innerHTML = tableHtml;
    };

    tblIn.addEventListener("input", parseTable);

    // Load Teams Test Case
    container
      .querySelector("#btnLoadTeamsTest")
      .addEventListener("click", () => {
        tblIn.value = `ID\tNome Completo\tEmail Corporativo\tCPF\tCargo\n101\tAna Maria Silva\tana.silva@empresa.com\t00012345678\tDesenvolvedor Senior\n102\tRoberto Carlos\troberto.carlos@empresa.com\t00098765432\tAnalista de Dados\n103\tCarla Souza\tcarla.souza@empresa.com\t00112233445\tGerente de Projeto`;
        selectedColIdx = 3; // Select CPF column by default in test
        parseTable();
      });

    setupCopyButton(container, "#copyExtractedCol", "#colOut");
  },
};
