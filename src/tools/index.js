// Registro e implementação das ferramentas ativas do dev-tool-box (Vanilla JS)

export const tools = [
  {
    id: 'validador-cpf-cnpj',
    name: 'Validador CPF/CNPJ (Zeros no Excel)',
    category: 'Validação & Dados',
    icon: 'shield-alert',
    description: 'Valida se o Excel removeu zeros à esquerda de CPFs (11 dígitos) ou CNPJs (14 dígitos) e restaura os zeros faltantes.',
    render: (container) => {
      container.innerHTML = `
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

      const inputEl = container.querySelector('#cpfIn');
      const tableBody = container.querySelector('#cpfTableBody');
      const outputEl = container.querySelector('#cpfOut');

      const processLines = () => {
        const rawText = inputEl.value;
        const lines = rawText.split('\n');

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
          const cleanDigits = trimmed.replace(/\D/g, '');
          const len = cleanDigits.length;

          let statusTag = '';
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
            corrected = cleanDigits.padStart(11, '0');
            statusTag = `<span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-sans">⚠️ Faltam ${missing} zero(s) (Preenchido para CPF 11d)</span>`;
          } else if (len > 11 && len < 14) {
            countInvalid++;
            const missing = 14 - len;
            corrected = cleanDigits.padStart(14, '0');
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
              <td class="p-2.5 text-center font-bold ${len === 11 || len === 14 ? 'text-emerald-400' : 'text-amber-400'}">${len}</td>
              <td class="p-2.5">${statusTag}</td>
              <td class="p-2.5 text-emerald-300 font-bold">${corrected}</td>
            </tr>
          `);
        });

        container.querySelector('#statTotal').textContent = countTotal;
        container.querySelector('#statValid').textContent = countValid;
        container.querySelector('#statInvalid').textContent = countInvalid;
        container.querySelector('#statUnknown').textContent = countUnknown;

        if (results.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500 font-sans">Nenhum dado inserido.</td></tr>`;
          outputEl.value = '';
        } else {
          tableBody.innerHTML = results.join('');
          outputEl.value = correctedLines.join('\n');
        }
      };

      inputEl.addEventListener('input', processLines);

      // Button Load Test Case
      container.querySelector('#btnLoadTest').addEventListener('click', () => {
        inputEl.value = `8888888\n9999999\n124241443\n12345678901\n12345678000195`;
        processLines();
      });

      setupCopyButton(container, '#copyCpfOut', '#cpfOut');
    }
  },
  {
    id: 'extrator-colunas-tabela',
    name: 'Extrator de Colunas (Teams / Tabela)',
    category: 'Validação & Dados',
    icon: 'columns-3',
    description: 'Cola tabelas do Teams/Excel e permite extrair e copiar individualmente qualquer coluna desejada.',
    render: (container) => {
      container.innerHTML = `
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

      const tblIn = container.querySelector('#tblIn');
      const colButtonsContainer = container.querySelector('#colButtonsContainer');
      const colButtons = container.querySelector('#colButtons');
      const colOut = container.querySelector('#colOut');
      const previewContainer = container.querySelector('#tablePreviewContainer');

      let parsedRowsGlobal = [];
      let selectedColIdx = 0;

      const parseTable = () => {
        const text = tblIn.value.trim();
        if (!text) {
          colButtonsContainer.classList.add('hidden');
          previewContainer.innerHTML = `<p class="p-4 text-slate-500 text-sm italic">Cole uma tabela acima para visualizar.</p>`;
          colOut.value = '';
          return;
        }

        const lines = text.split(/\r?\n/).filter(l => l.trim());
        if (lines.length === 0) return;

        // Detect Separator: TAB (\t), Pipe (|), Semicolon (;), Comma (,) or Multiple Spaces
        const first = lines[0];
        let sep = '\t';
        if (first.includes('\t')) sep = '\t';
        else if (first.includes('|')) sep = '|';
        else if (first.includes(';') && !first.includes('\t')) sep = ';';
        else if (first.includes(',') && !first.includes('\t')) sep = ',';
        else sep = /\s{2,}/;

        parsedRowsGlobal = lines.map(line => line.split(sep).map(cell => cell.trim().replace(/^\||\|$/g, '').trim()));
        const maxCols = Math.max(...parsedRowsGlobal.map(r => r.length));

        // Render Column Choice Buttons
        colButtonsContainer.classList.remove('hidden');
        colButtons.innerHTML = '';

        for (let c = 0; c < maxCols; c++) {
          const headerName = parsedRowsGlobal[0][c] || `Coluna ${c + 1}`;
          const isSelected = c === selectedColIdx;
          const btn = document.createElement('button');
          btn.className = `px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all border ${
            isSelected 
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20 font-bold' 
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`;
          btn.innerHTML = `<i data-lucide="column" class="w-3.5 h-3.5"></i> ${c + 1}. ${escapeHtml(headerName.slice(0, 20))}`;
          btn.addEventListener('click', () => {
            selectedColIdx = c;
            parseTable();
          });
          colButtons.appendChild(btn);
        }

        // Render Extracted Column Text
        const extractedValues = parsedRowsGlobal.map(row => row[selectedColIdx] || '').filter(Boolean);
        colOut.value = extractedValues.join('\n');

        // Render Table Preview HTML
        let tableHtml = `<table class="w-full text-left border-collapse text-xs font-mono"><thead class="bg-slate-900 sticky top-0 text-slate-300 border-b border-slate-800"><tr>`;
        for (let c = 0; c < maxCols; c++) {
          const isSel = c === selectedColIdx;
          tableHtml += `<th class="p-2 border-r border-slate-800 ${isSel ? 'bg-indigo-950/80 text-indigo-300 font-bold' : ''}">Col ${c + 1}</th>`;
        }
        tableHtml += `</tr></thead><tbody class="divide-y divide-slate-800/60">`;

        parsedRowsGlobal.forEach((row, rIdx) => {
          tableHtml += `<tr class="${rIdx === 0 ? 'bg-slate-900/40 font-semibold text-slate-200' : 'hover:bg-slate-900/30'}">`;
          for (let c = 0; c < maxCols; c++) {
            const cellVal = row[c] || '';
            const isSel = c === selectedColIdx;
            tableHtml += `<td class="p-2 border-r border-slate-800 ${isSel ? 'bg-indigo-950/40 text-emerald-300 font-bold' : 'text-slate-300'}">${escapeHtml(cellVal)}</td>`;
          }
          tableHtml += `</tr>`;
        });
        tableHtml += `</tbody></table>`;

        previewContainer.innerHTML = tableHtml;
      };

      tblIn.addEventListener('input', parseTable);

      // Load Teams Test Case
      container.querySelector('#btnLoadTeamsTest').addEventListener('click', () => {
        tblIn.value = `ID\tNome Completo\tEmail Corporativo\tCPF\tCargo\n101\tAna Maria Silva\tana.silva@empresa.com\t00012345678\tDesenvolvedor Senior\n102\tRoberto Carlos\troberto.carlos@empresa.com\t00098765432\tAnalista de Dados\n103\tCarla Souza\tcarla.souza@empresa.com\t00112233445\tGerente de Projeto`;
        selectedColIdx = 3; // Select CPF column by default in test
        parseTable();
      });

      setupCopyButton(container, '#copyExtractedCol', '#colOut');
    }
  },
  {
    id: 'gerador-tabela-sql',
    name: 'Gerador de Tabela SQL + INSERTS',
    category: 'SQL & Dados',
    icon: 'table-properties',
    description: 'Gera DDL de tabela temporária ou física com id autoincremento e INSERTS a partir de uma lista de valores.',
    render: (container) => {
      container.innerHTML = `
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

      const inputVal = container.querySelector('#sqlValIn');
      const outputSql = container.querySelector('#sqlValOut');
      const tableNameEl = container.querySelector('#tableName');
      const colNameEl = container.querySelector('#colName');
      const colDataTypeEl = container.querySelector('#colDataType');
      const tableTypeEl = container.querySelector('#tableType');
      const dialectEl = container.querySelector('#sqlDialect');

      const generateSQL = () => {
        const rawText = inputVal.value;
        const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
        const tName = tableNameEl.value.trim() || 'tmp_investigacao';
        const cName = colNameEl.value.trim() || 'value';
        const isInt = colDataTypeEl.value === 'int';
        const isTemp = tableTypeEl.value === 'temp';
        const dialect = dialectEl.value;

        if (lines.length === 0) {
          outputSql.value = '-- Insira ao menos um valor na caixa da esquerda para gerar o código SQL.';
          return;
        }

        let columnTypeDef = '';
        if (isInt) {
          columnTypeDef = dialect === 'oracle' ? 'NUMBER(19)' : 'BIGINT';
        } else {
          const maxLen = Math.max(...lines.map(l => l.length), 10);
          const varcharSize = Math.max(Math.ceil(maxLen / 10) * 10, 50);
          columnTypeDef = dialect === 'oracle' ? `VARCHAR2(${varcharSize})` : (dialect === 'sqlite' ? 'TEXT' : `VARCHAR(${varcharSize})`);
        }

        let ddl = '';
        let insertHeader = '';

        const formatValue = (v) => {
          if (isInt) {
            const cleanNum = v.replace(/[^\d-]/g, '');
            return cleanNum ? cleanNum : '0';
          }
          return `'${v.replace(/'/g, "''")}'`;
        };

        if (dialect === 'mysql') {
          const createCmd = isTemp ? 'CREATE TEMPORARY TABLE' : 'CREATE TABLE';
          ddl = `${createCmd} ${tName} (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    ${cName} ${columnTypeDef} NOT NULL\n);`;
          const values = lines.map(formatValue).join(',\n    ');
          insertHeader = `INSERT INTO ${tName} (${cName}) VALUES\n    ${values};`;
        } else if (dialect === 'postgres') {
          const createCmd = isTemp ? 'CREATE TEMP TABLE' : 'CREATE TABLE';
          ddl = `${createCmd} ${tName} (\n    id SERIAL PRIMARY KEY,\n    ${cName} ${columnTypeDef} NOT NULL\n);`;
          const values = lines.map(formatValue).join(',\n    ');
          insertHeader = `INSERT INTO ${tName} (${cName}) VALUES\n    ${values};`;
        } else if (dialect === 'sqlserver') {
          const tablePrefix = isTemp && !tName.startsWith('#') ? '#' : '';
          const realName = `${tablePrefix}${tName}`;
          ddl = `CREATE TABLE ${realName} (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    ${cName} ${columnTypeDef} NOT NULL\n);`;
          const values = lines.map(formatValue).join(',\n    ');
          insertHeader = `INSERT INTO ${realName} (${cName}) VALUES\n    ${values};`;
        } else if (dialect === 'sqlite') {
          const createCmd = isTemp ? 'CREATE TEMP TABLE' : 'CREATE TABLE';
          ddl = `${createCmd} ${tName} (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    ${cName} ${columnTypeDef} NOT NULL\n);`;
          const values = lines.map(formatValue).join(',\n    ');
          insertHeader = `INSERT INTO ${tName} (${cName}) VALUES\n    ${values};`;
        } else if (dialect === 'oracle') {
          const createCmd = isTemp ? 'CREATE GLOBAL TEMPORARY TABLE' : 'CREATE TABLE';
          const tempOptions = isTemp ? ' ON COMMIT PRESERVE ROWS' : '';
          ddl = `${createCmd} ${tName} (\n    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    ${cName} ${columnTypeDef} NOT NULL\n)${tempOptions};`;
          const inserts = lines.map(v => `INSERT INTO ${tName} (${cName}) VALUES (${formatValue(v)});`).join('\n');
          insertHeader = inserts;
        }

        outputSql.value = `-- Script de Criação e Carga para Investigação SQL (${isInt ? 'INTEGER' : 'VARCHAR'})\n${ddl}\n\n${insertHeader}`;
      };

      inputVal.addEventListener('input', generateSQL);
      tableNameEl.addEventListener('input', generateSQL);
      colNameEl.addEventListener('input', generateSQL);
      colDataTypeEl.addEventListener('change', generateSQL);
      tableTypeEl.addEventListener('change', generateSQL);
      dialectEl.addEventListener('change', generateSQL);

      // Load Test Case
      container.querySelector('#btnLoadSqlTest').addEventListener('click', () => {
        inputVal.value = `8888888\n9999999\n124241443\n12345678901\n12345678000195`;
        generateSQL();
      });

      setupCopyButton(container, '#copyGeneratedSql', '#sqlValOut');
    }
  },
  {
    id: 'kebab-case',
    name: 'Kebab Case Converter',
    category: 'Texto',
    icon: 'type',
    description: 'Converte frases ou palavras para o formato separado por hífens (kebab-case).',
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
        const val = container.querySelector('#kebabIn').value;
        const res = val.toLowerCase().trim().replace(/\s+/g, '-');
        container.querySelector('#kebabOut').value = res;
      };

      container.querySelector('#btnKebab').addEventListener('click', convert);
      container.querySelector('#kebabIn').addEventListener('input', convert);
      setupCopyButton(container, '#copyKebab', '#kebabOut');
    }
  },
  {
    id: 'break-line',
    name: 'Remover Quebra de Linhas',
    category: 'Texto',
    icon: 'wrap-text',
    description: 'Remove quebras de linha individuais preservando parágrafos duplos.',
    render: (container) => {
      container.innerHTML = `
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
            <i data-lucide="wrap-text" class="w-5 h-5 text-indigo-400"></i> Remover Quebras de Linha
          </h2>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Texto Original:</label>
            <textarea id="brIn" rows="6" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm"></textarea>
          </div>
          <button id="btnBr" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <i data-lucide="scissors" class="w-4 h-4"></i> Remover Quebras
          </button>
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-sm font-medium text-slate-300">Resultado:</label>
              <button id="copyBr" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar</button>
            </div>
            <textarea id="brOut" rows="6" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 font-mono text-sm"></textarea>
          </div>
        </div>
      `;

      container.querySelector('#btnBr').addEventListener('click', () => {
        const text = container.querySelector('#brIn').value;
        const res = text.replace(/\n\n/g, '999999').replace(/\n/g, ' ').replace(/999999/g, '\n\n');
        container.querySelector('#brOut').value = res;
      });

      setupCopyButton(container, '#copyBr', '#brOut');
    }
  },
  {
    id: 'lines-to-list',
    name: 'Linhas para Lista SQL (IN)',
    category: 'SQL & Dados',
    icon: 'list-ordered',
    description: 'Transforma linhas em uma lista separada por vírgulas, com opção de aspas para usar na cláusula WHERE IN (...).',
    render: (container) => {
      container.innerHTML = `
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

      container.querySelector('#btnSeq').addEventListener('click', () => {
        const raw = container.querySelector('#seqIn').value.trim().split('\n').filter(Boolean);
        const quotes = container.querySelector('#chkQuotes').checked;
        const formatted = raw.map(i => quotes ? `"${i.trim()}"` : i.trim()).join(', ');
        container.querySelector('#seqOut').value = formatted;
      });

      setupCopyButton(container, '#copySeq', '#seqOut');
    }
  },
  {
    id: 'sql-query-extractor',
    name: 'Extrator de Tabelas SQL',
    category: 'SQL & Dados',
    icon: 'database',
    description: 'Extrai os nomes de tabelas utilizadas nas cláusulas FROM e JOIN de uma consulta SQL.',
    render: (container) => {
      container.innerHTML = `
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
          .replace(/--.*$/gm, '')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/'[^']*'/g, '')
          .replace(/"[^"]*"/g, '');

        const tableNames = new Set();
        const reservedKeywords = new Set([
          'SELECT', 'WHERE', 'GROUP', 'HAVING', 'ORDER', 'LIMIT', 'UNION', 'ALL',
          'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'CROSS', 'FULL', 'ON', 'USING',
          'AS', 'AND', 'OR', 'SET', 'INSERT', 'UPDATE', 'DELETE', 'INTO', 'VALUES'
        ]);

        const fromMatches = [...clean.matchAll(/\bFROM\s+([\w\.\,`"\s]+?)(?=\bWHERE\b|\bGROUP\b|\bHAVING\b|\bORDER\b|\bLIMIT\b|\bUNION\b|\bJOIN\b|\bLEFT\b|\bRIGHT\b|\bINNER\b|\bOUTER\b|\bCROSS\b|\bFULL\b|;|$)/gi)];
        fromMatches.forEach(m => {
          const rawTables = m[1].split(',');
          rawTables.forEach(tStr => {
            const parts = tStr.trim().split(/\s+/);
            if (parts.length > 0 && parts[0]) {
              const name = parts[0].replace(/[`"']/g, '');
              if (name && !reservedKeywords.has(name.toUpperCase())) {
                tableNames.add(name);
              }
            }
          });
        });

        const joinMatches = [...clean.matchAll(/\b(?:JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|CROSS\s+JOIN|FULL\s+JOIN|OUTER\s+JOIN)\s+([`"'\w\.]+)/gi)];
        joinMatches.forEach(m => {
          const name = m[1].trim().replace(/[`"']/g, '');
          if (name && !reservedKeywords.has(name.toUpperCase())) {
            tableNames.add(name);
          }
        });

        return Array.from(tableNames);
      }

      const runExtract = () => {
        const query = container.querySelector('#sqlQuery').value;
        const tables = extractTablesFromSQL(query);
        const listContainer = container.querySelector('#tableListContainer');
        const copyBtn = container.querySelector('#copyExtractedTables');
        listContainer.innerHTML = '';

        if (tables.length > 0) {
          copyBtn.classList.remove('hidden');
          const ul = document.createElement('ul');
          ul.className = 'space-y-1.5';
          tables.forEach(table => {
            const li = document.createElement('li');
            li.className = 'px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-indigo-300 font-mono text-sm flex items-center gap-2.5';
            li.innerHTML = `<i data-lucide="table" class="w-4 h-4 text-indigo-400"></i> <span>${table}</span>`;
            ul.appendChild(li);
          });
          listContainer.appendChild(ul);
        } else if (query.trim().length > 0) {
          copyBtn.classList.add('hidden');
          listContainer.innerHTML = `<p class="text-amber-400 text-sm">Nenhuma tabela identificada nas cláusulas FROM / JOIN.</p>`;
        } else {
          copyBtn.classList.add('hidden');
          listContainer.innerHTML = `<p class="text-slate-500 text-sm italic">Insira a consulta SQL e clique em "Executar Extração".</p>`;
        }
      };

      container.querySelector('#btnExtractTables').addEventListener('click', runExtract);

      container.querySelector('#copyExtractedTables').addEventListener('click', () => {
        const query = container.querySelector('#sqlQuery').value;
        const tables = extractTablesFromSQL(query);
        if (tables.length === 0) return;
        navigator.clipboard.writeText(tables.join('\n')).then(() => {
          const copyBtn = container.querySelector('#copyExtractedTables');
          const orig = copyBtn.innerHTML;
          copyBtn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Copiado!`;
          setTimeout(() => { copyBtn.innerHTML = orig; }, 1500);
        });
      });
    }
  },
  {
    id: 'html-entities',
    name: 'Entidades HTML (Acentos)',
    category: 'Texto & HTML',
    icon: 'code-xml',
    description: 'Tabela de referência rápida de entidades HTML para vogais acentuadas e caracteres especiais (ex: &aacute;, &eacute;).',
    render: (container) => {
      const entitiesData = [
        { char: 'á', entity: '&aacute;', num: '&#225;', desc: 'a agudo minúsculo' },
        { char: 'Á', entity: '&Aacute;', num: '&#193;', desc: 'A agudo maiúsculo' },
        { char: 'à', entity: '&agrave;', num: '&#224;', desc: 'a crase minúsculo' },
        { char: 'À', entity: '&Agrave;', num: '&#192;', desc: 'A crase maiúsculo' },
        { char: 'â', entity: '&acirc;', num: '&#226;', desc: 'a circunflexo minúsculo' },
        { char: 'Â', entity: '&Acirc;', num: '&#194;', desc: 'A circunflexo maiúsculo' },
        { char: 'ã', entity: '&atilde;', num: '&#227;', desc: 'a til minúsculo' },
        { char: 'Ã', entity: '&Atilde;', num: '&#195;', desc: 'A til maiúsculo' },
        { char: 'ä', entity: '&auml;', num: '&#228;', desc: 'a trema minúsculo' },
        { char: 'Ä', entity: '&Auml;', num: '&#196;', desc: 'A trema maiúsculo' },
        { char: 'é', entity: '&eacute;', num: '&#233;', desc: 'e agudo minúsculo' },
        { char: 'É', entity: '&Eacute;', num: '&#201;', desc: 'E agudo maiúsculo' },
        { char: 'è', entity: '&egrave;', num: '&#232;', desc: 'e crase minúsculo' },
        { char: 'È', entity: '&Egrave;', num: '&#200;', desc: 'E crase maiúsculo' },
        { char: 'ê', entity: '&ecirc;', num: '&#234;', desc: 'e circunflexo minúsculo' },
        { char: 'Ê', entity: '&Ecirc;', num: '&#202;', desc: 'E circunflexo maiúsculo' },
        { char: 'ë', entity: '&euml;', num: '&#235;', desc: 'e trema minúsculo' },
        { char: 'Ë', entity: '&Euml;', num: '&#203;', desc: 'E trema maiúsculo' },
        { char: 'í', entity: '&iacute;', num: '&#237;', desc: 'i agudo minúsculo' },
        { char: 'Í', entity: '&Iacute;', num: '&#205;', desc: 'I agudo maiúsculo' },
        { char: 'ì', entity: '&igrave;', num: '&#236;', desc: 'i crase minúsculo' },
        { char: 'Ì', entity: '&Igrave;', num: '&#204;', desc: 'I crase maiúsculo' },
        { char: 'î', entity: '&icirc;', num: '&#238;', desc: 'i circunflexo minúsculo' },
        { char: 'Î', entity: '&Icirc;', num: '&#206;', desc: 'I circunflexo maiúsculo' },
        { char: 'ï', entity: '&iuml;', num: '&#239;', desc: 'i trema minúsculo' },
        { char: 'Ï', entity: '&Iuml;', num: '&#207;', desc: 'I trema maiúsculo' },
        { char: 'ó', entity: '&oacute;', num: '&#243;', desc: 'o agudo minúsculo' },
        { char: 'Ó', entity: '&Oacute;', num: '&#211;', desc: 'O agudo maiúsculo' },
        { char: 'ò', entity: '&ograve;', num: '&#242;', desc: 'o crase minúsculo' },
        { char: 'Ò', entity: '&Ograve;', num: '&#210;', desc: 'O crase maiúsculo' },
        { char: 'ô', entity: '&ocirc;', num: '&#244;', desc: 'o circunflexo minúsculo' },
        { char: 'Ô', entity: '&Ocirc;', num: '&#212;', desc: 'O circunflexo maiúsculo' },
        { char: 'õ', entity: '&otilde;', num: '&#245;', desc: 'o til minúsculo' },
        { char: 'Õ', entity: '&Otilde;', num: '&#213;', desc: 'O til maiúsculo' },
        { char: 'ö', entity: '&ouml;', num: '&#246;', desc: 'o trema minúsculo' },
        { char: 'Ö', entity: '&Ouml;', num: '&#214;', desc: 'O trema maiúsculo' },
        { char: 'ú', entity: '&uacute;', num: '&#250;', desc: 'u agudo minúsculo' },
        { char: 'Ú', entity: '&Uacute;', num: '&#218;', desc: 'U agudo maiúsculo' },
        { char: 'ù', entity: '&ugrave;', num: '&#249;', desc: 'u crase minúsculo' },
        { char: 'Ù', entity: '&Ugrave;', num: '&#217;', desc: 'U crase maiúsculo' },
        { char: 'û', entity: '&ucirc;', num: '&#251;', desc: 'u circunflexo minúsculo' },
        { char: 'Û', entity: '&Ucirc;', num: '&#219;', desc: 'U circunflexo maiúsculo' },
        { char: 'ü', entity: '&uuml;', num: '&#252;', desc: 'u trema minúsculo' },
        { char: 'Ü', entity: '&Uuml;', num: '&#220;', desc: 'U trema maiúsculo' },
        { char: 'ç', entity: '&ccedil;', num: '&#231;', desc: 'c cedilha minúsculo' },
        { char: 'Ç', entity: '&Ccedil;', num: '&#199;', desc: 'C cedilha maiúsculo' },
        { char: 'ñ', entity: '&ntilde;', num: '&#241;', desc: 'n til minúsculo' },
        { char: 'Ñ', entity: '&Ntilde;', num: '&#209;', desc: 'N til maiúsculo' },
      ];

      container.innerHTML = `
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
              <i data-lucide="code-xml" class="w-5 h-5 text-indigo-400"></i> Entidades HTML & Acentos (A E I O U)
            </h2>
          </div>

          <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h3 class="text-sm font-semibold text-indigo-400 flex items-center gap-2">
              <i data-lucide="wand-2" class="w-4 h-4"></i> Conversor de Texto para Entidades HTML
            </h3>
            <div>
              <textarea id="htmlConvIn" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 text-sm font-mono" placeholder="Digite um texto acentuado aqui (ex: Atenção à comunicação)..."></textarea>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-slate-400">Resultado convertido:</span>
              <button id="copyHtmlConv" class="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar Resultado</button>
            </div>
            <textarea id="htmlConvOut" rows="2" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-emerald-300 text-sm font-mono"></textarea>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <span class="text-sm font-medium text-slate-300">Tabela de Referência de Acentos</span>
            <input type="text" id="entityFilter" placeholder="Filtrar por letra (ex: á, e, ô)..." class="w-full sm:w-64 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:ring-2 focus:ring-indigo-500">
          </div>

          <div class="overflow-x-auto border border-slate-800 rounded-xl max-h-[420px] overflow-y-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-slate-900/90 sticky top-0 text-slate-400 border-b border-slate-800 font-mono">
                <tr>
                  <th class="p-3 w-16 text-center">Caractere</th>
                  <th class="p-3">Código HTML Entity</th>
                  <th class="p-3">Código Numérico</th>
                  <th class="p-3">Descrição</th>
                  <th class="p-3 w-20 text-center">Ação</th>
                </tr>
              </thead>
              <tbody id="entityTableBody" class="divide-y divide-slate-800/60 font-mono">
              </tbody>
            </table>
          </div>
        </div>
      `;

      const inputEl = container.querySelector('#htmlConvIn');
      const outputEl = container.querySelector('#htmlConvOut');
      inputEl.addEventListener('input', () => {
        let text = inputEl.value;
        entitiesData.forEach(item => {
          text = text.replaceAll(item.char, item.entity);
        });
        outputEl.value = text;
      });
      setupCopyButton(container, '#copyHtmlConv', '#htmlConvOut');

      const renderTable = (filter = '') => {
        const tbody = container.querySelector('#entityTableBody');
        const search = filter.toLowerCase().trim();
        const filtered = entitiesData.filter(d => 
          d.char.toLowerCase().includes(search) || 
          d.entity.toLowerCase().includes(search) || 
          d.desc.toLowerCase().includes(search)
        );

        if (filtered.length === 0) {
          tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-500 font-sans">Nenhuma entidade encontrada.</td></tr>`;
          return;
        }

        tbody.innerHTML = filtered.map(d => `
          <tr class="hover:bg-slate-800/40 transition-colors">
            <td class="p-3 text-center text-base font-bold text-amber-400">${d.char}</td>
            <td class="p-3 text-indigo-300 font-semibold">${escapeHtml(d.entity)}</td>
            <td class="p-3 text-slate-400">${escapeHtml(d.num)}</td>
            <td class="p-3 text-slate-300 font-sans">${d.desc}</td>
            <td class="p-3 text-center">
              <button data-copy-val="${d.entity}" class="btn-copy-ent px-2 py-1 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded transition-colors text-[11px] font-sans">
                Copiar
              </button>
            </td>
          </tr>
        `).join('');

        tbody.querySelectorAll('.btn-copy-ent').forEach(btn => {
          btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-copy-val');
            navigator.clipboard.writeText(val).then(() => {
              btn.textContent = 'OK!';
              btn.classList.add('bg-emerald-600', 'text-white');
              setTimeout(() => {
                btn.textContent = 'Copiar';
                btn.classList.remove('bg-emerald-600', 'text-white');
              }, 1200);
            });
          });
        });
      };

      container.querySelector('#entityFilter').addEventListener('input', (e) => {
        renderTable(e.target.value);
      });

      renderTable();
    }
  },
  {
    id: 'remove-blank-lines',
    name: 'Removedor de Linhas Vazias',
    category: 'Texto',
    icon: 'eraser',
    description: 'Remove linhas em branco desnecessárias de um texto, útil para corrigir tabelas Markdown geradas por IA com quebras de linha extras.',
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

      const getMode = () => container.querySelector('input[name="blankMode"]:checked').value;

      const convert = () => {
        const val = container.querySelector('#blankIn').value;
        const mode = getMode();

        let res;
        if (mode === 'all') {
          res = val
            .split('\n')
            .filter(line => line.trim() !== '')
            .join('\n');
        } else {
          // Colapsa 2+ quebras de linha (com ou sem espaços) em uma única quebra dupla
          res = val
            .split('\n')
            .reduce((acc, line) => {
              const isBlank = line.trim() === '';
              const lastWasBlank = acc.length > 0 && acc[acc.length - 1].trim() === '';
              if (isBlank && lastWasBlank) return acc; // pula duplicata
              acc.push(line);
              return acc;
            }, [])
            .join('\n');
        }

        container.querySelector('#blankOut').value = res;
      };

      container.querySelector('#btnBlank').addEventListener('click', convert);
      container.querySelector('#blankIn').addEventListener('input', convert);
      container.querySelectorAll('input[name="blankMode"]').forEach(radio => {
        radio.addEventListener('change', convert);
      });
      setupCopyButton(container, '#copyBlank', '#blankOut');
    }
  }
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setupCopyButton(container, btnSelector, targetSelector) {
  const btn = container.querySelector(btnSelector);
  const target = container.querySelector(targetSelector);
  if (!btn || !target) return;

  btn.addEventListener('click', () => {
    if (!target.value) return;
    navigator.clipboard.writeText(target.value).then(() => {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Copiado!`;
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 1500);
    });
  });
}
