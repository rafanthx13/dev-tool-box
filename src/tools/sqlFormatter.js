import { format } from 'sql-formatter';
import { setupCopyButton } from '../utils/functions.js';

const EXAMPLE_SQL = `select id, u.nome, u.email, p.total from usuarios u inner join pedidos p on u.id = p.usuario_id left join enderecos e on e.usuario_id = u.id where u.status = 'ativo' and p.total > 100 order by p.total desc`;

// Palavras que, se aparecerem logo depois de "FROM tabela" ou "JOIN tabela",
// NÃO são alias implícito — são a próxima keyword da query.
const KEYWORDS_AFTER_TABLE = new Set([
  'where', 'on', 'group', 'order', 'having', 'limit', 'join', 'inner',
  'left', 'right', 'full', 'cross', 'union', 'as', 'set', 'using', 'and', 'or',
]);

/**
 * Insere AS em alias implícitos após FROM/JOIN.
 * Ex: "FROM pedidos p" -> "FROM pedidos AS p"
 * Não duplica quando já existe "AS" explícito, e não confunde a próxima
 * keyword da query (WHERE, ON, GROUP BY...) com um alias.
 */
function insertImplicitAliases(sql) {
  return sql.replace(
    /\b(FROM|JOIN)\s+([`"[]?[\w.]+[`"\]]?)\s+(?!AS\b)([a-zA-Z_]\w*)\b/gi,
    (match, keyword, table, maybeAlias) => {
      if (KEYWORDS_AFTER_TABLE.has(maybeAlias.toLowerCase())) return match;
      return `${keyword} ${table} AS ${maybeAlias}`;
    }
  );
}

/**
 * Normaliza JOIN e ON: o JOIN fica no mesmo nível (mesma indentação) de
 * FROM/WHERE/ORDER BY, e o ON vai para uma linha própria, indentado 4
 * espaços a mais que o JOIN.
 */
function normalizeJoinAndOn(sql) {
  return sql
    .split('\n')
    .map((line) => {
      const match = line.match(
        /^\s*((?:INNER |LEFT |RIGHT |FULL |CROSS )?JOIN\s+.+?)\s+(ON\s+.+)$/i
      );
      if (!match) return line;
      const [, joinPart, onPart] = match;
      return `${joinPart}\n    ${onPart}`;
    })
    .join('\n');
}

function formatSelectQuery(sql) {
  const preprocessed = insertImplicitAliases(sql);
  const formatted = format(preprocessed, {
    language: 'sql',
    tabWidth: 4,
    keywordCase: 'upper',
    linesBetweenQueries: 2,
  });
  return normalizeJoinAndOn(formatted);
}

export const sqlFormatter = {
  id: 'sql-select-formatter',
  name: 'Formatador de SQL (SELECT)',
  category: 'SQL & Dados',
  icon: 'database',
  description: 'Formata consultas SQL do tipo SELECT: keywords em maiúsculo, colunas uma por linha, ON em linha própria abaixo do JOIN, e insere AS em alias implícitos.',
  render: (container) => {
    container.innerHTML = /*html*/`
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
          <i data-lucide="database" class="w-5 h-5 text-indigo-400"></i> Formatador de SQL (SELECT)
        </h2>
        <p class="text-sm text-slate-400">
          Cole uma consulta <code class="text-indigo-300">SELECT</code>. Keywords viram maiúsculas, colunas ficam uma por linha,
          o <code class="text-indigo-300">ON</code> vai para uma linha própria abaixo do <code class="text-indigo-300">JOIN</code>,
          e alias sem <code class="text-indigo-300">AS</code> explícito ganham o <code class="text-indigo-300">AS</code> automaticamente.
        </p>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-sm font-medium text-slate-300">SQL de entrada:</label>
            <button id="btnExampleSql" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
              <i data-lucide="wand-2" class="w-3.5 h-3.5"></i> Ver exemplo
            </button>
          </div>
          <textarea id="sqlIn" rows="6" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm" placeholder="select * from tabela..."></textarea>
        </div>

        <button id="btnFormatSql" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
          <i data-lucide="arrow-right" class="w-4 h-4"></i> Formatar
        </button>

        <div id="sqlErrorBox" class="hidden bg-red-950/50 border border-red-800 rounded-lg p-3 text-sm text-red-300 flex items-start gap-2">
          <i data-lucide="alert-triangle" class="w-4 h-4 mt-0.5 shrink-0"></i>
          <span id="sqlErrorText"></span>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-sm font-medium text-slate-300">SQL formatado:</label>
            <button id="copySql" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar</button>
          </div>
          <textarea id="sqlOut" rows="12" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-indigo-300 font-mono text-sm"></textarea>
        </div>
      </div>
    `;

    const sqlIn = container.querySelector('#sqlIn');
    const sqlOut = container.querySelector('#sqlOut');
    const errorBox = container.querySelector('#sqlErrorBox');
    const errorText = container.querySelector('#sqlErrorText');

    const convert = () => {
      const val = sqlIn.value.trim();
      if (!val) {
        sqlOut.value = '';
        errorBox.classList.add('hidden');
        return;
      }
      try {
        sqlOut.value = formatSelectQuery(val);
        errorBox.classList.add('hidden');
      } catch (err) {
        errorBox.classList.remove('hidden');
        errorText.textContent = 'Não foi possível formatar: verifique se o SQL está sintaticamente válido.';
        console.error('Erro ao formatar SQL:', err);
      }
    };

    container.querySelector('#btnFormatSql').addEventListener('click', convert);

    container.querySelector('#btnExampleSql').addEventListener('click', () => {
      sqlIn.value = EXAMPLE_SQL;
      convert();
    });

    setupCopyButton(container, '#copySql', '#sqlOut');
  },
};
