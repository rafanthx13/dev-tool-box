# VS Code

## Extensões

es6-string-html: aplica hightlight em uma tamplate stirng no js se antes dela tiver \/\*html\*\/`

## Sugestão de extensões

aaron-bond.better-comments
alefragnani.bookmarks
amiralizadeh9480.laravel-extra-intellisense
antfu.iconify
bastienboutonnet.vscode-dbt
batisteo.vscode-django
bierner.markdown-mermaid
bierner.markdown-preview-github-styles
blackduck.code-sight-vscode
bmewburn.vscode-intelephense-client
bpruitt-goddard.mermaid-markdown-syntax-highlighting
christian-kohler.npm-intellisense
christian-kohler.path-intellisense
codezombiech.gitignore
codingyu.laravel-goto-view
damms005.devdb
davidanson.vscode-markdownlint
dbaeumer.vscode-eslint
devsense.composer-php-vscode
devsense.intelli-php-vscode
devsense.phptools-vscode
devsense.profiler-php-vscode
docker.docker
donjayamanne.githistory
eamodio.gitlens
editorconfig.editorconfig
esbenp.prettier-vscode
evendead.help-me-add
exodiusstudios.comment-anchors
fallenmax.mithril-emmet
formulahendry.auto-close-tag
formulahendry.auto-rename-tag
formulahendry.code-runner
glitchbl.laravel-create-view
golang.go
ihunte.laravel-blade-wrapper
ionutvmi.path-autocomplete
j-zeppenfeld.tab-indent-space-align
janisdd.vscode-edit-csv
jasonnutter.search-node-modules
jetbrains.qodana-code
junstyle.php-cs-fixer
kevinrose.vsc-python-indent
ldez.ignore-files
maciejdems.add-to-gitignore
mechatroner.rainbow-csv
mehedidracula.php-namespace-resolver
mgmcdermott.vscode-language-babel
mhutchie.git-graph
michelemelluso.gitignore
mikestead.dotenv
misterj.vue-volar-extention-pack
mohamedbenhida.laravel-intellisense
mohammadbaqer.better-folding
mrmlnc.vscode-apache
ms-azure-devops.azure-pipelines
ms-azuretools.vscode-containers
ms-azuretools.vscode-docker
ms-dotnettools.csharp
ms-dotnettools.vscode-dotnet-runtime
ms-python.debugpy
ms-python.isort
ms-python.python
ms-python.vscode-pylance
ms-python.vscode-python-envs
ms-toolsai.jupyter
ms-toolsai.jupyter-keymap
ms-toolsai.jupyter-renderers
ms-toolsai.vscode-jupyter-cell-tags
ms-toolsai.vscode-jupyter-slideshow
ms-vscode-remote.remote-containers
ms-vscode-remote.remote-ssh
ms-vscode-remote.remote-ssh-edit
ms-vscode-remote.remote-wsl
ms-vscode-remote.vscode-remote-extensionpack
ms-vscode.remote-explorer
ms-vscode.remote-server
ms-vsliveshare.vsliveshare
naoray.laravel-goto-components
naumovs.color-highlight
neilbrayfield.php-docblocker
onecentlin.laravel-blade
onecentlin.laravel-extension-pack
onecentlin.laravel5-snippets
pgl.laravel-jump-controller
pkief.material-icon-theme
pustelto.bracketeer
qwtel.sqlite-viewer
redhat.vscode-yaml
rifi2k.format-html-in-php
ritwickdey.liveserver
ryannaddy.laravel-artisan
samuelcolvin.jinjahtml
shd101wyy.markdown-preview-enhanced
shufo.vscode-blade-formatter
sibiraj-s.vscode-scss-formatter
sonarsource.sonarlint-vscode
steoates.autoimport
streetsidesoftware.code-spell-checker
streetsidesoftware.code-spell-checker-portuguese-brazilian
styled-components.vscode-styled-components
stylelint.vscode-stylelint
syler.sass-indented
tomoki1207.pdf
usernamehw.errorlens
vue.volar
waderyan.gitblame
william-voyek.vscode-nginx
xabikos.javascriptsnippets
xdebug.php-debug
xdebug.php-pack
yoavbls.pretty-ts-errors
yzane.markdown-pdf
yzhang.markdown-all-in-one
zobo.php-intellisense

## Snippets PHP

````json
{
 // Place your snippets for php here. Each snippet is defined under a snippet name and has a prefix, body and 
 // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
 // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
 // same ids are connected.
 // Example:
 // "Print to console": {
 //  "prefix": "log",
 //  "body": [
 //   "console.log('$1');",
 //   "$2"
 //  ],
 //  "description": "Log output to console"
 // }
 "Debugar variavel": {
  "prefix": "echo_var",
  "body": [
    "echo(\"<br>VAR :: ${1:element} ==> \"); var_dump($${1:element}); echo(\"<br>\");"
  ],
  "description": "Debugar variavel"
 },
 "Mostra que passou aqui": {
  "prefix": "show_echo",
  "body": [
    "echo(\"<br>Passou aqui :: ${1:element} <br> \");"
  ],
  "description": "Se passou por ali"
 },
 "Passou + Log": {
  "prefix": "show_log",
  "body": [
    "echo(\"<br>Passou aqui :: ${1:element} <br> \"); error_log(\"${1:element}\");"
  ],
  "description": "Se passou por ali"
 },
 "Show obj": {
  "prefix": "show_obj",
  "body": [
    "echo(\"<br>Passou aqui :: ${1:element} <br> \"); print_r(get_object_vars($${1:element}),true);"
  ],
  "description": "Se passou por ali"
 },
 "Print Array Vertical" : {
  "prefix": "print_array",
  "body": "echo(\"${1:element} :: <br><pre>\".print_r($${1:element},true).\"</pre><br>\");",
  "description": "Printa array"
 
 },
 "error log twice" : {
  "prefix": "errlog",
  "body": "error_log(\"${1:element}\"); error_log($${1:element});",
  "description": "Printa array"
 },
 "error log twice to array" : {
  "prefix": "erralog",
  "body": "error_log(\"${1:element}\"); error_log(print_r($${1:element},true));",
  "description": "Printa array"
 },
 "ultra log": {
  "prefix": "ultlog",
  "body": "echo(\"<br>VAR :: ${1:element} ==> \"); var_dump($${1:element}); echo(\"<br>\"); error_log(\"${1:element}\"); error_log($${1:element});",
  "description": "sai log"
 },
 "ultra log array": {
  "prefix": "ultarr",
  "body": "echo(\"${1:element} :: <br><pre>\".print_r($${1:element},true).\"</pre><br>\"); error_log(\"${1:element}\"); error_log(print_r($${1:element},true));",
  "description": "sai log"
 },
 "ultra log obj": {
  "prefix": "ultobj",
  "body": "echo(\"${1:element} :: <br><pre>\".print_r(get_object_vars($${1:element}),true).\"</pre><br>\"); error_log(\"${1:element}\"); error_log(print_r(get_object_vars($${1:element}),true));",
  "description": "sai log"
 },
}
````
