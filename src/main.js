import { createIcons, icons } from 'lucide';
import { tools } from './tools/index.js';

let activeToolId = tools[0].id;

function renderNav(filterText = '') {
  const navContainer = document.getElementById('toolsNav');
  if (!navContainer) return;

  const filtered = tools.filter(t => 
    t.name.toLowerCase().includes(filterText.toLowerCase()) || 
    t.description.toLowerCase().includes(filterText.toLowerCase()) ||
    t.category.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    navContainer.innerHTML = `<p class="text-xs text-slate-500 p-3 text-center">Nenhuma ferramenta encontrada.</p>`;
    return;
  }

  // Group by category
  const categories = {};
  filtered.forEach(t => {
    if (!categories[t.category]) categories[t.category] = [];
    categories[t.category].push(t);
  });

  let html = '';
  Object.keys(categories).forEach(cat => {
    html += `
      <div class="mb-3">
        <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 py-1 block">${cat}</span>
        <div class="space-y-0.5">
    `;
    categories[cat].forEach(t => {
      const isActive = t.id === activeToolId;
      const activeClasses = isActive 
        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-medium' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent';
      
      html += `
        <button data-tool-id="${t.id}" class="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all group ${activeClasses}">
          <span class="flex items-center gap-2.5">
            <i data-lucide="${t.icon}" class="w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'}"></i>
            ${t.name}
          </span>
          ${isActive ? `<i data-lucide="chevron-right" class="w-3.5 h-3.5 text-indigo-400"></i>` : ''}
        </button>
      `;
    });
    html += `</div></div>`;
  });

  navContainer.innerHTML = html;

  // Add click events
  navContainer.querySelectorAll('button[data-tool-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeToolId = btn.getAttribute('data-tool-id');
      renderNav(filterText);
      renderActiveTool();
    });
  });

  createIcons({ icons });
}

function renderActiveTool() {
  const container = document.getElementById('activeToolContainer');
  const tool = tools.find(t => t.id === activeToolId) || tools[0];

  if (!container || !tool) return;

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

  renderNav();
  renderActiveTool();
});
