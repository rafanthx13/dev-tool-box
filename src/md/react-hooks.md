# React Hooks

## useEfect

O `useEffect` é um **hook do React** (React) que serve para executar **efeitos colaterais** no componente — coisas que acontecem *fora do fluxo normal de renderização*, como:

* chamadas de API
* manipulação de rota
* acesso ao DOM
* validações (como no seu caso)

Veja o exemplo a seguir:

````js
useEffect(() => {
  if (!hasPermission(META_PERMISSIONS.metas.gerente)) {
    router.push('/not-authorized')
  }
}, [hasPermission, router])
````

Passo a passo:

1. **Quando o componente renderiza (ou quando as dependências mudam)**
O `useEffect` é executado.

2. Ele chama:

```js
hasPermission(META_PERMISSIONS.metas.gerente)
```

→ verifica se o usuário tem permissão de **gerente**.

3. Se **NÃO tiver permissão**:

```js
router.push('/not-authorized')
```

→ redireciona o usuário para a página `/not-authorized`.

👉 Ou seja: **isso protege a página**, impedindo que usuários sem permissão acessem.

---

🧠 O que são as dependências `[hasPermission, router]`

Esse array diz ao React:

> “Execute esse efeito novamente quando `hasPermission` ou `router` mudar.”

* Se fosse `[]`, rodaria **só uma vez** (quando monta o componente)
* Com dependências, roda sempre que alguma delas mudar

---
---
---
---
---
---
---
---
---
---

## useState: Estado

O `useState` é um **hook do React** usado para criar e controlar **estado dentro de um componente**.

👉 “Estado” = dados que podem mudar ao longo do tempo e fazem a interface atualizar automaticamente.

---

### 🧠 O que o `useState` faz

Ele permite:

* armazenar valores (número, string, objeto, etc.)
* atualizar esses valores
* fazer o componente **re-renderizar** quando o valor muda

---

### 🔍 Exemplo simples

```jsx id="st1"
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Aumentar
      </button>
    </div>
  )
}
```

### O que está acontecendo:

```js
const [count, setCount] = useState(0)
```

* `count` → valor atual
* `setCount` → função para atualizar
* `0` → valor inicial

👉 Quando você chama `setCount(1)`, o React:

* atualiza o valor
* re-renderiza o componente

---

## 🧩 No contexto do Next.js

No Next.js:

* `useState` **só funciona em Client Components**
* ou seja, precisa de:

```js
'use client'
```

Porque estado depende do navegador (interação do usuário).

---

## ⚠️ Regras importantes

### 1. Nunca altere o estado diretamente

❌ Errado:

```js
count = count + 1
```

✅ Certo:

```js
setCount(count + 1)
```

---

### 2. Atualizações podem ser assíncronas

Se depender do valor anterior, use função:

```js
setCount(prev => prev + 1)
```

👉 Evita bugs

---

### 3. Pode guardar qualquer tipo

```js
const [name, setName] = useState('João')
const [user, setUser] = useState({ idade: 20 })
const [items, setItems] = useState([])
```

---

## 💡 Quando usar

Use `useState` quando:

* precisa reagir a interação do usuário
* quer controlar inputs (formulários)
* precisa atualizar a tela dinamicamente

---

## 🧠 Resumindo

* `useState` = cria estado no componente
* retorna `[valor, funçãoDeAtualizar]`
* quando atualiza → o componente re-renderiza
* no Next.js → precisa de `'use client'`

---

Se quiser, posso te mostrar um exemplo real (tipo formulário ou login) usando `useState` + `useEffect`, que é o combo mais comum no dia a dia.


---
---
---
---
---
---

O `useCallback` **não é do Next.js** — ele vem do React.

---

## 🧠 O que é o `useCallback`

O `useCallback` é um **hook que memoriza uma função**, evitando que ela seja recriada a cada render.

### 👉 Em outras palavras:

Ele garante que a função só muda quando as dependências mudam.

---

## 📦 Sintaxe básica

```ts
const minhaFuncao = useCallback(() => {
  // lógica
}, [dependencias])
```

---

## 🔥 Por que isso importa?

No React, **toda vez que o componente renderiza, funções são recriadas**:

```ts
const handleClick = () => {
  console.log('clicou')
}
```

Isso parece inofensivo, mas pode causar problemas quando:

### ⚠️ 1. Passa função para componentes filhos

```tsx
<MeuBotao onClick={handleClick} />
```

Se a função muda toda renderização:

* o filho re-renderiza desnecessariamente

---

### ⚠️ 2. Usa em dependências de `useEffect`

```ts
useEffect(() => {
  handleClick()
}, [handleClick])
```

