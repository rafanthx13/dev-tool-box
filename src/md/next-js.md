
# Estrutura do Next

##  Estrutura de pastas do Projeto

### Estrutura de Pastas no Next.js (App Router)

No Next.js com o **App Router** (pasta `app/`), o sistema de arquivos define as rotas automaticamente. Cada pasta dentro de `app/` vira uma rota na URL.

---

#### Convenções especiais de pastas

##### `[param]` — Segmento dinâmico

```
app/
  usuarios/
    [id]/        → /usuarios/123, /usuarios/456
      page.tsx
```

O nome entre colchetes vira um **parâmetro de URL**. No seu projeto:

```
app/
  [...not-found]/   → captura qualquer rota não encontrada
```

O `...` é um **catch-all**: captura múltiplos segmentos (`/a/b/c`).

---

##### `(grupo)` — Route Group (sem afetar a URL)

```
app/
  (dashboard)/     → NÃO aparece na URL
    clientes/      → URL: /clientes
      page.tsx
  (blank-layout-pages)/
    login/         → URL: /login
      page.tsx
```

Serve para **organizar layouts diferentes** sem criar segmentos na URL. No seu projeto existem dois grupos:

- `(dashboard)` — páginas com menu/sidebar
- `(blank-layout-pages)` — páginas sem layout (login, erro, etc.)

Cada grupo pode ter seu próprio `layout.tsx`.

---

#### Arquivos especiais dentro das pastas

| Arquivo | Função |
|---|---|
| `page.tsx` | Conteúdo da rota (torna a pasta acessível) |
| `layout.tsx` | Layout envolvendo a rota e filhas |
| `loading.tsx` | UI de carregamento (Suspense automático) |
| `error.tsx` | UI de erro |
| `not-found.tsx` | UI de 404 |
| `route.ts` | API endpoint (equivale a uma API route) |

---

#### Resumo visual do seu projeto

```
app/
  layout.tsx                  ← layout raiz (envolve tudo)
  globals.css
  
  (dashboard)/                ← grupo com sidebar/menu
    clientes/
      page.tsx                → URL: /clientes
    ...

  (blank-layout-pages)/       ← grupo sem menu (login, etc.)
    ...

  [...not-found]/             ← catch-all: qualquer rota inválida
  
  api/                        ← rotas de API (route.ts)
  not-authorized/             → URL: /not-authorized
```

---

#### A pasta src no seu projeto

As pastas fora de `app/` (`components/`, `hooks/`, `types/`, etc.) são **convenção de organização só sua** — o Next.js não as interpreta como rotas. Elas existem dentro de src para separar código de UI/lógica das rotas.


---
---
---

## Outras particularidades do Next.js App Router

---

### `[[...param]]` — Catch-all opcional

```
app/
  [[...slug]]/    → /  E também /a/b/c (a barra raiz também bate)
```
Diferente do `[...param]` que exige ao menos um segmento.

---

### `@pasta` — Slots (Parallel Routes)

```
app/
  @modal/
    login/
      page.tsx
  layout.tsx      ← recebe @modal como prop
```

Permite renderizar **duas páginas ao mesmo tempo** no mesmo layout (ex: modal por cima do conteúdo). O `@` não aparece na URL.

---

### `(.)pasta` / `(..)pasta` — Intercepting Routes

```
app/
  fotos/
    [id]/
      page.tsx         → /fotos/123 (página completa)
  (.)fotos/
    [id]/
      page.tsx         → intercepta /fotos/123 ao navegar internamente
```

Permite abrir `/fotos/123` como modal quando o usuário navega pelo site, mas mostrar a página completa quando acessar direto pela URL. Muito usado com `@modal`.

| Prefixo | Intercepta |
|---|---|
| `(.)` | mesmo nível |
| `(..)` | um nível acima |
| `(...)` | raiz do app |

---

### `_pasta` — Pasta privada (ignorada pelo roteador)

```
app/
  _components/    → NUNCA vira rota, mesmo tendo page.tsx
```

Útil para organizar arquivos auxiliares dentro de `app/` sem risco de virar rota acidentalmente.

---

### Arquivos especiais (além dos básicos)

| Arquivo | Função |
|---|---|
| `template.tsx` | Como `layout.tsx`, mas **recria** a instância a cada navegação (sem persistir estado) |
| `default.tsx` | Fallback para Parallel Routes quando não há match |
| `middleware.ts` | Executado **antes** de toda requisição (autenticação, redirects) — fica na raiz do projeto |
| `instrumentation.ts` | Código que roda na inicialização do servidor |

