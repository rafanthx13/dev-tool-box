# Git & Flow

## Comandos git

````sh
git init
git add --all
git commit -m 'msg'
git push
git push origin master
git pull
git fetch
git branch -m 'change_branch_name'
git checkout -b new_brach / git switch
git merge
````

## Conventional Commits

Extendido para meu uso:

| Tipo        | Significado                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------- |
| `feat`      | Nova funcionalidade relevante (nova ferramenta, página, módulo, API, componente importante) |
| `enhance`   | Aprimora uma funcionalidade existente sem mudar sua essência                                |
| `change`    | Altera um comportamento ou uma regra existente de forma intencional                         |
| `fix`       | Corrige um bug ou comportamento incorreto                                                   |
| `refactor`  | Reorganiza o código sem alterar o comportamento                                             |
| `perf`      | Melhora o desempenho de alguma funcionalidade                                                                      |
| `style`     | Alterações visuais (CSS, Tailwind, layout, animações)                                       |
| `codestyle` | Formatação do código (Prettier, ESLint `--fix`, indentação, organização de imports)         |
| `docs`      | Documentação                                                                                |
| `test`      | Criação ou ajuste de testes                                                                 |
| `build`     | Build, bundler, add/remover/update dependências externas (Dockerfile, package.json)                 |
| `ci`        | Pipeline (GitHub Actions, Azure DevOps...)                                                  |
| `chore`     | Manutenção geral: (Ex: Limpar, mudar ou renomea arquivo, gitignore, editorconfig)                                                                            |
| `content`   | Criação ajuste de arquivo `.md` como artigo de contéudo/blog                                |
| `security`       | Fechar brecha de segurança (x: Header HTTP, sanetizar, validaçao aprimorada)                                |

Formato:

````
tipo(escopo): descrição curta
````

A descrição vem depois de ``:``, normalmente em **minúsculas**, no imperativo na 3ª pessoa e sem ponto final.

### Exemplos

````
test(tasks): adiciona testes de criação e movimentação
fix(notes): preserva posição da página ao editar Markdown
fix(tasks): impede cópia duplicada do dia anterior
ci: compila o Vite antes dos testes
docs: documenta regra de cópia única de tarefas
````

## GitHub Flow

É um fluxo especialmente indicado para equipes que fazem integrações frequentes e buscam manter a branch principal sempre pronta para deploy.

```text
main
 |
 |---- feature/login
 |---- fix/correcao
 |---- feature/relatorio
```

Fluxo:

```text
Branch
   ↓
Desenvolvimento
   ↓
Pull Request
   ↓
Review
   ↓
Merge main
   ↓
Deploy
```

### Fluxo completo

#### 1. A `main` deve estar sempre estável

Ela representa a versão pronta para produção.

Nunca se desenvolve diretamente nela.

----------

#### 2. Criar uma branch

Sempre a partir da `main`.

Exemplo:

```sh
git switch main
git pull

git switch -c feat/login
```

----------

#### 3. Fazer commits pequenos

Exemplo:

```sh
feat: adicionar tela de login

fix: corrigir validação de senha

test: adicionar testes do login
```

----------

#### 4. Abrir um Pull Request

O PR é o centro do GitHub Flow.

É nele que ocorre:

- revisão de código;
- discussão;
- CI;
- testes;
- aprovação.

----------

#### 5. Merge

Depois que tudo passou:

- CI verde
- review aprovado

faz-se o merge.

----------

#### 6. Deploy

Após o merge, normalmente a `main` é publicada automaticamente.

### Resumindo

O GitHub Flow pode ser resumido em cinco passos:

1. Crie uma branch a partir da `main`.
2. Faça commits pequenos e focados.
3. Abra um Pull Request com um único objetivo.
4. Revise, teste e aprove.
5. Faça o merge na `main` e publique a nova versão.
  
----------

## SemVer

O **Versionamento Semântico (Semantic Versioning ou SemVer)** é uma convenção para numerar versões de software de forma que o número da versão indique o tipo de mudança realizada.

O formato é:

```text
MAJOR.MINOR.PATCH
```

Exemplo:

```text
2.15.4
```

Onde:

- **2** → MAJOR
- **15** → MINOR
- **4** → PATCH

### Quando incrementar cada número

#### MAJOR

