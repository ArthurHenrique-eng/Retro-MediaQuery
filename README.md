# Retro-MidiaQuery

Versão responsiva do projeto **Retro Discos**, desenvolvida para demonstrar o uso de **HTML semântico** e **Media Queries em CSS**.

## Objetivo

O site apresenta um catálogo expositivo de discos de vinil, organizado por gêneros musicais, com imagens ilustrativas, preços estimados e contato direto com a loja pelo WhatsApp.

## HTML semântico

A estrutura utiliza tags semânticas para deixar o conteúdo mais organizado, acessível e compreensível:

- `<header>` para cabeçalhos da página e das seções;
- `<nav>` para navegação principal e filtros de gêneros;
- `<main>` para o conteúdo principal;
- `<section>` para separar as áreas do site;
- `<article>` para conteúdos independentes e cards de produtos;
- `<figure>` e `<figcaption>` para imagens com descrição;
- `<form>` para a busca no catálogo;
- `<aside>` para mensagens auxiliares;
- `<footer>` para informações complementares e rodapé;
- `<address>` para o endereço da loja.

## Responsividade com Media Query

A responsividade está implementada em `css/style.css` utilizando `@media`.

Breakpoints principais:

- até **1080px**: notebooks menores e tablets em paisagem;
- até **860px**: tablets e dispositivos médios;
- até **700px**: tablets pequenos e celulares grandes;
- até **500px**: celulares;
- até **360px**: celulares muito estreitos;
- a partir de **1500px**: monitores grandes.

Também existe uma Media Query de acessibilidade com `prefers-reduced-motion`.

## Tecnologias

- HTML5
- CSS3
- JavaScript

## Estrutura

```text
Retro-MidiaQuery/
├── assets/
│   └── logo.svg
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Execução

Abra o arquivo `index.html` diretamente no navegador ou utilize a extensão Live Server no VS Code.

---

Projeto acadêmico desenvolvido por Arthur Henrique.
