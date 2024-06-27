# 💻 Projeto-SOSopao
Repositório dedicado para o projeto das disciplinas de Engenharia de Software e Desenvolvimento Web.

## 💭 Objetivo

O objetivo do projeto será elaborar e desenvolver um sistema para a ONG S.O.Sopão, que funcionará como um belo cartão de visita para a instituição, visando divulgá-la. O site contará com sistema de cadastro de voluntários e login de administrador, a fim de realizar a manutenção do sistema e adicionar facilmente próximos eventos. Contará, também, com um sistema de controle de estoque, permitindo o cadastro de itens necessários para que usuários comuns possam contribuir via Pix.

## Continuidade

A continuidade desse projeto se baseia no seu aprimoramento e na implementação de novas features. A exemplo disso, temos uma melhor modularização dos componentes React, melhores verificações de segurança implementação de meios para acessibilidade e implementação de um sistema para recuperação de senhas. Sugere-se, também, o desenvolvimento completo das páginas para que usuários comuns possam conhecer e ajudar a ONG, além da integração da página "Rotas" com a API do Google Maps.

# Guia de configuração

1. Instale as dependências necessárias. O script irá instalar o React-App e Atualizar para a versão que estaremos utilizando. *Caso já tenha o React instalado, verifique se está na versão 10.5.2*.

> ./install.sh

# Guia de inicialização do Frontend

1. Acesse o diretório "sosopao-app" seguido de "src"

> cd sosopao-app/src

2. Baixe as dependências

> npm i

3. Inicialize o app.

> npm start

# Guia de inicialização do Backend

1. Acesse o diretório "Server"

> cd Server/

2. Baixe as dependências

> npm i

3. Inicialize o app (em ambiente de desenvolvimento)
Nesse modo, cada CRTL+S irá reiniciar a API.

> npm run dev

4. Inicialize o app.

> npm start

# Guia de inicialização da Object Store

1. Instale o MinIO Server no host

2. Acesse o diretório raiz do projeto

3. Inicialize o servidor MinIO

> minio server ObjectStore --console-address :9001

## Créditos

Projeto desenvolvido no curso de Ciências de Computação (ICMC/USP) no ano de 2024

Desenvolvedores: Camila Donda Ronchi, Gabriel Sousa Santos de Almeida, João Gabriel Manfré Nazar, João Pedro Mori Machado,Lucas Piovani Ferreira e Luís Henrique Giorgetti Dantas.