Sem `useCallback`, isso pode virar loop infinito.

---

## ✅ Exemplo com `useCallback`

```ts
const handleClick = useCallback(() => {
  console.log('clicou')
}, [])
```

Agora:

* A função é **a mesma entre renders**
* Só muda se alguma dependência mudar

---

## 🔍 No seu caso

Seu código:

```ts
const handleImportMetas = useCallback(
  async (importData: ImportMetasFormValues) => {
    ...
  },
  [gerenteFilter, anoFilter, handleFiltrar]
)
```

👉 Aqui o `useCallback`:

* Evita recriar `handleImportMetas` a cada render
* Só recria quando:

  * `gerenteFilter`
  * `anoFilter`
  * `handleFiltrar`
    mudarem

---

## ⚖️ Quando usar (regra prática)

Use `useCallback` quando:

✅ Passa função para componente filho
✅ Função está em `useEffect`
✅ Quer evitar re-render desnecessário

---

## 🚫 Quando NÃO usar

Não use só por usar:

```ts
const fn = useCallback(() => {}, [])
```

👉 Isso pode até piorar performance (overhead desnecessário)

---

## 🧩 Resumo simples

* `useCallback` = memoriza função
* Evita recriação a cada render
* Ajuda na performance (em casos específicos)
* Não é obrigatório

---

Se quiser, posso analisar seu componente e te dizer se esse `useCallback` aí realmente faz sentido ou se pode remover sem impacto 👍


---
---
---
---
---
---

Boa — vou focar só nos conceitos que você pediu e explicar de forma prática, sem enrolação.

Esses hooks/funções vêm do React e são usados pra controlar **estado, performance, referências e comunicação entre componentes**.

---

# 🧩 `createContext`

## 👉 O que é

Serve para **compartilhar dados globalmente** entre componentes sem precisar passar props manualmente (prop drilling).

---

## 💡 Exemplo clássico

```ts
const ThemeContext = createContext('light')
```

Depois:

```tsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

E em qualquer lugar:

```ts
const theme = useContext(ThemeContext)
```

---

## 🧠 Quando usar

* Usuário logado
* Tema (dark/light)
* Configurações globais
* Dados que muitos componentes precisam

---

# 🧩 `forwardRef`

## 👉 O que é

Permite que um componente **receba e repasse um `ref`** para um elemento interno.

---

## 💡 Problema que ele resolve

Normalmente isso NÃO funciona:

```tsx
<MeuInput ref={inputRef} />
```

Porque `ref` não passa automaticamente.

---

## ✅ Solução com `forwardRef`

```ts
const MeuInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <input ref={ref} {...props} />
})
```

Agora funciona:

```ts
inputRef.current.focus()
```

---

## 🧠 Quando usar

* Focar input
* Scroll automático
* Integração com libs (ex: formulários)

---

# 🧩 `useMemo`

## 👉 O que é

Memoriza um **valor calculado**, evitando recalcular toda renderização.

---

## 💡 Exemplo

```ts
const total = useMemo(() => {
  return itens.reduce((acc, item) => acc + item.preco, 0)
}, [itens])
```

---

## 🔥 Por que usar

Se o cálculo for pesado:

* evita processamento desnecessário
* melhora performance

---

## ⚠️ Sem `useMemo`

Toda render:

```ts
const total = itens.reduce(...)
```

---

## 🧠 Regra prática

Use quando:

* cálculo é pesado
* ou depende de algo que muda pouco

---

# 🧩 `useRef`

## 👉 O que é

Guarda um valor que:

* **não causa re-render**
* persiste entre renders

---

## 💡 Dois usos principais

### 1. Referência de DOM

```ts
const inputRef = useRef<HTMLInputElement>(null)

inputRef.current?.focus()
```

---

### 2. Guardar valor mutável

```ts
const contador = useRef(0)

contador.current += 1
```

👉 Isso **não re-renderiza o componente**

---

## 🧠 Diferença pra `useState`

| Hook     | Re-renderiza? |
| -------- | ------------- |
| useState | ✅ sim         |
| useRef   | ❌ não         |

---

# 🧩 Resumo geral

| Recurso         | Para que serve                             |
| --------------- | ------------------------------------------ |
| `createContext` | Compartilhar dados globalmente             |
| `forwardRef`    | Passar `ref` para dentro do componente     |
| `useMemo`       | Evitar recalcular valores                  |
| `useRef`        | Guardar valor sem re-render ou acessar DOM |

---

Se quiser, posso te mostrar um exemplo real combinando vários desses (tipo formulário com contexto + ref + memo) — é aí que tudo faz mais sentido junto.

