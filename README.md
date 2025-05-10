# Desafio Studio Ghibli

## Descrição do Projeto

O projeto **Desafio Studio Ghibli** foi criado para exibir informações detalhadas sobre os filmes do Studio Ghibli. Ele inclui funcionalidades como filtros, ordenação, marcação de filmes como favoritos ou assistidos, e é responsivo. Além disso, foram implementados toasts para ações do usuário e testes unitários para garantir a qualidade do código.

Todos os requisitos propostos foram concluídos com sucesso:

* Exibição das informações do filme.
* Filtros para buscar filmes por critérios específicos.
* Ordenação dos filmes.
* Marcação de filmes como favoritos ou assistidos.
* Design responsivo.
* Toasts de notificação para ações do usuário.
* Testes unitários utilizando **Vitest**.

O projeto consome informações dos filmes do Studio Ghibli por meio da API pública:
[https://ghibliapi.vercel.app/#tag/Films](https://ghibliapi.vercel.app/#tag/Films)

---

## Dependências Utilizadas

* **React**: Biblioteca principal para criação de interfaces.
* **React Router DOM**: Gerenciamento de rotas.
* **Tailwind CSS**: Estilização com classes utilitárias.
* **Shadcn/UI**: Componentes acessíveis e prontos para uso.
* **Tanstack React Query**: Gerenciamento de dados assíncronos e cache.
* **Axios**: Realização de requisições HTTP.
* **Zustand**: Gerenciamento de estado leve.
* **Sonner**: Exibição de notificações.
* **Lucide React**: Biblioteca de ícones customizáveis.
* **Vitest**: Framework para testes unitários.

---

## Pré-requisitos para Rodar o Projeto

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

* Node.js (versão 18 ou superior).
* NPM ou Yarn.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/desafio-studio-ghibli.git
   ```
2. Entre no diretório do projeto:

   ```bash
   cd desafio-studio-ghibli
   ```
3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

### Rodando o Projeto

1. Para rodar o projeto no ambiente de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```
2. Para gerar o build do projeto:

   ```bash
   npm run build
   # ou
   yarn build
   ```
3. Para visualizar o build:

   ```bash
   npm run preview
   # ou
   yarn preview
   ```

---

## Testes Unitários

Os testes foram implementados utilizando **Vitest** para validar as funcionalidades e garantir a qualidade do projeto.

### Como Rodar os Testes

1. Execute o seguinte comando para rodar os testes:

   ```bash
   npm run test
   # ou
   yarn test
   ```
2. A saída dos testes exibirá os resultados e eventuais erros encontrados.

---

## Funcionalidades Implementadas

* **Exibição de Informações:** Detalhes completos sobre os filmes do Studio Ghibli.
* **Filtros:** Filtragem de filmes com base em diferentes critérios, como gênero ou ano de lançamento.
* **Ordenação:** Ordenação por nome, data de lançamento e outros critérios.
* **Favoritar/Assistir:** Opção de marcar filmes como favoritos ou assistidos.
* **Responsividade:** Design adaptado para diferentes tamanhos de tela.
* **Toasts:** Notificações para ações do usuário, como favoritar um filme.
* **Testes Unitários:** Cobertura de testes para validar as principais funcionalidades.

---

## Autor

Wagner Junior ([https://github.com/wagnerjunr](https://github.com/wagnerjunr))
