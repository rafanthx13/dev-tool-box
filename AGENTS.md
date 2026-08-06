# Directivas para o Agente de IA (Antigravity)

## Visão Geral do Projeto

O **dev-tool-box** é uma caixa de ferramentas web moderna desenvolvida com **Vite**, **Vanilla JavaScript (JS puro sem frameworks)**, **Tailwind CSS**, **Lucide Icons** e a **fonte Geist da Vercel**. Seu propósito é servir de utilitário completo para desenvolvedores (conversores, extratores, manipuladores de CSV, geradores SQL).

## Estrutura do Projeto

- **`index.html`**: Ponto de entrada da aplicação Vite.
- **`src/style.css`**: Configuração do Tailwind CSS e importação da fonte Geist.
- **`src/main.js`**: Ponto de entrada JS puro que gerencia o menu de navegação, relógio em tempo real, busca de ferramentas e inicialização de ícones Lucide (`createIcons`).
- **`src/tools/index.js`**: Registro modular onde cada ferramenta em JS puro é definida com suas propriedades (`id`, `name`, `category`, `icon`, `description`, `render`).
- **`vite.config.js`**: Configurado com `base: '/dev-tool-box/'` para deploy automático no GitHub Pages (`https://rafanthx13.github.io/dev-tool-box/`).

## Regras e Convenções para a IA ao Criar Novas Ferramentas

1. **Adicionar no Registro (`src/tools/index.js`)**:
   - Não use React ou Vue. Implemente a função `render(container)` com manipulação direta de DOM do Vanilla JS.
   - Utilize ícones válidos do Lucide Icons (ex: `code`, `database`, `terminal`, `copy`).
   - Adicione botões de cópia usando `setupCopyButton(container, btnSelector, targetSelector)`.
2. **Estilo & Responsividade**:
   - Utilize as classes do Tailwind CSS no padrão escuro (`bg-slate-900`, `border-slate-800`, `text-slate-100`, etc.).
   - Garanta visual moderno, limpo e adaptável para telas menores.
