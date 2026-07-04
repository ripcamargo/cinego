# CineGo

Mini aplicação React para explorar filmes populares, buscar por título e favoritar filmes, consumindo a API pública do [TMDB](https://www.themoviedb.org/).

Desenvolvido como desafio técnico para estudos.

---

## Tecnologias utilizadas

- **React** + **TypeScript**
- **Vite** (build tool)
- **React Router** (roteamento entre telas)
- **Bootstrap** (grid e componentes base)
- **SCSS** (estilização customizada e identidade visual)
- **Context API** (gerenciamento de estado dos favoritos)
- **TMDB API** (dados de filmes)

---

## Como rodar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada)
- Uma conta no [TMDB](https://www.themoviedb.org/) com uma API Key gerada

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/ripcamargo/cinego.git
cd cinego
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com sua chave da API do TMDB:
```
VITE_TMDB_API_KEY=sua_chave_aqui
```

4. Rode o projeto:
```bash
npm run dev
```

5. Acesse `http://localhost:5173` no navegador.

---

## Estrutura de pastas

```
src/
├── assets/          # imagens e logo do projeto
├── components/      # componentes reutilizáveis (MovieCard, Navbar)
├── contexts/         # FavoritesContext (estado global de favoritos)
├── pages/           # telas da aplicação (Home, MovieDetail, Favorites)
├── services/         # camada de chamadas à API do TMDB
├── styles/           # variáveis e estilos SCSS globais
├── types/            # interfaces TypeScript (Movie, Genre, MovieDetail)
├── App.tsx           # definição das rotas
└── main.tsx
```

A separação entre `pages` e `components` segue a lógica de que `pages` representa uma tela inteira associada a uma rota, enquanto `components` são peças reutilizáveis usadas dentro de várias telas (o `MovieCard`, por exemplo, aparece tanto na Home quanto em Favoritos).

---

## Decisões técnicas

**Gerenciamento de estado dos favoritos via Context API.**
A lista de favoritos precisa ser lida e alterada por telas diferentes (Detalhe favorita, Favoritos lista) que não têm relação direta de pai/filho entre si, já que são renderizadas via rotas. A Context API resolve esse problema de estado compartilhado sem a complexidade de uma biblioteca externa como Redux, que seria mais complexa para a necessidade e finalidade deste projeto.

**Camada de serviço separada (`services/tmdb.ts`).**
Todas as chamadas à API do TMDB foram centralizadas em um único arquivo, com uma função dedicada para cada operação (`getPopularMovies`, `searchMovies`, `getMovieById`). Isso mantém os componentes focados em UI, facilita eventuais mudanças na API (um único lugar para ajustar) e evita duplicação de lógica de fetch.

**Tipagem com `interface` e herança (`extends`).**
A resposta de listagem de filmes do TMDB (`/movie/popular`, `/search/movie`) e a de detalhe (`/movie/{id}`) têm formatos diferentes — a de detalhe inclui campos extras como `overview` e `genres`. Em vez de duplicar campos, criei a interface `MovieDetail` estendendo `Movie`, mantendo a tipagem enxuta e sem repetição.

**Busca em tempo real (enquanto o usuário digita).**
A busca por título é feita via API a cada alteração do campo de texto, usando `useEffect` com `query` como dependência. Quando o campo está vazio, o mesmo efeito busca os filmes populares — o que permitiu unificar a lógica de carregamento inicial e de busca em um único `useEffect`. Apesar desse tipo de utilização consumir mais requisições de API, torna também a busca mais dinâmica.

**Persistência de favoritos em `localStorage`.**
O `FavoritesContext` sincroniza a lista de favoritos com o `localStorage` sempre que ela muda, e carrega esse valor na inicialização, garantindo que os favoritos sobrevivam a um recarregamento de página.


**Identidade visual customizada.**
O tema escuro e a paleta de cores (roxo/azul) foram construídos em SCSS a partir das cores extraídas da logo do projeto, criado de maneira fictícia, com componentes do Bootstrap (`card`, `navbar`, `form-control`) sobrescritos para manter consistência visual com a marca.

**Imagem padrão para filmes sem cartaz.**
Alguns filmes retornados pela API não possuem `poster_path` preenchido. Para evitar que a imagem quebre visualmente, o `MovieCard` (e o `MovieDetail`) verificam se esse campo existe antes de montar a URL: caso não exista, é exibida uma imagem padrão fictícia indicando "Filme Sem Cartaz".

**Altura consistente nos cards da grid.**
Filmes com títulos de tamanhos muito diferentes faziam os cards da listagem ficarem com alturas desiguais, quebrando o alinhamento visual da grid. Para resolver isso, apliquei `h-100` (Bootstrap) nos cards para que todos ocupem a altura total da coluna, e usei `-webkit-line-clamp` no título para limitar a exibição a duas linhas, cortando o excesso com reticências. Isso garante que todos os cards de uma mesma linha fiquem com a mesma altura, independentemente do tamanho do título do filme.

---

## Funcionalidades implementadas

- [x] Listagem dos filmes populares ao carregar a página
- [x] Cards com poster, título e nota
- [x] Busca por título (via API, em tempo real)
- [x] Navegação para tela de detalhe ao clicar no card
- [x] Tela de detalhe com poster, título, sinopse, nota e gêneros
- [x] Botão de adicionar/remover dos favoritos
- [x] Botão de voltar para a listagem
- [x] Listagem de favoritos com mensagem para lista vazia
- [x] Persistência de favoritos em `localStorage`
- [x] Navbar fixa e responsiva para navegação entre telas

## Melhorias futuras
- O campo de busca atualmente faz a requisição à API a cada letra digitada para realizar a busca dos filmes. Como sugestão, poderá começar a buscar somente a partir da terceira letra e aguardar uma pausa de 2 segundos após o usuário parar de digitar.

- Criar um simples componente de loading ou tela de carregamento antes de carregar todos os cartazes, pois há um pequeno gargalo na primeira consulta dos filmes.
