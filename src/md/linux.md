# Linux

## Comandos Linux

### chmod : change mode

````sh
# Dar permissão de execução a um script
chmod +x script.sh

# Arquivo comum
chmod 644 arquivo.txt

# Script executável
chmod 755 script.sh

# Diretório acessível
chmod 755 pasta/

# Alterar permissões recursivamente
chmod -R 755 pasta/

# Alterar proprietário
sudo chown -R www-data:www-data storage

# Ver permissões
ls -l
````

## nano

O `nano` parece estranho no começo porque ele não usa menus tradicionais: quase tudo é feito com atalhos de teclado. A boa notícia é que ele é simples e suficiente para editar arquivos de configuração no Linux/WSL.

A primeira coisa importante: no nano, o símbolo `^` significa **Ctrl**.

Então:

```
^X
```

significa:

```
Ctrl + X
```

###  Atalhos essenciais nano

Atalho

Função

`Ctrl + O`

Salvar arquivo (Write Out)

`Ctrl + X`

Sair do nano

`Ctrl + W`

Buscar texto

`Ctrl + K`

Cortar/remover uma linha

`Ctrl + U`

Colar linha cortada

`Ctrl + C`

Mostrar posição atual do cursor

`Ctrl + _`

Ir para uma linha específica

`Ctrl + G`

Abrir ajuda

----------

## Fluxo básico que você vai usar 90% do tempo

Abrir:

````bash
nano arquivo.conf
````

Editar → salvar:

```
Ctrl + O
Enter
```

Sair:

```
Ctrl + X
```

----------

## Procurar algo dentro do arquivo

Exemplo: procurar `PS1` no `.bashrc`.

Dentro do nano:

```
Ctrl + W
```

Digite:

```
PS1
```

Enter.

Ele pula direto para a ocorrência.

----------

## Ir para uma linha específica

Muito útil em mensagens de erro tipo:

```
.bashrc: linha 120
```

Use:

```
Ctrl + _
```

Digite:

```
120
```

Enter.

----------

## Apagar uma linha inteira

Coloque o cursor na linha:

```
Ctrl + K
```

Ela some.

Se apagou sem querer:

```
Ctrl + U
```

restaura.

----------

## Selecionar e copiar texto

O nano não funciona como editores gráficos, mas dá:

Começar seleção:

```
Alt + A
```

Mover o cursor para selecionar.

Copiar:

```
Alt + 6
```

Colar:

```
Ctrl + U
```

----------

## Uma dica importante no Linux

Antes de editar arquivos importantes, faça backup:

Exemplo:

````bash
cp ~/.bashrc ~/.bashrc.backup
````

Aí você pode mexer sem medo.

Se quebrar:

````bash
cp ~/.bashrc.backup ~/.bashrc
````

----------

## Ver ajuda dentro do próprio nano

O comando mais importante:

```
Ctrl + G
```

Ele mostra todos os atalhos.

----------

Para o seu caso (WSL + Docker + desenvolvimento), os comandos que você mais provavelmente vai usar são:

````bash
nano ~/.bashrc
nano ~/.gitconfig
nano ~/.ssh/config
nano docker-compose.yml
nano .env
````

Minha sugestão: não tente decorar tudo. Aprenda primeiro estes quatro:

````
Ctrl + O  salvar
Ctrl + X  sair
Ctrl + W  procurar
Ctrl + K  apagar linha
````

Com esses você já consegue administrar praticamente qualquer configuração no WSL.
