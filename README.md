# Pokémon Stats Radar Chart

Este projeto busca dados da API do Pokémon, converte esses dados em objetos personalizados e exibe as estatísticas dos Pokémons em um gráfico de radar interativo usando a biblioteca ApexCharts.

## Funcionalidades

- Busca detalhes de um Pokémon específico da API.
- Converte os detalhes do Pokémon em um objeto personalizado.
- Configura e renderiza um gráfico de radar com as estatísticas do Pokémon.

## Estrutura do Código

### Função `convertPokeApiDetailToPokemon`

Esta função converte os detalhes de um Pokémon obtidos da API em um objeto `Pokemon` personalizado.

1. **Criação do Objeto Pokemon:**
   - Um novo objeto `Pokemon` é criado e suas propriedades `number` e `name` são definidas com base nos detalhes do Pokémon (`pokeDetail.id` e `pokeDetail.name`).

2. **Mapeamento dos Tipos:**
   - O array `pokeDetail.types` é mapeado para extrair os nomes dos tipos (`typeSlot.type.name`).
   - A propriedade `types` do objeto `Pokemon` é definida como o array de tipos, e a propriedade `type` é definida como o primeiro tipo do array.

3. **Mapeamento das Estatísticas:**
   - O array `pokeDetail.stats` é mapeado para criar um novo array de objetos, onde cada objeto representa uma estatística do Pokémon com seu nome (`pokeStats.stat.name`) e valor (`pokeStats.base_stat`).
   - A propriedade `stats` do objeto `Pokemon` é definida como esse novo array de estatísticas.

4. **Configuração do Gráfico de Radar:**
   - Um objeto `options` é criado para configurar o gráfico de radar usando ApexCharts.
   - As séries de dados (`series`) são definidas com os valores das estatísticas.
   - As categorias do eixo X (`xaxis.categories`) são definidas com os nomes das estatísticas, formatados com a primeira letra maiúscula.
   - Outras configurações incluem o título do gráfico, estilo das etiquetas, limites do eixo Y, opacidade do preenchimento, estilo das linhas e marcadores.

5. **Renderização do Gráfico:**
   - Um novo gráfico de radar é criado e renderizado no elemento HTML com o ID `pokemonStatsChart` usando as opções configuradas.

6. **Log das Estatísticas:**
   - O array `stats` é exibido no console do navegador para fins de depuração.

7. **Definição da Foto do Pokémon:**
   - A propriedade `photo` do objeto `Pokemon` é definida com a URL da imagem do Pokémon (`pokeDetail.sprites.other.dream_world.front_default`).

8. **Retorno do Objeto Pokemon:**
   - A função retorna o objeto `Pokemon` configurado.

### Função `pokeApi.getPokemonDetail`

Esta função recebe um objeto `pokemon` e faz uma requisição à URL do Pokémon para obter seus detalhes. A resposta da requisição é convertida para JSON e passada para a função `convertPokeApiDetailToPokemon` para criar o objeto `Pokemon` personalizado.

### Função `pokeApi.getPokemons`

Esta função faz uma requisição à API para obter uma lista de Pokémons com base no `offset` e `limit` fornecidos. A resposta da requisição é convertida para JSON e os resultados são mapeados para obter os detalhes de cada Pokémon usando a função `pokeApi.getPokemonDetail`. As requisições de detalhes são resolvidas com `Promise.all` e os detalhes dos Pokémons são retornados.

## Como Executar

1. Clone o repositório.
2. Instale as dependências necessárias.
3. Execute o projeto em um servidor local.
4. Acesse a página no navegador para visualizar o gráfico de radar com as estatísticas dos Pokémons.

## Tecnologias Utilizadas

- JavaScript
- ApexCharts
- API do Pokémon
