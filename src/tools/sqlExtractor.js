import { setupCopyButton } from "../utils/functions";

export const sqlExtractor = {
  id: "sql-query-extractor",
  name: "Extrator de Tabelas SQL",
  category: "SQL & Dados",
  icon: "database",
  description:
    "Extrai os nomes de tabelas utilizadas nas cláusulas FROM e JOIN de uma consulta SQL.",
  render: (container) => {
    container.innerHTML = /*html*/`
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
            <i data-lucide="database" class="w-5 h-5 text-indigo-400"></i> Extrair Tabelas de Consulta SQL
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <div class="flex flex-col">
              <label class="block text-sm font-medium text-slate-300 mb-1">Consulta SQL:</label>
              <textarea id="sqlQuery" class="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm resize-none" placeholder="SELECT u.id, p.total&#10;FROM usuarios u&#10;INNER JOIN pedidos p ON u.id = p.user_id&#10;LEFT JOIN enderecos e ON u.id = e.user_id"></textarea>
              <button id="btnExtractTables" class="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                <i data-lucide="search" class="w-4 h-4"></i> Executar Extração
              </button>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center justify-between mb-1">
                <label class="block text-sm font-medium text-slate-300">Tabelas Encontradas:</label>
                <button id="copyExtractedTables" class="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hidden">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar Lista
                </button>
              </div>
              <div id="tableListContainer" class="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg p-3 overflow-y-auto">
                <p class="text-slate-500 text-sm italic">Insira a consulta SQL e clique em "Executar Extração".</p>
              </div>
            </div>
          </div>
        </div>
      `;

    function extractTablesFromSQL(sql) {
      if (!sql) return [];
      let clean = sql
        .replace(/--.*$/gm, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/'[^']*'/g, "")
        .replace(/"[^"]*"/g, "");

      const tableNames = new Set();
      const reservedKeywords = new Set([
        "SELECT",
        "WHERE",
        "GROUP",
        "HAVING",
        "ORDER",
        "LIMIT",
        "UNION",
        "ALL",
        "JOIN",
        "LEFT",
        "RIGHT",
        "INNER",
        "OUTER",
        "CROSS",
        "FULL",
        "ON",
        "USING",
        "AS",
        "AND",
        "OR",
        "SET",
        "INSERT",
        "UPDATE",
        "DELETE",
        "INTO",
        "VALUES",
      ]);

      const fromMatches = [
        ...clean.matchAll(
          /\bFROM\s+([\w\.\,`"\s]+?)(?=\bWHERE\b|\bGROUP\b|\bHAVING\b|\bORDER\b|\bLIMIT\b|\bUNION\b|\bJOIN\b|\bLEFT\b|\bRIGHT\b|\bINNER\b|\bOUTER\b|\bCROSS\b|\bFULL\b|;|$)/gi,
        ),
      ];
      fromMatches.forEach((m) => {
        const rawTables = m[1].split(",");
        rawTables.forEach((tStr) => {
          const parts = tStr.trim().split(/\s+/);
          if (parts.length > 0 && parts[0]) {
            const name = parts[0].replace(/[`"']/g, "");
            if (name && !reservedKeywords.has(name.toUpperCase())) {
              tableNames.add(name);
            }
          }
        });
      });

      const joinMatches = [
        ...clean.matchAll(
          /\b(?:JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|CROSS\s+JOIN|FULL\s+JOIN|OUTER\s+JOIN)\s+([`"'\w\.]+)/gi,
        ),
      ];
      joinMatches.forEach((m) => {
        const name = m[1].trim().replace(/[`"']/g, "");
        if (name && !reservedKeywords.has(name.toUpperCase())) {
          tableNames.add(name);
        }
      });

      return Array.from(tableNames);
    }

    const runExtract = () => {
      const query = container.querySelector("#sqlQuery").value;
      const tables = extractTablesFromSQL(query);
      const listContainer = container.querySelector("#tableListContainer");
      const copyBtn = container.querySelector("#copyExtractedTables");
      listContainer.innerHTML = "";

      if (tables.length > 0) {
        copyBtn.classList.remove("hidden");
        const ul = document.createElement("ul");
        ul.className = "space-y-1.5";
        tables.forEach((table) => {
          const li = document.createElement("li");
          li.className =
            "px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-indigo-300 font-mono text-sm flex items-center gap-2.5";
          li.innerHTML = `<i data-lucide="table" class="w-4 h-4 text-indigo-400"></i> <span>${table}</span>`;
          ul.appendChild(li);
        });
        listContainer.appendChild(ul);
      } else if (query.trim().length > 0) {
        copyBtn.classList.add("hidden");
        listContainer.innerHTML = `<p class="text-amber-400 text-sm">Nenhuma tabela identificada nas cláusulas FROM / JOIN.</p>`;
      } else {
        copyBtn.classList.add("hidden");
        listContainer.innerHTML = `<p class="text-slate-500 text-sm italic">Insira a consulta SQL e clique em "Executar Extração".</p>`;
      }
    };

    container
      .querySelector("#btnExtractTables")
      .addEventListener("click", runExtract);

    container
      .querySelector("#copyExtractedTables")
      .addEventListener("click", () => {
        const query = container.querySelector("#sqlQuery").value;
        const tables = extractTablesFromSQL(query);
        if (tables.length === 0) return;
        navigator.clipboard.writeText(tables.join("\n")).then(() => {
          const copyBtn = container.querySelector("#copyExtractedTables");
          const orig = copyBtn.innerHTML;
          copyBtn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Copiado!`;
          setTimeout(() => {
            copyBtn.innerHTML = orig;
          }, 1500);
        });
      });
  },
};
