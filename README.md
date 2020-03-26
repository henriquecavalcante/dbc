## Bem-vindo ao desafio prático DBC

### Pré-requisitos
* git - [Guia de Instalação](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .
* node.js - [Download](https://nodejs.org/en/download/) .
* npm ou yarn - [Download](https://yarnpkg.com/lang/en/docs/install) .
* mongodb - [Download](https://www.mongodb.com/download-center/community) .

### Instalação
```
git clone https://github.com/henriquecavalcante/dbc.git
cd dbc
cp .env.example .env
yarn
yarn start (modo desenvolvimento)
```
### Docker Build
```
git clone https://github.com/henriquecavalcante/dbc.git
cd dbc
cp .env.example .env
docker-compose up -d
```

### Créditos
* API de cotação de moedas - [Página oficial](https://docs.awesomeapi.com.br/api-de-moedas) .