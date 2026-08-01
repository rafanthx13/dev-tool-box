import { escapeHtml, setupCopyButton } from "../utils/functions";

export const htmlReplaceEntities = {
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
  };