import { createIcons, icons } from 'lucide';
import { tools } from './tools/index.js';

// null = tela inicial. A aplicação agora sempre abre nela, não na 1ª ferramenta.
let activeToolId = null;

// Mapeia ícone e cor de destaque por categoria, usados na home.
// Se uma categoria nova aparecer e não estiver aqui, cai no fallback (ícone 'folder', cor indigo).
// IMPORTANTE: o Tailwind só gera CSS para classes que aparecem como strings
// LITERAIS e completas no código-fonte. Por isso cada cor precisa das classes
// já escritas por extenso aqui — nunca construídas via `text-${cor}-400`,
// pois isso nunca seria detectado pelo scanner do Tailwind no build.
const COLOR_CLASSES = {
  indigo: {
    border: 'hover:border-indigo-500/50',
    iconBg: 'bg-indigo-600/15',
    iconText: 'text-indigo-400',
  },
  emerald: {
    border: 'hover:border-emerald-500/50',
    iconBg: 'bg-emerald-600/15',
    iconText: 'text-emerald-400',
  },
  amber: {
    border: 'hover:border-amber-500/50',
    iconBg: 'bg-amber-600/15',
    iconText: 'text-amber-400',
  },
};

const CATEGORY_META = {
  'Texto': { icon: 'type', color: 'indigo' },
  'Validação & Dados': { icon: 'shield-check', color: 'emerald' },
  'Cheatsheets': { icon: 'file-text', color: 'amber' },
};
const FALLBACK_META = { icon: 'folder', color: 'indigo' };

function selectTool(id) {
  const newHash = id ? `#${id}` : '';
  if (window.location.hash !== newHash) {
    // Atualiza a URL. Isso dispara 'hashchange', que por sua vez chama
    // applyRouteFromHash() e efetivamente atualiza a tela — única fonte de verdade.
    window.location.hash = newHash;
  } else {
    // Hash já é o mesmo (ex: clicou de novo na ferramenta já ativa) — não dispara
    // 'hashchange' sozinho, então sincroniza manualmente por garantia.
    applyRouteFromHash();
  }
}

function applyRouteFromHash() {
  const rawHash = window.location.hash.replace(/^#/, '');
  const id = rawHash ? decodeURIComponent(rawHash) : null;
  const toolExists = id !== null && tools.some(t => t.id === id);

  activeToolId = toolExists ? id : null;
  renderNav(document.getElementById('toolSearch')?.value || '');
  renderActiveTool();
}

function renderNav(filterText = '') {
  const navContainer = document.getElementById('toolsNav');
  if (!navContainer) return;

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(filterText.toLowerCase()) ||
    t.description.toLowerCase().includes(filterText.toLowerCase()) ||
    t.category.toLowerCase().includes(filterText.toLowerCase())
  );

  const isHomeActive = activeToolId === null;
  const homeHtml = `
    <button id="navHomeBtn" class="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all mb-3 ${
      isHomeActive
        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-medium'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
    }">
      <i data-lucide="home" class="w-4 h-4 ${isHomeActive ? 'text-indigo-400' : 'text-slate-400'}"></i>
      Início
    </button>
  `;

  let listHtml;
  if (filtered.length === 0) {
    listHtml = `<p class="text-xs text-slate-500 p-3 text-center">Nenhuma ferramenta encontrada.</p>`;
  } else {
    // Group by category
    const categories = {};
    filtered.forEach(t => {
      if (!categories[t.category]) categories[t.category] = [];
      categories[t.category].push(t);
    });

    listHtml = '';
    Object.keys(categories).forEach(cat => {
      listHtml += `
        <div class="mb-3">
          <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 py-1 block">${cat}</span>
          <div class="space-y-0.5">
      `;
      categories[cat].forEach(t => {
        const isActive = t.id === activeToolId;
        const activeClasses = isActive
          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-medium'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent';

        listHtml += `
          <button data-tool-id="${t.id}" class="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all group ${activeClasses}">
            <span class="flex items-center gap-2.5">
              <i data-lucide="${t.icon}" class="w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'}"></i>
              ${t.name}
            </span>
            ${isActive ? `<i data-lucide="chevron-right" class="w-3.5 h-3.5 text-indigo-400"></i>` : ''}
          </button>
        `;
      });
      listHtml += `</div></div>`;
    });
  }

  navContainer.innerHTML = homeHtml + listHtml;

  navContainer.querySelector('#navHomeBtn').addEventListener('click', () => selectTool(null));

  navContainer.querySelectorAll('button[data-tool-id]').forEach(btn => {
    btn.addEventListener('click', () => selectTool(btn.getAttribute('data-tool-id')));
  });

  createIcons({ icons });
}

