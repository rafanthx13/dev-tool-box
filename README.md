# 🧰 Dev Toolbox

Uma caixa de ferramentas para o dia a dia de desenvolvimento — validadores, conversores de texto, cheatsheets e utilitários — tudo em uma única SPA leve, rápida e sem backend.

> Sem frameworks pesados. Sem builds complicados. Só **Vanilla JS + Vite + Tailwind**.

---

## ✨ Visão geral

Cada ferramenta é definida como um objeto JavaScript simples (id, nome, categoria, ícone, descrição e uma função `render`), o que torna o projeto extremamente fácil de estender: para adicionar uma nova ferramenta, basta criar um novo objeto e registrá-lo — sem roteador complexo, sem estado global, sem dependências desnecessárias.

### Principais funcionalidades

- 🔍 **Busca em tempo real** — filtra ferramentas por nome, descrição ou categoria
- 🗂️ **Organização por categorias** — navegação lateral agrupada automaticamente
- 📄 **Cheatsheets em Markdown** — basta adicionar um `.md` em `src/md/` e ele vira uma ferramenta automaticamente, com título extraído do próprio arquivo
- 📋 **Colar como Markdown** — cola texto formatado (negrito, código, listas) copiado de qualquer lugar e converte instantaneamente para Markdown puro
- ✅ **Validadores de dados** — CPF/CNPJ e outros formatos comuns
- 🔤 **Conversores de texto** — kebab-case, remoção de linhas vazias, entre outros
- 🎨 **Interface dark, consistente e responsiva** — construída com Tailwind CSS

---

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| Build tool | [Vite](https://vitejs.dev/) |
| Estilização | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) + [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography) |
| Ícones | [Lucide](https://lucide.dev/) |
| Markdown → HTML | [`marked`](https://github.com/markedjs/marked) |
| HTML → Markdown | [`turndown`](https://github.com/mixmark-io/turndown) |
| Linguagem | JavaScript (Vanilla, sem framework) |

---

## 📁 Estrutura do projeto

```
dev-toolbox/
├── public/
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── src/
│   ├── main.js              # Bootstrap da SPA: renderiza nav, busca e tool ativa
│   ├── style.css            # Import do Tailwind + plugins
│   ├── md/                  # Cheatsheets em Markdown (viram tools automaticamente)
│   │   └── sql-cheatsheet.md
│   └── tools/
│       ├── index.js         # Array principal de ferramentas (registro central)
│       ├── mdTools.js       # Gera tools automaticamente a partir de src/md/*.md
│       ├── htmlToMdTool.js  # Ferramenta "Colar como Markdown"
│       └── ...              # Demais ferramentas (uma por arquivo ou inline)
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
git clone <url-do-repositorio>
cd dev-toolbox
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build de produção

```bash
npm run build
```

Os arquivos otimizados são gerados em `dist/`.

### Preview do build

```bash
npm run preview
```

---

## ➕ Adicionando uma nova ferramenta

Toda ferramenta segue o mesmo contrato:

```javascript
{
  id: 'minha-ferramenta',        // identificador único (kebab-case)
  name: 'Minha Ferramenta',      // nome exibido na sidebar
  category: 'Texto',             // categoria de agrupamento
  icon: 'wand',                  // nome do ícone (lucide.dev/icons)
  description: 'O que ela faz.', // usado também na busca
  render: (container) => {
    container.innerHTML = `...`;       // HTML da ferramenta (Tailwind classes)
    // seleção e eventos sempre via container.querySelector,
    // nunca via document global
  }
}
```

Depois, registre no array exportado em `src/tools/index.js`:

```javascript
import { minhaFerramenta } from './minhaFerramenta.js';

export const tools = [
  // ...outras ferramentas
  minhaFerramenta,
];
```

O `main.js` cuida automaticamente de:
- Renderizar o item na sidebar, agrupado por categoria
- Tornar a ferramenta pesquisável pela busca
- Ativar os ícones Lucide após cada render

---

## 📄 Adicionando um novo cheatsheet

Basta criar um arquivo `.md` em `src/md/`:

```markdown
# Meu Cheatsheet

Conteúdo em markdown normal aqui...
```

Ele aparecerá automaticamente na sidebar, na categoria **Cheatsheets**, com o título extraído do primeiro `# Heading` do arquivo — sem precisar editar nenhum outro arquivo do projeto.

---

## 🎨 Convenções de design

- Paleta base: `slate-900` / `slate-950` (fundos), `slate-700` / `slate-800` (bordas), `slate-100` a `slate-400` (texto)
- Cor de destaque: `indigo-400` a `indigo-600`
- Áreas de saída (resultado, readonly) usam `bg-slate-950` com texto `text-indigo-300` para se diferenciar visualmente da entrada
- Ícone do Lucide sempre presente no cabeçalho de cada ferramenta, repetindo o `icon` definido nos metadados

---

## 📦 Deploy

O projeto está configurado para ser servido em um subpath (`base: '/dev-tool-box/'` no `vite.config.js`). Ajuste esse valor conforme o ambiente de hospedagem.

Assets estáticos (favicon, imagens fixas) devem sempre residir em `public/` para serem copiados corretamente no build.

---

## 📝 Licença

Defina aqui a licença do projeto (ex: MIT).