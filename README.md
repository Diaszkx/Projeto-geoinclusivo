# GeoInclusivo — execução simplificada

Projeto completo em **uma única pasta**, com React (interface), Express (API) e SQLite (banco de dados).

## Como executar no localhost

1. Instale **Node.js 20 ou superior** (recomendado: versão LTS).
2. Extraia este ZIP e abra a pasta `GeoInclusivo_Facil_Execucao` no VS Code.
3. Abra **um único terminal** na raiz do projeto e execute:

```bash
npm install
npm start
```

4. Abra **http://localhost:5173** no navegador.

O primeiro `npm install` instala as dependências do backend e frontend automaticamente. O `npm start` cria e popula o banco SQLite na primeira execução, inicia o backend na porta **3000** e o frontend na **5173**. Nas próximas vezes, basta executar `npm start`.

Para encerrar: **Ctrl+C** no terminal.

## Estrutura

```text
GeoInclusivo_Facil_Execucao/
├── package.json        # Comandos únicos para o projeto inteiro
├── scripts/iniciar.js  # Inicia banco (se necessário), API e interface
├── frontend/           # React, telas, estilos e acessibilidade
└── backend/            # Express, rotas, regras e SQLite
```

## Solução de problemas

- **npm não reconhecido:** instale Node.js e reabra o terminal.
- **Porta 3000 ou 5173 ocupada:** encerre a aplicação anterior que usa essa porta.
- **Erro de instalação do sqlite3:** use Node.js LTS e execute `npm install` novamente.
- **Interface sem perguntas:** verifique se a API responde em http://localhost:3000/api/health.
- **Banco já existente:** o início automático não apaga dados nem repete o seed.

> Os arquivos do frontend e backend foram preservados; a mudança principal foi centralizar a instalação e inicialização na raiz do projeto.
