# Discord Lookup API

Este projeto foi migrado para TypeScript e reorganizado em subpastas para facilitar manutenção, testes e evolução do código.

## Contexto

O objetivo original era consultar informações de um usuário do Discord utilizando a API pública de `discord.id`, resolvendo um desafio criptográfico e enviando um `proof` válido junto com o `discord_id` e o `token` do bot para a rota de lookup.

A lógica principal faz três coisas:

1. Busca o desafio no endpoint `https://backend.discord.id/challenge`
2. Resolve o número relacionado ao desafio usando SHA-256 e o salt recebido
3. Envia a prova gerada para `https://backend.discord.id/lookup`

Essa implementação foi reescrita em TypeScript para deixar o projeto mais modular, legível e fácil de expandir.

## Estrutura do projeto

```text
Discord-Lookup-API/
├─ src/
│  ├─ config/
│  │  └─ env.ts
│  ├─ services/
│  │  ├─ challenge.ts
│  │  └─ lookup.ts
│  ├─ types/
│  │  └─ discord.ts
│  ├─ utils/
│  │  └─ crypto.ts
│  └─ index.ts
├─ .env.example
├─ .gitignore
├─ package.json
├─ tsconfig.json
├─ README.md
└─ .env
```

## Requisitos

- Node.js 20+
- npm

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com os seguintes valores:

```env
DISCORD_ID=ID_DO_DISCORD_DA_PESSOA
DISCORD_TOKEN=SEU_TOKEN_DO_BOT
```

Também existe um exemplo pronto em `.env.example`.

## Execução

```bash
npm run dev
```

Ou, para buildar e rodar em produção:

```bash
npm run build
npm run start
```

## Como funciona a busca

A aplicação executa o fluxo abaixo:

- solicita o `challenge` e o `salt` da API externa
- itera valores até encontrar o número correto com base em SHA-256
- monta uma prova (`proof`) em base64 em formato JSON
- envia a requisição POST para o endpoint de lookup
- imprime a resposta da API
