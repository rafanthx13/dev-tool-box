# TypeScript

# Estudos de TypeScript

Git do curso de TypeScript: https://github.com/luizomf/cursojstypescript
+ BAIXE EXTAMANETE OS PACOTES DELE do git, pois se usar o node de hoje e o eslint de hoje vai dá problema

## Resumo

+ **O que é TypeScript**
  + SuperSet do JS que adiciona tipagem e recursos extras. Você escreve com tipagem e o VSCode/IDE consegue validar os tipos enquanto programa interrompendo compilação se houver algum problema de tipagem ,tornando o código ais seguro com menos bugs. No final, é compilado para JS puro, pois o JS nâo tm tipagem
  + Vantagesn: AutoComplete e IntelliSnse; Dectecção de erros antes de execução; Código mais legível e documentado; Suporte a programaçâo moderna

## Pesquisar depois

+ Pesquisa o impacto do export para module mode e stcript mode

## Descrição

Use extamente o `pacakge.json` do git pois seguindo o que ele fala nâo funciona hoje em 2025

## O que é o TypeScript

[TypeScript](https://www.typescriptlang.org/) é um **superset** do JavaScript que adiciona **tipagem estática** e diversos **recursos extras** à linguagem. Todo código em TypeScript é **compilado (transpilado)** para **JavaScript puro**, o que significa que pode rodar em qualquer ambiente compatível com JS (navegadores, Node.js, Deno etc.).

## Evolução do JavaScript e do TypeScript

O JavaScript evoluiu ao longo dos anos em versões padronizadas pelo **ECMAScript**:

+ **ES5** (2009) → trouxe melhorias de sintaxe e APIs.
+ **ES6/ES2015** → introduziu `let`, `const`, classes, arrow functions, promises, módulos e muito mais.
+ **ES7, ES8…** → cada ano novas versões são lançadas.

O TypeScript acompanha essa evolução e sempre adiciona recursos **ainda mais avançados** que só existem nele, como interfaces, tipos personalizados, enums, entre outros.

Na hora de compilar, você pode escolher qual versão do ECMAScript quer gerar, por exemplo: **ES5, ES6, ES2020** etc. Isso garante compatibilidade com navegadores ou ambientes mais antigos.

## Diferença entre JavaScript e TypeScript

+ O **JavaScript** é **dinâmico e sem tipagem estática**. Você pode passar qualquer parâmetro para uma função, e os erros só aparecem em tempo de execução (runtime).
+ O **TypeScript** adiciona **checagem de tipos em tempo de desenvolvimento**. Se você tentar passar um tipo diferente do esperado, o compilador acusa imediatamente e pode até **bloquear a compilação** até o erro ser corrigido.

Isso significa que o TypeScript funciona como uma espécie de **validador contínuo** dentro do editor, prevenindo muitos erros antes mesmo de rodar o código.

## Recursos exclusivos do TypeScript

Alguns exemplos do que existe no TS e não no JS puro:

+ **Interface** → define contratos de objetos.
+ **Modificadores de acesso** (`public`, `private`, `protected`).
+ **Readonly** → propriedades imutáveis após inicialização.
+ **Classes abstratas** → classes base que não podem ser instanciadas diretamente.
+ **Type aliases** (`type`) → criação de tipos personalizados e reutilizáveis.
+ **Enum** → representação de múltiplas opções (numéricas ou strings).
+ **Generics** → permitem criar funções, classes ou interfaces que funcionam com vários tipos.
+ **Decorators** (experimental) → metaprogramação para adicionar comportamento a classes e métodos.

## Vantagens do TypeScript

+ **Autocompletar e IntelliSense** → melhor suporte em IDEs como VSCode.
+ **Detecção de erros antes da execução**.
+ **Código mais legível e documentado**.
+ **Maior escalabilidade em projetos grandes**.
+ **Suporte a padrões modernos de programação**.
+ **Facilidade para trabalhar em equipe**, já que os tipos funcionam como documentação viva.

## Observações interessantes

+ O **VSCode** foi escrito em TypeScript.
+ O TypeScript possui **inferência de tipos**. Se você cria um objeto, ele já entende os tipos automaticamente:

```typescript
const pessoa = {
    nome: 'Luiz',
    sobrenome: 'Otávio',
    idade: 28
}
```

O compilador deduz:

```typescript
const pessoa: {
    nome: string;
    sobrenome: string;
    idade: number;
}
```

Ou seja, mesmo sem declarar explicitamente, o TS já sabe quais são os tipos.

## Instalando TypeScript

````sh
npm init -y
````

vamos precisar do npm pra baixar o ``ts``

````sh
npm i typescript -D
````

Compilar

````sh
npm tsc index.js
````

## Modo script e module do TypeScript

No TypeScript há dois tipos de modos: script mode e module mode.

Quando está no script mode, ele lê e entende todos os arquivo JS e TS como se estivesse junto numa coisa só; por isso, nesse modo, se você define uma mesma funçao em locais diferentes e ele acusa erro.

Ele deixa de entender isso se você exportar alguma coisa.

**Os dois modos de funcionamento do TS: `script mode` e `module mode`**.

### 📌 Script Mode

+ Ocorre quando **nenhum `import` ou `export`** aparece no arquivo.
+ Nesse caso, o arquivo é tratado como um **script global**.
+ As variáveis, funções e classes definidas nele **entram no escopo global** → podem ser acessadas por outros arquivos também em *script mode*.
+ Isso pode causar **conflito de nomes** (por exemplo, duas funções `calcular()` em arquivos diferentes).
+ É mais comum em projetos **antigos ou pequenos**, mas não é recomendado para projetos modernos.

Exemplo:

```typescript
// arquivoA.ts
const nome = "Rafael";  // escopo global

// arquivoB.ts
console.log(nome); // funciona, mesmo sem importar
```

---

### 📌 Module Mode

+ (!!!) Ocorre quando o arquivo contém pelo menos **um `import` ou `export`**.
+ Nesse caso, o arquivo é tratado como um **módulo isolado**.
+ Variáveis, funções e classes ficam **restritas ao arquivo**, só ficando acessíveis se forem exportadas/importadas.
+ Evita conflitos de nomes e deixa o código mais organizado.
+ É o padrão recomendado em **projetos modernos** (Node.js, React, Angular etc.).

Exemplo:

```typescript
// arquivoA.ts
export const nome = "Rafael";  // só fica acessível se exportado

// arquivoB.ts
import { nome } from "./arquivoA";
console.log(nome); // precisa importar
```

🔑 Resumindo

+ **Script mode**: tudo é global → prático mas perigoso.
+ **Module mode**: tudo é isolado → mais seguro, organizado e padrão atual.

## Instalando  ``ts-node`` e ``CodeRunner`` pra executar `ts`

````sh
npm i ts-node -D
````

Arquivo: ``.vscode/settings``

````json
{
    "code-runner.executorMap": {
        "typescript": "npx ts-node --files",
    }
}
````

## Baixar ESLint

````sh
npm i eslint -D
````

ESLINT faz a integrçaao do eslint com o typeScript

````sh
npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
````

Crie o arquivo ``eslint.config.js`` (pois estamos usando o ESLINT9 mais moderno)

````js
// Esse template é bem mais liberal
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
````

## Configurar o Prettier

````sh
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
````

Pulei pois é chato e nâo funciona no React mais moderno

## Type Annotation: As tipagens o typeScript

````typescript
// Os tipos vem depois da variavel (variavel :tipo)
// O tipo any é quando ele nao consegue inferir o valor

// Tipos básicos (aqui ocorre inferência de tipos)
let nome: string = 'Luiz'; // Qualquer tipo de strings: '' "" ``
let idade: number = 0b1010; // 10, 1.57, -5.55, 0b1010, 0o7744
let adulto: boolean = true; // true ou false
let simbolo: symbol = Symbol('qualquer-symbol'); // symbol
// let big: bigint = 10n; // bigint

// Arrays
let arrayDeNumeros: Array<number> = [1, 2, 3];
let arrayDeNumeros2: number[] = [1, 2, 3];
let arrayDeStrings: Array<string> = ['a', 'b'];
let arrayDeStrings2: string[] = ['a', 'b'];

// Objetos
let pessoa: {nome: string, idade: number, adulto?: boolean} = {
  idade: 30,
  nome: 'Luiz'
};

// Funções
function soma(x: number, y: number): number {
  return x + y;
}

// Arrow Function
const soma2: (x: number, y: number) => number = (x, y) => x + y;

// Module mode
export default 1;
````

OBS: Inferência

````typeScript
let nome: string = 'Luiz';
let nome = 'Luiz'; // (ele já entende como string)
````

OBS: nullable

````typescript
adulto?: boolean // aceita tue/aflse ou null também
````

Se você define

````ts
let pessoa = {
  idade: 30,
  nome: 'Luiz'
};
````

Ele entende que é um objeto com inteiro e string, ele faz inferência. Portanto se voce for atribuir algo a `pessoa``, devera ser um objeto dessa forma

## Type any: evite usá-lo

Isso pode desencadear outroa problemas, pois com any ele nunca reclama mas assim pode dar erro em run-time.

Se o modo 'strict' estiver ativado no typeScript ele nem mesmo aceita o tipo `any` mesmo se você obrigar a definir

Utilize ``any`` apenas em último caso, pois é sempre bom você ser mais específico.

````typescript
// Utilize any apenas em último caso, como, por exemplo, quando quer aceitar qualquer coisa mesmo
function showMessage(msg: any) {
  return msg;
}

console.log(showMessage([1, 2, 3]));
console.log(showMessage('Olá'));
console.log(showMessage(1));
````

## Tipo Void

Quando uma função ou método não retorna nada, nesse caso o seu tipo é void

````ts
function semRetorno(...args: string[]): void {
  console.log(args.join(' '));
}

const pessoa = {
  nome: 'Luiz',
  sobrenome: 'Otávio',

  exibirNome(): void {
    console.log(this.nome + ' ' + this.sobrenome);
  },
};

semRetorno('Luiz', 'Otávio');
pessoa.exibirNome();

export { pessoa };
````

OBS: Mesmo que o TS faça inferência, busque sempre ser explíticto na assunatura de métodos de classes e no retorno de funções

## Tipo object

Se você usa aquele objeto em vários locais, é bom você criar um tipo pra ele.

Se não, é bom você apenas só tipar o que tem dentro dele

````ts
const objetoA: {
  readonly chaveA: string; // Não permite escrita
  chaveB: string;
  chaveC?: string;
  [key: string]: unknown; // quando eu nao souber a chaves que tera o objeto
} = {
  chaveA: 'Valor A',
  chaveB: 'Valor B',
};

objetoA.chaveB = 'Outro valor';
objetoA.chaveC = 'Novo valor';
objetoA.chaveD = 'Nova chave';

objetoA.chaveA = 'Nova chave'; // Acusa erro pois é readOnly

console.log(objetoA);

// Module mode
export default 1;

````

## Tipo Array

````typescript
// Array<T> - T[]
// Esser <T> é o Genercis igual ao Genérics do Java</T>
// Ess T é apenas uma variável qualquer da mesma forma que usamos  'x' em matematica
// Começa com T depois U, V, X, Y, Z

// ...args == rest parameter
// Ela nâo receb um array, recebe nenhum, um ou N parâmetros, mas todos os paramteors passados serão todos tratados dentro como se fosse um único array


export function multiplicaArgs(...args: Array<number>): number {
  return args.reduce((ac, valor) => ac * valor, 1);
}

export function concatenaString(...args: string[]): string {
  return args.reduce((ac, valor) => ac + valor);
}

export function toUpperCase(...args: string[]): string[] {
  return args.map((valor) => valor.toUpperCase());
}

const result = multiplicaArgs(1, 2, 3);
const concatenacao = concatenaString('a', 'b', 'c');
const upper = toUpperCase('a', 'b', 'c');

console.log(result);
console.log(concatenacao);
console.log(upper);

````

## Tipo turple

É semelhante a tupla do python, aqui podemos definir um aray de tamanho fixo com tipos espceficos para cada index

````typescript
// Tuple
const dadosCliente1: readonly [number, string] = [1, 'Luiz']; // com tipo readonly, nao permite escrita
const dadosCliente2: [number, string, string] = [1, 'Luiz', 'Miranda'];
const dadosCliente3: [number, string, string?] = [1, 'Luiz']; // se uso interrofaçao, aquele campo pode ser null ou undefined, ou seja, nao precisamos definir
const dadosCliente4: [number, string, ...string[]] = [1, 'Luiz', 'Miranda']; // Depois de 'Luiz', tudo vai entrar denotr de ..string[]

// dadosCliente1[0] = 100;
// dadosCliente1[1] = 'Carlos';

console.log(dadosCliente1);
console.log(dadosCliente2);
console.log(dadosCliente3);
console.log(dadosCliente4);

// readonly array
const array1: readonly string[] = ['Luiz', 'Otávio'];
// Outra forma de fazer array imutável
const array2: ReadonlyArray<string> = ['Luiz', 'Otávio'];

console.log(array1);
console.log(array2);

// Module mode
export default 1;
````

## Tipo null e undefined

``undefined`` é quando algo nao foi definido. O utilizamos o quando queremos verificar se algo foi ou nao definido, semelhante a como é usado o `isset` em php.

Já o ``null`` é meio que um valor vazio a ser usado no código, nao seu usa undefined.

usamos ``undefined`` pra avaliar se algo esta criado ou nao e e ``null`` para ser um tipo de valor.

````typescript
// Uso de ``undefined``
let x;
if (typeof x === 'undefined') x = 20; // Atribui 20 se for undefined, ou seja, se nâ  foi definiada
console.log(x * 2);

// Aqui eu primeiro passo parametro tipados e depois tipo o objeto retornado e por ultimo o objeto real retornado
export function createPerson(
  firstName: string,
  lastName?: string,
): {
  firstName: string;
  lastName?: string;
} {
  return {
    firstName,
    lastName,
  };
}

// Aqui eu passo qualquer tipo e retorno number ou null
export function squareOf(x: any): number | null {
  if (typeof x === 'number') return x * x;
  return null;
}

const squareOfTwoString = squareOf('2');

if (squareOfTwoString === null) {
  console.log('Conta inválida');
} else {
  // Aqui o TS vo VScode ja sabe que aqui é number, pois verificou no if anterior que era null,
  // Só pode ser dois valores: number ou null
  console.log(squareOfTwoString * 100);
}

````

## Tipo never

Em geral usado quando numa no final, jgoga-se erro. O tipo never india que nunca vai retornar nada.

````ts
// nese vcaso poderia ser susbstituido por void
export function criaErro(): never {
  throw new Error('Erro qualquer');
}

criaErro();

// Module mode
export default 1;
````

## Tipo enum

Exclusivo do TypeScript, nao existe no JS.

Seve para enumerar, ter opções limitadas para uma variável tipo o `<select>` no html

````typescript
enum Cores {
  VERMELHO = 10, // 10
  AZUL = 100, // 100
  AMARELO = 200, // 200
}

enum Cores {
  ROXO = 'ROXO',
  VERDE = 201,
  ROSA,
}

export function escolhaACor(cor: Cores): void {
  console.log(Cores[cor]);
}

escolhaACor(123456);
````

Um detalhe imporatnte, se e nao passao o par index, value ele mesmo cria como se fosse um array bi-direcional. Ou seja:

````typescript
enum Cores {
  VERMELHO,
  AZUL,
  AMARELO
}

console.log(Cores)
/*
// Faz mapeamento da string pra index e vice-versa
{
  '0': 'VERMELHO',
  '1': AZUL,
  '2': 'AMARELO',
  VERMEHLO: 0,
  AZUL: 1,
  AMARELO: 2
}
*/
````

codigo

````ts
enum Cores {
  VERMELHO = 10, // 10
  AZUL = 100, // 100
  AMARELO = 200, // 200
}

enum Cores {
  ROXO = 'ROXO',
  VERDE = 201,
  ROSA,
}
// Ele na verdade UNE os dois enums

// console.log(Cores.VERMELHO); => 10
// console.log(Cores[10]); => 10 //VERMELHO

export function escolhaACor(cor: Cores): void {
  console.log(Cores[cor]);
}

escolhaACor(123456);
// Infeimsente o TypeScript nao restinge muito algumas bizarrizes que ocorre no enum
````

## Tipo unkwon

É semelhante ao ``any`` só que mais seguro.

Se algo é ``unkwon``, seignifca que pode reeber qualquer coisa.

É um ``any`` mais seguro.

Se você nao sabe o que vai receber, escolha ser ``unkwon`` e faça a checagem de tipo antes de prosseguir.

````typescript
let x: unknown;

x = 100;
x = 'Luiz';
x = 900;
x = 10;
const y = 800;

// console.log(x + y); //Acusa erro pois só permite fazer operaçao em ubnkdwon se voc^r fizer uma chacagem de ipo exomlicita no unwkni

if (typeof x === 'number') console.log(x + y);

// Module mode
export default 1;


````

## Union Type: Mais de um tipo de retonro utilziando 'pipe |'

OBS: Se você faz uma operçaao com number e recebe 'number | string' você tem que provar então que é number fazendo uma chacagem de ``typeof``, se nisso não funciona

````typescript
// Memso com tipagem, consegue lida rcom nuber e string
function addOrConcat(
  a: number | string | boolean,
  b: number | string | boolean,
): number | string {
  // Um detalhe muito importate. O typeScript nao permite baderna
  // tem que verifica o tipo antes de fazer soma numerica de algo que pode ou nao ser nmber
  if (typeof a === 'number' && typeof b === 'number') return a + b;
  return `${a}${b}`;
}

console.log(addOrConcat(10, 20));
console.log(addOrConcat('10', '20'));
console.log(addOrConcat(10, '20'));
console.log(addOrConcat('10', 20));
console.log(addOrConcat(true, true));

// Module mode
export default 1;
````

## Tipos literais

É usar valores como tipos. É usado esse conceito ao se definir `constants`

````typescript
let x = 10; // eslint-disable-line
x = 0b1010; // com let, ao definir = 10, ele é number e agora só pode receber number

const y = 10; // o tipo de y aqui não é number, é 10, ele não pode ser qualquer outro núemero
// 10 é um subtipo de number e y só pode sr do tip 10

const a = 100; // eslint-disable-line

const pessoa = {
  nome: 'Luiz' as const, // o tipo de nome é o tpo Luiz, e nao string, aí, não é possivel altera esssa prop do objeto
  sobrenome: 'Miranda',
};

// Com esse tipo alias + union type, então posso fazer union de alias, parecido com enum
// Cor pode ser um desses 3 tipos literais, e nao necessariamente de string, por isso nao dá pra mandar '' nem qualquer outra cor, só essas
export function escolhaCor(cor: 'Vermelho' | 'Amarelo' | 'Azul'): string {
  return cor;
}
console.log(escolhaCor('Vermelho'), pessoa, x, y);

// Agente sempre cria um tipo literal usando const
// Em geral, utilizamos mais const do que let no typescript
````

## Type alias: Criar um tipo que simplifica as coisas

Lembrando que esse tipo só existe no TS. quanado for compilado ele não existe.

````typescript
type Idade = number; // Criando alias

type Pessoa = {
  nome: string;
  idade: Idade; // usando alias
  salario: number;
  corPreferida?: string;
};

type CorRGB = 'Vermelho' | 'Verde' | 'Azul'; // OR

type CorCMYK = 'Ciano' | 'Magenta' | 'Amarelo' | 'Preto';

type CorPreferida = CorRGB | CorCMYK; // Concatenando tipo alias

const pessoa: Pessoa = {
  idade: 30,
  nome: 'Luiz',
  salario: 200_000, // Quando eu tenho um número com muitas coaisas eu pos separar ele com underline, aqui representa 200k
};

// Ele fala que 'corPreferida é:
// ====> type CorPreferida = ("Vermelho" | "Verde" | "Azul") | ("Ciano" | "Magenta" | "Amarelo" | "Preto")
export function setCorPreferida(pessoa: Pessoa, cor: CorPreferida): Pessoa {
  return { ...pessoa, corPreferida: cor };
}

console.log(setCorPreferida(pessoa, 'Azul'));
console.log(pessoa);
````

## Intersection Type

Pouco usado, enquanto que o UNION TYPE é um OR, o INTERSECT é um AND, ou seja, vai aceitar aquilo que é aceitado nos dois lados da operação.

````typescript
type TemNome = { nome: string };
type TemSobrenome = { sobrenome: string };
type TemIdade = { idade: number };
type Pessoa = TemNome & TemSobrenome & TemIdade; // AND

type AB = 'A' | 'B';
type AC = 'A' | 'C';
type AD = 'D' | 'A';
type Intersecao = AB & AC & AD;

const pessoa: Pessoa = {
  nome: 'Luiz',
  sobrenome: 'Miranda',
  idade: 30,
};

console.log(pessoa);

// Module mode
export { pessoa };

````

## Funções como tipo

Vamos fazer um exemplo pra praticar isso. Vamos criar uma função que faz um map com string.

````ts
// Definindo a função
export function mapStrings(array: string[], callbackfn: CallableFunction,): string[] {
  const newArray: string[] = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    newArray.push(callbackfn(item));
  }

  return newArray;
}

// Chamando
const abc = ['a', 'b', 'c'];
const abcMapped = mapStrings(abc, (item) => item.toUpperCase());
console.log(abc);
console.log(abcMapped);
````

O termo `CallableFunction` é usado para functions, algo como um  `any` mas para functions, ou seja, dá pra passar por qualquer funçâo.

O melhor seria tirar essa função que passariamos para dentro de nosos map

````ts
// Tipagem de função
type MapStringsCallback = (item: string) => string;
````

E assim vai ficar

````ts
type MapStringsCallback = (item: string) => string;

export function mapStrings(
  array: string[],
  callbackfn: MapStringsCallback,
): string[] {
  const newArray: string[] = [];

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    newArray.push(callbackfn(item));
  }

  return newArray;
}

const abc = ['a', 'b', 'c'];
const abcMapped = mapStrings(abc, (item) => item.toUpperCase());
console.log(abc);
console.log(abcMapped);
````

## O Structural type system do TypeScript

A Tipagem do TS é um pouco difenrete da do Java

É uma tipagem com o intúito de ser restritiva, e somente isso.

Observe o seguinte código:

````ts
type VerifyUserFn = (user: User, sentValue: User) => boolean;
type User = { username: string; password: string };

const verifyUser: VerifyUserFn = (user, sentValue) => {
  return (
    user.username === sentValue.username && user.password === sentValue.password
  );
};

const bdUser = { username: 'joao', password: '123456' };
const sentUser = { username: 'joao', password: '123456', permissions: '' };
const loggedIn = verifyUser(bdUser, sentUser);
console.log(loggedIn);
````

Tipamos que `VerifyUserFn` recebe dois tipos `User`.

Agente nâo criou classe  nem nada do tipo user, ao invez disso somente fizemos:

````ts
const bdUser = { username: 'joao', password: '123456' };
const sentUser = { username: 'joao', password: '123456', permissions: '' };
````

Se fosse Java, iria reclamar falando que so aceita 'Tipo User'.

Perceba que quando definimos o  `type` como User, dizemos que recebe um objeto com 2 campos: username e passwrods com suas respectivas tipagesn primitivas.

==> **É somente essa a restritaçao, a esse dois tipos e suas tipagens**

Podemos passar um objeto que faça muito mais cosias, mas nessas condições  somente passando um 0objeto com 2 attra que vai passar.

Ele nao reclama que tem qur criar um `new User` esse é o Structural Type system do TypeScript.

Se o que pasasmos no paramero cumpre a regra, beleza, se faz muito mais do que a regra beleza, se não passa não passa. Por isso consegumios passar um objto com outros atributos.

Isso é diferente da utra-tipagem do Java.

## Type Assertions

````ts
/* Recomendado */


/* Case 1:

Ao fazer document.querySelector('body') o retorno é só duas coisas:

HTMLBodyElement | Null

Se eu faço

body1.style.background = 'red';

nâo dá certo, pois esse elemento pode ser null, portanto se fosse daria problema

Para garantir que isos sempre vai dá certo então temos que fazer uma chacagem:

if(body1) // antes do body1.style.background = 'red';

Com isso o TS já sabe que  nâo é null, que portanto é um HTMLBodyElement e por isso consegue fazer a atribuição

OU SEJA É MUITO IMPROTANTE SE PREOCUPAR QUANDO AS COISAS ODEM OU NAO VOLTAR NULOS. SE VPODE VOLTAR NULL, ENTAO TEMQ UE FAZER UMA CHACAGEM.


 */
// Condicional :: Usando 'if' para restringir tipos
const body1 = document.querySelector('body');
if (body1) body1.style.background = 'red';

// Type assertion
// Aqui estamos dizendo que o 'body' existe mesmo com 'as HTMLBodyElement'
// Assim eu garanto que o body existe. Só serve com total certeza
const body3 = document.querySelector('body') as HTMLBodyElement;
body3.style.background = 'red';

// HTMLElement
const input = document.querySelector('.input') as HTMLInputElement;
input.value = 'Qualquer coisa';
input.focus();

/* Não Recomendado */
// Type assertion
const body4 = (document.querySelector('body') as unknown) as number;

// Non-null assertion (!)
const body2 = document.querySelector('body')!;
body2.style.background = 'red';

````

## Classes em TypeScript

````ts
// Em geral, criamos classe para serem usadas em outro locais, portanto, começamos colocando 'export'
export class Empresa {

  public readonly nome: string; // public não necessário
  private readonly colaboradores: Colaborador[] = [];
  protected readonly cnpj: string;

  constructor(nome: string, cnpj: string) {
    this.nome = nome;
    this.cnpj = cnpj;
  }

  adicionaColaborador(colaborador: Colaborador): void {
    this.colaboradores.push(colaborador);
  }

  mostrarColaboradores(): void {
    for (const colaborador of this.colaboradores) {
      console.log(colaborador);
    }
  }
}

// Forma simples de definir os atibutos direto no construtor
export class Colaborador {

  constructor(
    public readonly nome: string,
    public readonly sobrenome: string,
  ) {}

}

const empresa1 = new Empresa('Udemy', '11.111.111/0001-11');
const colaborador1 = new Colaborador('Luiz', 'Otávio');
const colaborador2 = new Colaborador('Maria', 'Miranda');
const colaborador3 = new Colaborador('João', 'Vieira');
empresa1.adicionaColaborador(colaborador1);
empresa1.adicionaColaborador(colaborador2);
empresa1.adicionaColaborador(colaborador3);
console.log(empresa1);
empresa1.mostrarColaboradores();
````

Obs esse `readonly` é similar ao  `const` do JavaScript

## Interface

`interface` é extremamente semelhante à `type` . A diferença é mais conceitual e em seu uso: Usamos interface para objetos usando `extends` e types para tipos mais simples como ``functions`` ou `struct`.

````ts
interface TipoNome {
  nome: string;
}

interface TipoSobrenome {
  sobrenome: string;
}

interface TipoNomeCompleto {
  nomeCompleto(): string;
}

// Type é formado por 3 interfaice, pois, é praticamente a mesma coisa, por isso isso é permitido
type TipoPessoa = TipoNome & TipoSobrenome & TipoNomeCompleto;

interface TipoPessoa2 extends TipoNome, TipoSobrenome, TipoNomeCompleto {}

export class Pessoa implements TipoPessoa2 {
  constructor(public nome: string, public sobrenome: string) {}

  nomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }
}

const pessoaObj: TipoPessoa2 = {
  nomeCompleto() {
    return this.nome + ' ' + this.sobrenome;
  },
  nome: 'Luiz',
  sobrenome: 'Agora tá ok',
};

const pessoa = new Pessoa('Luiz', 'Miranda');
console.log(pessoa.nomeCompleto());
console.log(pessoaObj.nomeCompleto());

````

# Perguntas Direcionados ao chatGPT

## Q1 = Tipagem no TS para objetos

````text
Estou usando typeScript e tenho algumas dúvidas.

Eu defini o seguinte objeto:

let pessoa = {
  idade: 30,
  nome: 'Luiz'
};

eu poderia atribuir a pessoa um objeto com int e string mas com chaves difenretes?
````

### R1 =  Resposta

Boa pergunta 👌

No **TypeScript**, quando você declara um objeto sem tipar explicitamente, o compilador **infere o tipo** a partir das chaves e valores que você atribuiu.

No seu exemplo:

```ts
let pessoa = {
  idade: 30,
  nome: 'Luiz'
};
```

➡️ O TypeScript entende que `pessoa` tem o tipo:

```ts
{
  idade: number;
  nome: string;
}
```

Ou seja, **as chaves fazem parte do tipo**.
Então, se você tentar fazer isso:

```ts
pessoa = {
  ano: 30,
  apelido: 'Zé'
};
```

vai dar erro ❌ porque o objeto não tem as chaves `idade` e `nome`.

---

#### Como aceitar outros objetos (mesmo com chaves diferentes)?

Se sua intenção for permitir **qualquer objeto com string e number**, você pode usar **tipos mais genéricos**, por exemplo:

#### 1. Index signature

```ts
let pessoa: { [key: string]: string | number };

pessoa = { idade: 30, nome: 'Luiz' };
pessoa = { ano: 1994, apelido: 'Zé' }; // funciona
```

#### 2. Usar `Record`

```ts
let pessoa: Record<string, string | number>;

pessoa = { idade: 30, nome: 'Luiz' };
pessoa = { ano: 1994, apelido: 'Zé' }; // também funciona
```

#### 3. Criar um tipo específico (se quiser flexibilidade parcial)

```ts
type Pessoa = {
  idade?: number;
  nome?: string;
  [key: string]: string | number | undefined;
};

let pessoa: Pessoa;

pessoa = { idade: 30, nome: 'Luiz' };
pessoa = { ano: 1994, apelido: 'Zé' }; // ok
```

---

👉 Resumindo:

+ Do jeito que você declarou, **não pode** trocar por um objeto com chaves diferentes.
+ Se quiser permitir isso, precisa usar `Record<string, string|number>` ou uma index signature.

Quer que eu monte um exemplo comparando lado a lado o que **funciona** e o que **dá erro** com o seu código atual?

## Q2 - O que é Type Assertions no TypeScript

````text
O que é Type Assertions no TypeScript
````

### R2

Boa! 🚀
No TypeScript, **Type Assertions** (às vezes chamadas de “type casting”) são uma forma de **dizer ao compilador**:

> “Confie em mim, eu sei melhor que você qual é o tipo desta variável.”

Ou seja, você **força** o TypeScript a tratar um valor como se fosse de outro tipo compatível.

---

#### Sintaxe

Existem duas formas:

##### 1. `as`

```ts
let valor: unknown = "Hello World";
let tamanho: number = (valor as string).length;
```

##### 2. `<Tipo>`

```ts
let valor: unknown = "Hello World";
let tamanho: number = (<string>valor).length;
```

⚠️ A forma com `<Tipo>` não funciona bem em JSX/React (porque pode confundir com tags HTML), então geralmente se usa `as`.

---

##### Quando usar?

+ Quando o TypeScript não consegue inferir o tipo, mas você tem certeza.
+ Para “refinar” um tipo genérico, como `any` ou `unknown`.

Exemplo com `unknown`:

```ts
function getValor(): unknown {
  return "texto";
}

let resultado = getValor();
// resultado.length; ❌ erro, pois é unknown

let tamanho = (resultado as string).length; // ✅ forçamos a ser string
```

---

#### Atenção ⚠️

Type assertions **não fazem conversão real de tipos em tempo de execução**.
É apenas uma instrução para o compilador.
Ou seja:

```ts
let valor = "123" as unknown as number; // compila 😅
console.log(valor); // na prática ainda é string
```

Isso pode dar bugs se usado de forma errada.

---

👉 Resumindo:

+ **Type Assertions** servem para informar manualmente ao TypeScript o tipo de uma variável.
+ Útil quando o compilador não consegue inferir corretamente.
+ Deve ser usado com cuidado, porque você pode “enganar” o TypeScript.

Quer que eu te mostre alguns **casos práticos do dia a dia** em que `type assertions` realmente são úteis (por exemplo, DOM, APIs, JSON)?

## Q3 = O que é `never`

````txt
Tipo never o que é
````

### R3

Boa pergunta 👌 O **tipo `never`** em TypeScript é um dos mais “estranhos” à primeira vista, mas muito útil em alguns cenários.

---

#### 🔹 O que é `never`?

`never` representa um **valor que nunca acontece**.
Ou seja, uma função ou expressão que nunca retorna nenhum valor.

Exemplos típicos:

1. **Função que lança erro**

   ```ts
   function erro(msg: string): never {
     throw new Error(msg);
   }
   ```

   Essa função nunca retorna nada porque **interrompe a execução** com um erro.

2. **Função que entra em loop infinito**

   ```ts
   function loopInfinito(): never {
     while (true) {}
   }
   ```

   Essa também nunca retorna.

---

#### 🔹 Diferença entre `never` e `void`

+ `void`: significa que a função **não retorna valor útil**, mas **retorna** (ex.: `undefined`).
+ `never`: significa que a função **nunca retorna** (seja porque trava, entra em loop infinito ou lança exceção).

```ts
function semRetorno(): void {
  console.log("executou e terminou");
}

function nuncaRetorna(): never {
  throw new Error("acabou o programa aqui");
}
```

---

#### 🔹 Uso em verificações exaustivas

O `never` também é útil para garantir que **todos os casos de um tipo foram tratados**.

Exemplo:

```ts
type Forma = "círculo" | "quadrado";

function area(f: Forma): number {
  switch (f) {
    case "círculo":
      return 3.14;
    case "quadrado":
      return 4;
    default:
      const checagem: never = f; // se alguém adicionar nova opção, dá erro
      return checagem;
  }
}
```

Aqui, se no futuro alguém adicionar `"triangulo"` ao tipo `Forma`, o compilador vai reclamar no `default`, porque `f` não será mais `never`. Isso força a tratar o novo caso. ✅

---

#### 🔹 Resumindo

+ `never` significa: **“isso nunca acontece”**.
+ Usado em:

  + Funções que **não retornam** (`throw` ou loop infinito).
  + Garantir verificações **exaustivas** em `switch` ou `if`.
+ Diferença de `void`: `void` retorna (mas sem valor), `never` nunca retorna.

---

Quer que eu monte um exemplo **prático com `never`** em código realista (tipo validação de API ou de estados em um sistema) para você ver quando ele ajuda de verdade?
