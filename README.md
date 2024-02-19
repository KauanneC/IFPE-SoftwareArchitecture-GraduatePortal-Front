# Documentação Técnica Front end

## Arquitetura e Stack

Este projeto está organizado usando conceitos da [arquitetura limpa](https://books.google.com.br/books/about/Arquitetura_Limpa.html?id=BOaPDwAAQBAJ&redir_esc=y)
A comunicação entre o back, front e aplicação se dá através do modelo [cliente-servidor](https://www.gta.ufrj.br/ensino/eel878/redes1-2016-1/16_1/p2p/modelo.html) fazendo uso de uma [api rest](https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api) disponibilizada pelo lado servidor da aplicação (back end).

Datalhes da stack:

- A implementação é feita usando [React](https://react.dev/) e [Next](https://nextjs.org/).
- A estilização é feita usando a biblioteca [TailwindCSS](https://tailwindcss.com/)
- As bibliotecas usadas no projeto podem ser vistas no arquivo de [dependências](https://github.com/guilhermelyare/IFPE-EngSoftware-Front/blob/main/package.json) na raiz do projeto.

## Execução do código

Primeiramente, devemos instalar as dependências do projeto:

```bash
npm install
```

E inicie o servidor rodando o seguinte comando:

```bash
npm run dev
```
