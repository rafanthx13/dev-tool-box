const EXAMPLE_MD = `# h1
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.
## h2
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.
### h3.1
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.
### h2.2
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere laoreet condimentum.`;

const BULLETS = ['+', '-', '*'];

function slugify(text, usedSlugs) {
  let slug = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')   // remove pontuação (mantém letras, números, _, espaço, -)
    .replace(/\s+/g, '-');      // espaços viram hífen

  // Trata slugs duplicados, igual o GitHub faz: heading, heading-1, heading-2...
  if (usedSlugs.has(slug)) {
    let count = 1;
    while (usedSlugs.has(`${slug}-${count}`)) count++;
    usedSlugs.add(`${slug}-${count}`);
    return `${slug}-${count}`;
  }

  usedSlugs.add(slug);
  return slug;
}

function extractHeadings(markdown) {
  const lines = markdown.split('\n');
  const headings = [];
  let insideCodeFence = false;

  for (const line of lines) {
    const fenceMatch = line.trim().match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      insideCodeFence = !insideCodeFence;
      continue;
    }
    if (insideCodeFence) continue;

    const headingMatch = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      headings.push({ level, text });
    }
  }

  return headings;
}

function generateTOC(markdown) {
  const headings = extractHeadings(markdown);
  if (headings.length === 0) return '';

  const minLevel = Math.min(...headings.map(h => h.level));
  const usedSlugs = new Set();

  return headings
    .map(({ level, text }) => {
      const slug = slugify(text, usedSlugs);
      const depth = level - minLevel;
      const indent = '  '.repeat(depth);
      const bullet = BULLETS[depth % BULLETS.length];
      return `${indent}${bullet} [${text}](#${slug})`;
    })
    .join('\n');
}

export const mdTocGenerator = {
  id: 'md-toc-generator',
  name: 'Gerador de Índice (TOC) Markdown',
  category: 'Texto',
  icon: 'list-tree',
  description: 'Cole um texto em Markdown e gere automaticamente o índice (Table of Contents) com base nos headings (# ## ###), com links âncora e indentação por nível.',
  render: (container) => {
    container.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
          <i data-lucide="list-tree" class="w-5 h-5 text-indigo-400"></i> Gerador de Índice (TOC) Markdown
        </h2>
        <p class="text-sm text-slate-400">
          Cole um texto em Markdown com headings (<code class="text-indigo-300">#</code>, <code class="text-indigo-300">##</code>, <code class="text-indigo-300">###</code>...)
          e o índice será gerado automaticamente, com links âncora no mesmo padrão do GitHub.
        </p>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-sm font-medium text-slate-300">Markdown de entrada:</label>
            <button id="btnExampleToc" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
              <i data-lucide="wand-2" class="w-3.5 h-3.5"></i> Ver exemplo
            </button>
          </div>
          <textarea id="tocIn" rows="10" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-sm" placeholder="Cole aqui seu markdown com # h1, ## h2, ### h3..."></textarea>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="text-sm font-medium text-slate-300">Índice gerado:</label>
            <button id="copyToc" class="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"><i data-lucide="copy" class="w-3.5 h-3.5"></i> Copiar</button>
          </div>
          <textarea id="tocOut" rows="8" readonly class="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-indigo-300 font-mono text-sm"></textarea>
        </div>
      </div>
    `;

    const tocIn = container.querySelector('#tocIn');
    const tocOut = container.querySelector('#tocOut');

    const convert = () => {
      tocOut.value = generateTOC(tocIn.value);
    };

    tocIn.addEventListener('input', convert);

    container.querySelector('#btnExampleToc').addEventListener('click', () => {
      tocIn.value = EXAMPLE_MD;
      convert();
    });

    container.querySelector('#copyToc').addEventListener('click', async (e) => {
      try {
        await navigator.clipboard.writeText(tocOut.value);
        const btn = e.currentTarget;
        const original = btn.innerHTML;
        btn.textContent = 'Copiado!';
        setTimeout(() => { btn.innerHTML = original; }, 1500);
      } catch (err) {
        console.error('Falha ao copiar:', err);
      }
    });
  },
};
