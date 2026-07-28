import { marked } from 'marked';

// Lê todo .md dentro de src/md/ como texto puro, no build/start
const mdFiles = import.meta.glob('/src/md/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const slugify = (filename) => filename.replace(/\.md$/, '');

// Pega o primeiro "# Título" do markdown, ou usa o nome do arquivo como fallback
const extractTitle = (content, fallback) => {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
};

export const mdTools = Object.entries(mdFiles).map(([path, content]) => {
  const filename = path.split('/').pop();
  const id = slugify(filename);
  const name = extractTitle(content, id);

  return {
    id,
    name,
    category: 'Cheatsheets',
    icon: 'file-text',
    description: `Cheatsheet: ${name}`,
    render: (container) => {
      const html = marked.parse(content);
      container.innerHTML = `
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-slate-100 flex items-center gap-2">
            <i data-lucide="file-text" class="w-5 h-5 text-indigo-400"></i> ${name}
          </h2>
          <div class="prose prose-invert prose-slate max-w-none prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-code:text-indigo-300 prose-code:before:content-none prose-code:after:content-none prose-a:text-indigo-400">
            ${html}
          </div>
        </div>
      `;
      // Não precisa chamar createIcons aqui — o main.js já faz isso
      // centralizado logo após tool.render() em renderActiveTool().
    },
  };
});