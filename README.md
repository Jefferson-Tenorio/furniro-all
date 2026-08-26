# Desafio 2 — Furniro (AWS FDE Node.js + React)

Este repositório contém o desafio 2 da Fase 2 do programa AWS FDE Node.js + React da Compass UOL AI/R. O projeto inclui duas partes principais:

- `backend/` — API RESTful em Node.js, Express, TypeScript e Prisma
- `frontend/` — aplicação React + TypeScript com Vite, Tailwind

---

<div align="center">

## 📑 Sumário / Table of Contents

**🇧🇷 [Português](#português)** &nbsp;•&nbsp; **🇺🇸 [English](#english)**

[Visão geral](#visão-geral) &nbsp;•&nbsp;
[Backend](#backend) &nbsp;•&nbsp;
[Frontend](#frontend) &nbsp;•&nbsp;
[Arquitetura](#arquitetura) &nbsp;•&nbsp;
[Autores](#autores)

[Overview](#overview) &nbsp;•&nbsp;
[Backend](#backend-1) &nbsp;•&nbsp;
[Frontend](#frontend-1) &nbsp;•&nbsp;
[Architecture](#architecture) &nbsp;•&nbsp;
[Authors](#authors)

</div>

---

## Português

## Visão geral

O desafio consiste em uma API backend e um frontend conectado, construídos para um e-commerce de móveis. O backend usa SQLite via Prisma, e o frontend consome dados pela API.

## Quick Start

Pré-requisito: [Node.js](https://nodejs.org) >= 22.

Na raiz do repositório:

```bash
npm run setup   # cria .env, instala dependências, roda migrations e seed
npm run dev     # sobe a API (:3000) e o frontend (:5173) juntos
```

Abra `http://localhost:5173` no navegador.

> Se algo parecer quebrado no seu ambiente, rode `npm run doctor` para diagnosticar.

### Comandos úteis

| Comando             | O que faz                                                        |
| ------------------- | ---------------------------------------------------------------- |
| `npm run setup`     | Prepara o projeto do zero (env, dependências, migrations, seed)  |
| `npm run dev`       | Sobe backend e frontend juntos                                   |
| `npm run doctor`    | Verifica se o ambiente está correto                              |
| `npm run check`     | Lint + typecheck + testes + build dos dois lados                 |
| `npm run db:reset`  | Dropa o banco, reaplica migrations e roda o seed                 |
| `npm run db:seed`   | Popula o banco com produtos e usuários de teste                  |
| `npm run clean`     | Remove `node_modules`, `dist` e `coverage`                       |

Usuários criados pelo seed para testar login: `admin / admin123` e `user / user123`.

## Backend

### Como rodar

A forma recomendada é pela raiz (`npm run setup` + `npm run dev`). Para rodar manualmente:

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:3000
```

### Principais endpoints

- `GET /health` — status da aplicação e do banco
- `GET /products`
- `GET /products/:id`
- `GET /products/slug/:slug`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

O endpoint `GET /products` suporta filtros e paginação por meio de query params como `category`, `_page`, `_limit`, `_sort` e `_order`.

## Frontend

### Como rodar

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:5173
```


### Como rodar os testes e observar a cobertura 

```bash
npm run test:coverage 
```

Ou use `npm run check` na raiz para validar lint, tipos, testes e build de uma vez.

### Principais rotas

- `/` — Home
- `/shop` — Loja
- `/shop/:category` — Loja por categoria
- `/product/:id` — Produto por ID
- `/product/slug/:slug` — Produto por slug
- `/cart` — Carrinho

## Arquitetura

### Backend

Organizado em camadas para facilitar a manutenção:

- `src/controllers`
- `src/services`
- `src/repositories`
- `src/routes`
- `src/factories`
- `src/model`
- `src/exceptions`

### Frontend

Principais pastas:

- `src/components`
- `src/hooks`
- `src/services`
- `src/stores`
- `src/config`
- `src/types`
- `src/utils`

## Autores

- [Bruna Narciso](https://github.com/Bruna-Narciso)
- [Bryan Belo](https://github.com/Badadia)
- [Gian Lucas](https://github.com/gkgiann)
- [Jefferson Tenório](https://github.com/Jefferson-Tenorio)
- [Tulio Vasconcelos](https://github.com/heytulio)

---

## English

## Overview

This challenge consists of a backend API and a connected frontend built for a furniture e-commerce. The backend uses SQLite via Prisma, and the frontend consumes data either from the API.

## Quick Start

Prerequisite: [Node.js](https://nodejs.org) >= 22.

From the repository root:

```bash
npm run setup   # creates .env, installs dependencies, runs migrations and seed
npm run dev     # starts the API (:3000) and the frontend (:5173) together
```

Open `http://localhost:5173` in your browser.

> If something seems off with your environment, run `npm run doctor` to diagnose it.

### Useful commands

| Command             | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `npm run setup`     | Prepares the project from scratch (env, deps, migrations, seed) |
| `npm run dev`       | Starts backend and frontend together                            |
| `npm run doctor`    | Checks whether the environment is correct                       |
| `npm run check`     | Lint + typecheck + tests + build for both sides                 |
| `npm run db:reset`  | Drops the database, re-applies migrations and runs the seed     |
| `npm run db:seed`   | Populates the database with products and test users             |
| `npm run clean`     | Removes `node_modules`, `dist` and `coverage`                   |

Users created by the seed for login testing: `admin / admin123` and `user / user123`.

## Backend

### How to run

The recommended way is from the root (`npm run setup` + `npm run dev`). To run manually:

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

The API will be available at:

```txt
http://localhost:3000
```

### Main endpoints

- `GET /health` — application and database status
- `GET /products`
- `GET /products/:id`
- `GET /products/slug/:slug`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

The `GET /products` endpoint supports filtering and pagination through query params such as `category`, `_page`, `_limit`, `_sort`, and `_order`.

## Frontend

### How to run

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The application will be available at:

```txt
http://localhost:5173
```



### How to run Tests and see coverage

```bash
npm run test:coverage 
```

Or use `npm run check` from the root to validate lint, types, tests and build at once.

### Main routes

- `/` — Home
- `/shop` — Shop
- `/shop/:category` — Shop by category
- `/product/:id` — Product by ID
- `/product/slug/:slug` — Product by slug
- `/cart` — Cart

## Architecture

### Backend

Organized in layers for maintainability:

- `src/controllers`
- `src/services`
- `src/repositories`
- `src/routes`
- `src/factories`
- `src/model`
- `src/exceptions`

### Frontend

Main folders:

- `src/components`
- `src/hooks`
- `src/services`
- `src/stores`
- `src/config`
- `src/types`
- `src/utils`

## Authors

- [Bruna Narciso](https://github.com/Bruna-Narciso)
- [Bryan Belo](https://github.com/Badadia)
- [Gian Lucas](https://github.com/gkgiann)
- [Jefferson Tenório](https://github.com/Jefferson-Tenorio)
- [Tulio Vasconcelos](https://github.com/heytulio)
