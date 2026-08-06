# Como documentar

## 1. Crie uma página inicial útil

A Home não deve ser um texto longo. Ela deve funcionar como um índice.

Exemplo:

```text
📚 Documentação do Projeto

▶️ Começando
   - Como configurar o ambiente
   - Arquitetura
   - Padrões de desenvolvimento

💻 Desenvolvimento
   - Git Workflow
   - Padrão de Commits
   - Code Review
   - Convenções

🚀 Deploy
   - Homologação
   - Produção
   - Pipeline

🗄 Banco de Dados
   - Convenções
   - Migrations
   - Backup

🧪 Qualidade
   - Testes
   - SonarQube
   - Cobertura

❓ FAQ
```

Assim, a pessoa encontra rapidamente o que procura.

---

## 2. Organize por assunto, não por data

Evite páginas como:

```text
Documentação Janeiro

Documentação Fevereiro

Documentação Março
```

Prefira:

```text
Arquitetura

Banco de Dados

API

Deploy

Pipelines

Desenvolvimento
```

---

## 3. Padronize todas as páginas

Um modelo simples ajuda muito.

Exemplo:

```text
# Objetivo

O que esta página explica.

# Quando utilizar

Em quais situações consultar.

# Procedimento

Passo a passo.

# Exemplos

Exemplos reais.

# Referências

Links relacionados.
```

---

## 4. Use muitas imagens

Diagramas são mais fáceis de entender do que textos.

Exemplos:

* Fluxo de autenticação
* Arquitetura
* Pipeline
* Fluxo Git
* Comunicação entre APIs

Ferramentas como Draw.io, Visio ou Mermaid ajudam bastante.

---

## 5. Faça páginas curtas

Ao invés de uma página com 10 mil linhas:

```txt
Banco de Dados
```

crie:

```txt
Banco de Dados
   ├── Convenções
   ├── Índices
   ├── Migrations
   ├── Procedures
   ├── Backup
```

---

## 6. Tenha uma seção de padrões

Essa costuma ser uma das partes mais úteis.

Exemplo:

```txt
Padrões

├── Git Workflow
├── Commits
├── Branches
├── Versionamento
├── Code Review
├── Laravel
├── SQL
├── API REST
├── Logs
```

---

## 7. Documente decisões

Muito importante.

Em vez de apenas escrever:

```txt
Usamos Redis.
```

Explique:

```txt
Decisão

Foi escolhido Redis porque reduz o tempo de resposta das consultas mais utilizadas.

Alternativas avaliadas

- Memcached
- Banco de dados

Motivação

Redis apresentou melhor desempenho.
```

Esse tipo de registro é conhecido como **Architecture Decision Record (ADR)** e ajuda a entender o contexto das escolhas feitas.

---

## 8. Mantenha um FAQ

Essa costuma ser uma das páginas mais acessadas.

Exemplo:

```txt
Como criar uma migration?

Como rodar o projeto?

Como acessar homologação?

Como atualizar dependências?

Como gerar certificado?

Como fazer rollback?
```

---

## 9. Crie páginas de troubleshooting

Por exemplo:

```txt
Problemas comuns

Docker

Laravel

Azure

SQL Server

Redis

Nginx

Git
```

Cada erro conhecido pode ter:

```txt
Sintoma

Causa

Solução
```

Isso reduz bastante o tempo gasto resolvendo problemas repetitivos.

---

## 10. Utilize bastante Markdown

Alguns recursos deixam a leitura muito melhor.

### Tabelas

| Ambiente        | URL |
| --------------- | --- |
| Desenvolvimento | ... |
| Homologação     | ... |

---

### Blocos de código

````markdown
```bash
php artisan migrate
```
````

---

### Alertas

Você pode usar blockquotes para destacar informações:

```markdown
> Atenção:
> Execute este comando apenas em homologação.
```

---

## 11. Tenha uma página para novos integrantes

Algo como:

```txt
Onboarding

- Instalar Git
- Instalar Docker
- Clonar projeto
- Configurar .env
- Rodar migrations
- Executar testes
- Acessar Azure
```

O objetivo é que alguém consiga preparar o ambiente apenas seguindo essa documentação.

---

## 12. Documente o processo de deploy

Inclua informações como:

* Quem pode fazer deploy.
* Como criar uma Release.
* Como fazer rollback.
* Como verificar logs.
* Como agir em caso de falha.

---

## 13. Evite duplicação

Se a mesma informação aparece em três páginas, em algum momento elas vão divergir.

Prefira uma página principal e faça links para ela nas demais.

---

## 14. Mantenha a Wiki viva

A documentação deve evoluir junto com o código. Sempre que uma mudança significativa for implementada (novo fluxo, ferramenta ou padrão), reserve um tempo para atualizar a Wiki na mesma entrega.

---

## Uma estrutura que costuma funcionar bem

```text
📚 Home

📂 Onboarding
    Instalação
    Ambiente
    Acessos

📂 Arquitetura
    Visão Geral
    Diagramas
    ADRs

📂 Desenvolvimento
    Git Workflow
    Conventional Commits
    Versionamento (SemVer)
    Code Review
    Padrões Laravel
    Boas práticas SQL

📂 Banco de Dados
    Convenções
    Migrations
    Procedures
    Índices

📂 APIs
    Padrões REST
    Autenticação
    Tratamento de erros

📂 DevOps
    Pipelines
    Deploy
    Rollback
    Variáveis de ambiente

📂 Qualidade
    SonarQube
    Testes
    Cobertura

📂 Operação
    Monitoramento
    Logs
    Troubleshooting
    FAQ

📂 Glossário
```

Essa organização facilita encontrar informações rapidamente e acomoda bem o crescimento do projeto. Além disso, incentiva a equipe a manter a documentação atualizada, já que cada assunto tem um local definido e fácil de localizar.