Incremente a versão **MAJOR** quando houver mudanças incompatíveis que exijam adaptação por parte dos consumidores da aplicação ou uma migração significativa.

##### Casos MAJOR

- Remover endpoints existentes.
- Alterar contratos de API.
- Alterar o formato de retorno de uma API de forma incompatível.
- Remover funcionalidades existentes.
- Alterar comportamentos incompatíveis com versões anteriores.
- Exigir migração manual de dados ou configuração.
- Introduzir mudanças que obriguem clientes ou integrações a serem atualizados.

> **Importante:** Mudanças internas, como atualização de versão do framework (ex.: Laravel) ou troca da implementação da autenticação, só devem resultar em uma versão **MAJOR** caso impactem quem utiliza a aplicação.

----------

#### MINOR

Incremente a versão **MINOR** ao adicionar funcionalidades mantendo compatibilidade com versões anteriores.

##### Casos MINOR

- Nova tela.
- Novo endpoint.
- Novo relatório.
- Novo campo opcional.
- Nova funcionalidade.
- Nova integração.
- Novo parâmetro opcional em uma API.

----------

#### PATCH

Incremente a versão **PATCH** para correções de bugs, melhorias internas e pequenos ajustes que não alterem a compatibilidade nem o comportamento esperado da aplicação.

##### Casos PATH

- Corrigir uma consulta SQL.
- Ajustar um erro de validação.
- Corrigir um problema de CSS.
- Corrigir um bug na importação de planilhas.
- Melhorar desempenho sem alterar o comportamento da aplicação.
- Refatorar código sem modificar a funcionalidade.
- Atualizar dependências sem impacto externo.

#### Qual decidir

| Pergunta                                                              | Versão    |
| --------------------------------------------------------------------- | --------- |
| A mudança quebra compatibilidade ou exige adaptação do consumidor?    | **MAJOR** |
| Adiciona funcionalidade mantendo compatibilidade?                     | **MINOR** |
| Apenas corrige ou melhora algo existente sem alterar compatibilidade? | **PATCH** |

## Porque usar tag para deploy?

Essa é uma excelente pergunta. A resposta curta é: **a branch `main` mostra o estado atual do código; uma tag marca um ponto específico da história**.

Essa diferença é muito importante.

## Sem tag

Imagine que você faz deploy toda semana.

```text
A --- B --- C --- D --- E  (main)
```

Hoje a `main` está em `E`.

Daqui a um mês, ela estará em:

```text
A --- B --- C --- D --- E --- F --- G --- H
                                  (main)
```

Se alguém perguntar:

> "Qual commit corresponde à versão que entrou em produção em janeiro?"

Você terá que descobrir manualmente.

----------

## Com tags

Você marca cada versão:

```text
A --- B --- C --- D --- E --- F --- G --- H
      ↑         ↑         ↑
    v1.0.0    v1.1.0    v1.2.0
```

Agora fica muito simples.

A versão **1.1.0** sempre será exatamente o commit `D`.

Mesmo daqui a cinco anos.

----------

## A `main` continua andando

A branch sempre aponta para o último commit.

```text
main
 ↓
A---B---C---D---E---F
```

Depois de mais trabalho:

```text
main
 ↓
A---B---C---D---E---F---G---H
```

Já a tag nunca muda.

```text
v1.1.0
 ↓
D
```

Ela é um "marco" fixo.

----------

## Isso ajuda no deploy

Imagine:

```text
v2.5.0
```

foi para produção.

Depois entraram mais dez Pull Requests.

A `main` agora está muito diferente.

Se surgir um problema em produção, você sabe exatamente qual código estava rodando:

```text
git checkout v2.5.0
```

Pronto.

Você está exatamente no código que estava em produção.

----------

## Rollback

Suponha:

```sh
v2.4.0
```

estava funcionando.

Depois saiu:

```sh
v2.5.0
```

que apresentou problemas.

Você pode rapidamente voltar para:

```bash
git checkout v2.4.0
```

ou fazer o deploy da imagem construída a partir dessa tag.

Sem tags, você teria que descobrir qual commit era esse.

## Squash Merge

### O que é

No GitHub Flow, é bastante comum usar **Squash and Merge**.

Imagine que durante o desenvolvimento você fez:

