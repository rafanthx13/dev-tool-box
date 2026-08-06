import { setupCopyButton } from "../utils/functions";

export const generateTableSql = {
  id: "gerador-tabela-sql",
  name: "Gerador de Tabela SQL + INSERTS",
  category: "SQL & Dados",
  icon: "table-properties",
  description:
    "Gera DDL de tabela temporária ou física com id autoincremento e INSERTS a partir de uma lista de valores.",
  render: (container) => {
    container.innerHTML = /*html*/`
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
                <i data-lucide="table-properties" class="w-5 h-5 text-indigo-400"></i> Gerador de Tabela SQL + INSERTS para Investigação
              </h2>
              <p class="text-xs text-slate-400 mt-1">Cria a estrutura DDL (CREATE TABLE) e os comandos INSERT a partir de uma lista de valores (um por linha).</p>
            </div>
            <button id="btnLoadSqlTest" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto border border-slate-700">
              <i data-lucide="flask-conical" class="w-3.5 h-3.5 text-indigo-400"></i> Carregar Exemplo de Teste
            </button>
          </div>

          <!-- Opções da Tabela -->
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-slate-900/60 p-3.5 border border-slate-800 rounded-xl">
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Nome da Tabela:</label>
              <input type="text" id="tableName" value="tmp_investigacao" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Nome da Coluna:</label>
              <input type="text" id="colName" value="value" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono">
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Tipo do Dado:</label>
              <select id="colDataType" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono">
                <option value="varchar" selected>VARCHAR (Texto / Aspas)</option>
                <option value="int">INT / BIGINT (Número / Sem aspas)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Tipo de Tabela:</label>
              <select id="tableType" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono">
                <option value="temp" selected>Temporária (TEMPORARY)</option>
                <option value="physical">Física (PADRÃO)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Sintaxe / Banco SQL:</label>
              <select id="sqlDialect" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono">
                <option value="mysql" selected>MySQL / MariaDB</option>
                <option value="postgres">PostgreSQL</option>
                <option value="sqlserver">SQL Server (T-SQL)</option>
                <option value="sqlite">SQLite</option>
                <option value="oracle">Oracle</option>
              </select>
            </div>
          </div>

          <!-- Input Textarea & Output SQL -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <div class="flex flex-col">
              <label class="block text-sm font-medium text-slate-300 mb-1">Insira os Valores (Um por linha):</label>
              <textarea id="sqlValIn" class="w-full h-72 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm resize-none" placeholder="1001&#10;1002&#10;1003&#10;ABC999"></textarea>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center justify-between mb-1">
                <label class="block text-sm font-medium text-slate-300">Código SQL Gerado:</label>
                <button id="copyGeneratedSql" class="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar SQL Completo
                </button>
              </div>
              <textarea id="sqlValOut" readonly class="w-full h-72 bg-slate-950 border border-slate-800 rounded-lg p-3 text-cyan-300 font-mono text-xs resize-none"></textarea>
            </div>
          </div>
        </div>
      `;

    const inputVal = container.querySelector("#sqlValIn");
    const outputSql = container.querySelector("#sqlValOut");
    const tableNameEl = container.querySelector("#tableName");
    const colNameEl = container.querySelector("#colName");
    const colDataTypeEl = container.querySelector("#colDataType");
    const tableTypeEl = container.querySelector("#tableType");
    const dialectEl = container.querySelector("#sqlDialect");

    const generateSQL = () => {
      const rawText = inputVal.value;
      const lines = rawText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const tName = tableNameEl.value.trim() || "tmp_investigacao";
      const cName = colNameEl.value.trim() || "value";
      const isInt = colDataTypeEl.value === "int";
      const isTemp = tableTypeEl.value === "temp";
      const dialect = dialectEl.value;

      if (lines.length === 0) {
        outputSql.value =
          "-- Insira ao menos um valor na caixa da esquerda para gerar o código SQL.";
        return;
      }

      let columnTypeDef = "";
      if (isInt) {
        columnTypeDef = dialect === "oracle" ? "NUMBER(19)" : "BIGINT";
      } else {
        const maxLen = Math.max(...lines.map((l) => l.length), 10);
        const varcharSize = Math.max(Math.ceil(maxLen / 10) * 10, 50);
        columnTypeDef =
          dialect === "oracle"
            ? `VARCHAR2(${varcharSize})`
            : dialect === "sqlite"
              ? "TEXT"
              : `VARCHAR(${varcharSize})`;
      }

      let ddl = "";
      let insertHeader = "";

      const formatValue = (v) => {
        if (isInt) {
          const cleanNum = v.replace(/[^\d-]/g, "");
          return cleanNum ? cleanNum : "0";
        }
        return `'${v.replace(/'/g, "''")}'`;
      };

      if (dialect === "mysql") {
        const createCmd = isTemp ? "CREATE TEMPORARY TABLE" : "CREATE TABLE";
        ddl = `${createCmd} ${tName} (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    ${cName} ${columnTypeDef} NOT NULL\n);`;
        const values = lines.map(formatValue).join(",\n    ");
        insertHeader = `INSERT INTO ${tName} (${cName}) VALUES\n    ${values};`;
      } else if (dialect === "postgres") {
        const createCmd = isTemp ? "CREATE TEMP TABLE" : "CREATE TABLE";
        ddl = `${createCmd} ${tName} (\n    id SERIAL PRIMARY KEY,\n    ${cName} ${columnTypeDef} NOT NULL\n);`;
        const values = lines.map(formatValue).join(",\n    ");
        insertHeader = `INSERT INTO ${tName} (${cName}) VALUES\n    ${values};`;
      } else if (dialect === "sqlserver") {
        const tablePrefix = isTemp && !tName.startsWith("#") ? "#" : "";
        const realName = `${tablePrefix}${tName}`;
        ddl = `CREATE TABLE ${realName} (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    ${cName} ${columnTypeDef} NOT NULL\n);`;
        const values = lines.map(formatValue).join(",\n    ");
        insertHeader = `INSERT INTO ${realName} (${cName}) VALUES\n    ${values};`;
      } else if (dialect === "sqlite") {
        const createCmd = isTemp ? "CREATE TEMP TABLE" : "CREATE TABLE";
        ddl = `${createCmd} ${tName} (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    ${cName} ${columnTypeDef} NOT NULL\n);`;
        const values = lines.map(formatValue).join(",\n    ");
        insertHeader = `INSERT INTO ${tName} (${cName}) VALUES\n    ${values};`;
      } else if (dialect === "oracle") {
        const createCmd = isTemp
          ? "CREATE GLOBAL TEMPORARY TABLE"
          : "CREATE TABLE";
        const tempOptions = isTemp ? " ON COMMIT PRESERVE ROWS" : "";
        ddl = `${createCmd} ${tName} (\n    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    ${cName} ${columnTypeDef} NOT NULL\n)${tempOptions};`;
        const inserts = lines
          .map(
            (v) =>
              `INSERT INTO ${tName} (${cName}) VALUES (${formatValue(v)});`,
          )
          .join("\n");
        insertHeader = inserts;
      }

      outputSql.value = `-- Script de Criação e Carga para Investigação SQL (${isInt ? "INTEGER" : "VARCHAR"})\n${ddl}\n\n${insertHeader}`;
    };

    inputVal.addEventListener("input", generateSQL);
    tableNameEl.addEventListener("input", generateSQL);
    colNameEl.addEventListener("input", generateSQL);
    colDataTypeEl.addEventListener("change", generateSQL);
    tableTypeEl.addEventListener("change", generateSQL);
    dialectEl.addEventListener("change", generateSQL);

    // Load Test Case
    container.querySelector("#btnLoadSqlTest").addEventListener("click", () => {
      inputVal.value = `8888888\n9999999\n124241443\n12345678901\n12345678000195`;
      generateSQL();
    });

    setupCopyButton(container, "#copyGeneratedSql", "#sqlValOut");
  },
};