function renderHome(container) {
  const totalTools = tools.length;

  // Agrupa ferramentas por categoria, contando quantas há em cada uma
  const categoryCounts = {};
  tools.forEach(t => {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  });
  const categoryNames = Object.keys(categoryCounts);

  const categoryCards = categoryNames.map(cat => {
    const meta = CATEGORY_META[cat] || FALLBACK_META;
    const colors = COLOR_CLASSES[meta.color] || COLOR_CLASSES.indigo;
    const count = categoryCounts[cat];
    return `
      <button data-category="${cat}" class="text-left bg-slate-900 border border-slate-800 ${colors.border} hover:bg-slate-800/50 rounded-2xl p-4 transition-all group">
        <div class="w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center mb-3">
          <i data-lucide="${meta.icon}" class="w-5 h-5 ${colors.iconText}"></i>
        </div>
        <h3 class="text-sm font-semibold text-slate-100 group-hover:text-white">${cat}</h3>
        <p class="text-xs text-slate-500 mt-0.5">${count} ${count === 1 ? 'ferramenta' : 'ferramentas'}</p>
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <div class="max-w-3xl mx-auto py-8 space-y-8">
      <div class="space-y-3">
        <div class="w-12 h-12 rounded-2xl bg-indigo-600/15 flex items-center justify-center">
          <i data-lucide="wrench" class="w-6 h-6 text-indigo-400"></i>
        </div>
        <h1 class="text-2xl font-bold text-slate-100">Dev Toolbox</h1>
        <p class="text-sm text-slate-400 leading-relaxed max-w-xl">
          Uma caixa de ferramentas rápida para o dia a dia de desenvolvimento: validadores, conversores de texto,
          cheatsheets e utilitários. Use a busca na barra lateral ou escolha uma categoria abaixo pra começar.
        </p>
        <p class="text-xs text-slate-500">
          ${totalTools} ${totalTools === 1 ? 'ferramenta disponível' : 'ferramentas disponíveis'} em ${categoryNames.length} categorias.
        </p>
      </div>

      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Categorias</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${categoryCards}
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('button[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      const firstToolInCategory = tools.find(t => t.category === category);
      if (firstToolInCategory) selectTool(firstToolInCategory.id);
    });
  });
}

function renderActiveTool() {
  const container = document.getElementById('activeToolContainer');
  if (!container) return;

  if (activeToolId === null) {
    renderHome(container);
    createIcons({ icons });
    return;
  }

  const tool = tools.find(t => t.id === activeToolId);
  if (!tool) {
    // Segurança: se por algum motivo o id não existir mais, volta pra home
    activeToolId = null;
    renderHome(container);
    createIcons({ icons });
    return;
  }

  tool.render(container);
  createIcons({ icons });
}

// Search input listener
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('toolSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderNav(e.target.value);
    });
  }

  // Se a URL já vier com um hash (ex: link compartilhado tipo #kebab-case),
  // abre direto naquela ferramenta. Senão, cai na home (id === null).
  applyRouteFromHash();
});

// Sincroniza a tela quando o hash muda por qualquer motivo externo ao selectTool:
// botão voltar/avançar do navegador, edição manual da URL, ou link colado na mesma aba.
window.addEventListener('hashchange', applyRouteFromHash);