```sh
feat: criar tela

fix: corrigir botão

fix: corrigir review

fix: typo

refactor
```

Ao fazer **Squash Merge**, tudo isso vira um único commit na `main`:

```sh
feat: adicionar tela de login
```

Assim, a branch de trabalho pode ter vários commits intermediários, mas o histórico principal permanece limpo e fácil de entender.

### Porque usálo? Não apagaria os commits intermediários?

Exatamente. Esse é justamente o objetivo do **Squash Merge**.

Imagine que você criou a branch:

```text
main
  │
  └── feat/login
```

Durante o desenvolvimento, você fez vários commits:

```text
a1b2c3 feat: criar tela de login
d4e5f6 fix: corrigir validação
g7h8i9 refactor: extrair LoginService
j1k2l3 test: adicionar testes
m4n5o6 fix: ajustar review
```

Quando abre o Pull Request, todo esse histórico fica disponível para revisão.

Se você escolher **Squash and Merge**, o GitHub pega todos esses commits e cria **um único commit novo** na `main`:

```text
main

p9q8r7 feat: adicionar autenticação por login
```

Os cinco commits originais continuam existindo na branch `feat/login`, mas essa branch normalmente é apagada logo após o merge. Na prática, o histórico da `main` fica apenas com o commit consolidado.

----------

### Por que isso é útil?

Durante o desenvolvimento é normal fazer commits como:

```text
fix
oops
corrige teste
mais um ajuste
review
typo
```

Esses commits contam a história do desenvolvimento, mas não são tão úteis para quem olha o histórico da `main` meses depois.

Com squash, o histórico principal fica assim:

```text
feat: adicionar login

feat: cadastro de usuários

fix: corrigir cálculo de impostos

feat: exportação para Excel
```

Cada commit representa uma mudança completa e faz sentido por si só.

----------

### E se eu quiser manter todos os commits?

Aí você usa um **Merge Commit** ou um **Rebase and Merge**, dependendo da política do repositório.

As três opções do GitHub são:

| Tipo de merge        | Resultado na `main`                                    |
| -------------------- | ------------------------------------------------------ |
| **Squash and Merge** | 1 commit para todo o PR                                |
| **Merge Commit**     | Mantém todos os commits e cria um commit de merge      |
| **Rebase and Merge** | Mantém todos os commits, mas sem criar commit de merge |

Por exemplo, suponha que seu PR tenha 5 commits.

**Squash and Merge**

```text
main
 ─── A ─── B ─── C
```

(`C` representa todo o PR em um único commit.)

**Merge Commit**

```text
        D──E──F
       /       \
A──B──C─────────M
```

(O histórico preserva todos os commits e adiciona o merge `M`.)

**Rebase and Merge**

```text
A──B──C──D'──E'──F'
```

(Os commits são reaplicados sobre a ponta da `main`, sem um commit de merge.)

----------

### Qual eu recomendaria?

Para a maioria dos projetos (inclusive um monólito Laravel como o que você está montando), **Squash and Merge** costuma ser a melhor escolha:

- A branch pode ter quantos commits fizerem sentido durante o desenvolvimento.
- O Pull Request continua mostrando todo esse histórico para revisão.
- A `main` permanece limpa, com **um commit por feature, correção ou refatoração**, facilitando entender a evolução do projeto e navegar pelo histórico.

## Como implantar na prática

1 - Crie a brancha apartor de main e organizae a nova brnahc aparotr do seguinte

| Tipo        | Exemplo                     |
| ----------- | --------------------------- |
| `feature/`  | `feature/task-export`       |
| `fix/`      | `fix/login-validation`      |
| `refactor/` | `refactor/user-service`     |
| `docs/`     | `docs/versioning`           |
| `test/`     | `test/login`                |
| `chore/`    | `chore/update-dependencies` |
| `ci/`       | `ci/github-actions`         |
| Extra       |                             |
| `content/`  | Conteúdo como md            |

Fluxo Completo

````txt
main
 │
 ├── feature/login
 │      │
 │      ├── feat: criar tela
 │      ├── feat: autenticação
 │      ├── test: adicionar testes
 │      └── fix: corrigir review
 │
 │      ↓
 │   Pull Request
 │
 │      ↓
 │ Rebase and Merge
 │
 └────────────────────────► main