---

### `route.ts` — API Routes

```
app/
  api/
    usuarios/
      route.ts    → GET/POST /api/usuarios
```

```ts
// route.ts
export async function GET(request: Request) { ... }
export async function POST(request: Request) { ... }
```

Cada função exportada corresponde a um método HTTP.

---

### Server vs Client Components

Por padrão, **todo componente em `app/` é Server Component** (roda no servidor, sem JS no cliente).

```tsx
// Client Component — precisa declarar explicitamente
"use client"

import { useState } from "react"
```

Use `"use client"` apenas quando precisar de: `useState`, `useEffect`, eventos (`onClick`), APIs do browser.

---

### Resumo visual

```
app/
  layout.tsx          ← layout persistente
  template.tsx        ← layout que recria a cada nav
  page.tsx            ← rota pública
  loading.tsx         ← suspense automático
  error.tsx           ← boundary de erro
  not-found.tsx       ← 404
  route.ts            ← API endpoint

  [id]/               ← parâmetro dinâmico
  [...slug]/          ← catch-all (1+ segmentos)
  [[...slug]]/        ← catch-all opcional (0+ segmentos)
  (grupo)/            ← agrupamento sem afetar URL
  @slot/              ← parallel route
  _privada/           ← ignorada pelo roteador
  (.)intercept/       ← intercepting route
```

---

Para um iniciante, o fluxo de aprendizado recomendado é:

1. `page.tsx` + `layout.tsx` + rotas dinâmicas `[param]`
2. Route Groups `(grupo)` para layouts diferentes
3. `"use client"` vs Server Components
4. `route.ts` para APIs
5. `middleware.ts` para autenticação


---------
----------
---------
-


-# `'use client` no iníco de arquivo: força o next ser client-side

  No Next.js (principalmente usando o **App Router**, nas versões mais novas), o `'use client'` no topo de um arquivo `.ts` ou `.tsx` define que aquele arquivo é um **Client Component**.

---

## 🧠 O que é `'use client'`

É uma **diretiva especial** que diz:

> “Esse componente deve rodar no navegador (client-side), não no servidor.”

Por padrão, no Next.js moderno:

* **Todos os componentes são Server Components**
* Ou seja, rodam no servidor

Se você quiser usar coisas do navegador, precisa marcar com `'use client'`.

---

## 🔍 Exemplo

```tsx id="ex1"
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```

👉 Aqui precisa de `'use client'` porque usa:

* `useState`
* evento `onClick`

---

## ⚠️ Quando você PRECISA usar `'use client'`

Use quando o componente tiver:

* Hooks como:

  * `useState`
  * `useEffect`
* Eventos:

  * `onClick`, `onChange`, etc.
* Acesso ao browser:

  * `window`, `localStorage`
* Navegação com `useRouter()`

---

## 🚫 Quando NÃO precisa

Se o componente:

* só renderiza dados
* faz fetch no servidor
* não usa interação

👉 então **não use `'use client'`** (melhor performance)

---

## 🧩 Diferença resumida

| Tipo                              | Onde roda | Pode usar hooks? | Performance    |
| --------------------------------- | --------- | ---------------- | -------------- |
| Server Component                  | servidor  | ❌                | 🚀 melhor      |
| Client Component (`'use client'`) | navegador | ✅                | ⚠️ mais pesado |

---

## 💡 Dica importante

* `'use client'` **afeta todo o arquivo**
* E tudo que ele importa também vira client-side

---

## 🧠 Ligando com seu exemplo anterior

Seu código com `useEffect`:

```js id="ex2"
useEffect(() => {
  if (!hasPermission(META_PERMISSIONS.metas.gerente)) {
    router.push('/not-authorized')
  }
}, [])
```

👉 Só funciona se o arquivo tiver:

```js id="ex3"
'use client'
```

Porque:

* `useEffect` só roda no client
* `router.push()` depende do navegador

---

## ✅ Resumindo

* `'use client'` = roda no navegador
* necessário para interatividade
* sem isso, o componente roda no servidor por padrão

---

Se quiser, posso te mostrar quando usar **server vs client na prática** (tipo autenticação, fetch de dados, etc.), que é onde muita gente se confunde no Next.js.


---
---
---
---
---
---
---



