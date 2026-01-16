# Pokédex App

## Descrição

Este projeto consiste em uma aplicação web de Pokédex desenvolvida em React, cujo objetivo é consumir a PokeAPI e apresentar informações detalhadas sobre Pokémon de forma visualmente organizada e intuitiva. A aplicação foi construída com foco em componentização, reutilização de lógica através de hooks customizados e cuidado com UI/UX, utilizando o Material UI como base de estilização.

---

## Funcionalidades

- Listagem de Pokémon em layout responsivo
- Navegação para página de detalhes via React Router
- Abas de conteúdo (About, Stats e Evolution)
- Estilização dinâmica baseada no tipo do Pokémon
- Consumo e normalização de dados da PokeAPI
- Organização de dados com hooks customizados
- Interface preparada para expansão futura

---

## Página de Lista de Pokémon

A aplicação exibe uma lista de Pokémon em formato de cards. Cada card apresenta informações básicas como nome, número e imagem oficial do Pokémon. A cor de fundo do card é definida dinamicamente de acordo com o tipo do Pokémon, tornando a identificação visual mais intuitiva.

O layout é totalmente responsivo e se adapta a diferentes tamanhos de tela, garantindo uma boa experiência tanto em dispositivos móveis quanto em desktops.

---

## Página de Detalhes do Pokémon

Ao selecionar um Pokémon, o usuário é direcionado para uma página de detalhes contendo informações completas, organizadas em abas para facilitar a leitura.

### Aba About

A aba **About** apresenta uma descrição textual do Pokémon (flavor text), obtida a partir do endpoint de Pokémon Species. Além disso, são exibidas informações físicas e biológicas, como:

- Altura e peso
- Tipos
- Habilidades (incluindo habilidades ocultas)
- Fraquezas
- Dados de treinamento

Os dados de treinamento incluem:
- EV Yield
- Catch Rate
- Base Friendship
- Base Experience
- Growth Rate

---

### Aba Stats

A aba **Stats** exibe os atributos base do Pokémon, como:

- HP
- Attack
- Defense
- Special Attack
- Special Defense
- Speed

Os valores são apresentados de forma numérica e também visual, por meio de barras proporcionais, facilitando a comparação entre atributos. A estrutura da aplicação já está preparada para suportar cálculos de valores mínimos e máximos dos stats, mesmo que esses dados não sejam fornecidos diretamente pela PokeAPI.

---

### Aba Evolution

A aba **Evolution** foi estruturada para exibir a cadeia evolutiva do Pokémon, utilizando o endpoint de `evolution-chain` da PokeAPI. Embora a implementação completa ainda esteja em desenvolvimento, a arquitetura do projeto já considera essa funcionalidade.

---

## Sistema de Cores

O projeto utiliza um sistema de cores dinâmico baseado nos tipos dos Pokémon. Cada tipo — como Fire, Water, Grass, Electric, Dragon, Fairy, entre outros — possui um esquema de cores próprio.

Essas cores são aplicadas em diversos elementos da interface, como:
- Cards de Pokémon
- Cabeçalho da página de detalhes
- Barras de status
- Indicadores de efetividade de tipo

Esse sistema contribui para uma experiência visual consistente e alinhada ao universo Pokémon.

---

## Consumo da PokeAPI

A aplicação consome múltiplos endpoints da PokeAPI, incluindo:

- `/pokemon`
- `/pokemon-species`
- `/type`
- `/evolution-chain`

Para evitar lógica duplicada e espalhada pelos componentes, as requisições e o tratamento dos dados são centralizados em hooks customizados, como o `usePokemon`, responsável por gerenciar estados de carregamento, erros e normalização dos dados recebidos.

---

## Estrutura do Projeto

O projeto é organizado em pastas bem definidas, separando responsabilidades de forma clara:

- **components**: componentes reutilizáveis da interface
- **pages**: páginas principais da aplicação
- **hooks**: hooks customizados para lógica de dados
- **domain**: regras de negócio e mapeamentos (cores, tipos, etc.)
- **services**: camada de comunicação com a PokeAPI
- **assets**: fontes, imagens e outros recursos estáticos

---

## Tipografia

A aplicação utiliza a fonte **SF Pro Display**, carregada localmente por meio de `@font-face`. Essa fonte é aplicada globalmente para manter consistência visual.

> ⚠️ Observação: a SF Pro Display é uma fonte proprietária da Apple. Para uso comercial, recomenda-se substituí-la por uma alternativa open-source.

---

## Como Executar o Projeto

Para executar o projeto localmente, siga os passos abaixo:

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto
cd pokedex-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