````

 Na pratica

````sh
git switch main # troca pra main
git pull origin main # atualiza a main
git switch -c feature/login # troca pra branch apartir da main atualizada
git push -u origin feature/login # sobe as alteraçoes
# Atualizar sua branch durante o desenvovilemto
git fetch origin

git rebase origin/main
````

Configurar repo?

- Pull Request: Marque o tipo de pullrequest que vai aceitar
    - ❌ Merge commits
    - ✅ Rebase merging
    - ❌ Squash merging

Branch protection

Mesmo sendo um projeto pessoal, eu protegeria a main.

Em Settings → Branches → Branch protection rules, configure:

- exigir Pull Request antes de fazer merge;
- impedir push direto na main;
- exigir que a branch esteja atualizada antes do merge (opcional, mas recomendado).

Assim você se acostuma com o mesmo fluxo usado em muitos projetos profissionais.

Como fazer

1- em `/settings` no mei da págian tem uma seçao de pull reuqest

# Tag e Release

+ tag é SemVer com o `v` na frente
   + Exemplo: `v2.0.0`
+ O nome da release começa com a tg e tem um nome descritivo ou até mesmo codimnomoo u não tem
  + Exemplo: `v2.0.0.`
  + Exemplo: `v2.0.0 - DockerCompose`
  + Exemplo: `v2.0.0 - Sunrise`

O padrão mais usado é o **Semantic Versioning**: `MAJOR.MINOR.PATCH`

-   `PATCH` (v1.0.**1**) → bugfix pequeno
-   `MINOR` (v1.**1**.0) → funcionalidade nova, sem quebrar nada
-   `MAJOR` (**2**.0.0) → mudança grande que quebra compatibilidade

# Página do Repositório do Github

Mas há várias melhorias que você pode fazer na **página do repositório** (não no código).

**1\. Description e Website (campo "About")** No lado direito da página, aparece _"No description, website, or topics provided."_ — esse é um dos primeiros campos que as pessoas olham. Clique na engrenagem ⚙️ ao lado de "About" e preencha:

-   **Description:** uma frase curta tipo _"Personal daily task tracker with Kanban, time management and analytics"_
-   **Website:** se você tiver um deploy rodando (Fly.io, Railway, etc.), coloque aqui. Se não tiver, pode deixar em branco.

**2\. Topics (tags do repositório)** Ainda no "About", adicione **topics** como: `laravel`, `php`, `kanban`, `productivity`, `tailwindcss`, `sqlite`, `docker`. Isso faz o repositório aparecer em buscas do GitHub e dá contexto visual imediato.

**3\. README — Badges** Badges no topo do README passam credibilidade e informação rápida. Exemplos úteis para o seu projeto:

-   Versão do PHP/Laravel
-   Licença
-   Último commit

O site [shields.io](https://shields.io/) gera qualquer badge. Exemplo para Laravel:

```markdown
![Laravel](https://img.shields.io/badge/Laravel-12-red?logo=laravel)
![PHP](https://img.shields.io/badge/PHP-8\.2+-blue?logo=php)
```

**4\. Licença** O repositório não tem arquivo de licença. Mesmo sendo pessoal, adicionar um `LICENSE` (MIT é o mais comum) é boa prática e o GitHub até exibe um aviso que falta. Você pode criar direto pelo GitHub: _Add file → Create new file → escreva `LICENSE`_ e ele oferece templates prontos.

**5\. GitHub Issues para o backlog (opcional)** Você tem um `NEXT.md` com o que falta fazer — isso é ótimo. Uma melhoria é migrar esse backlog para **GitHub Issues**, pois dá para organizar com labels (`enhancement`, `bug`, `todo`), milestones e até usar o **GitHub Projects** (kanban nativo do GitHub) para gerenciar — irônico para um app de kanban 😄

**6\. Releases** Quando você considerar o projeto "funcional", crie uma **Release** (v0.1.0 por exemplo). Vai aparecer na sidebar e dá uma sensação de progresso e versionamento. CCriada manualmente após deploy.

**7\. GitHub Actions (CI) e com testes** Como você já tem `phpunit.xml`, dá para configurar um workflow simples que roda os testes automaticamente a cada push. É gratuito para repositórios públicos e mostra um badge verde de "tests passing" no README.

