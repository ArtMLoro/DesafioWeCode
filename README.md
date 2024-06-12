# O que você deverá fazer?

Cubo está criando o `Ice Cube` microsserviço para analisar a temperatura em certas regiões. Porém estamos com uma quantidade muito grande de dados e precisamos de uma forma de analisar esses dados de forma mais eficiente.

A cada dia recebemos um arquivo com todas as temperaturas de todas as regiões que monitoramos (`measurements.txt`).

## Precisamos que você:

-    Crie um servidor http utilizando a framework fastify.
-    Poderá utilizar javascript/typescript/jsdoc.
-    Não poderá utilizar pacotes ou livrarias de terceiros para realizar a análise dos dados.

### Deverá possuir as rotas:

1. `/` - Deve retornar um agregado de todas as estações com a: média, máximo, mínimo e moda das temperaturas. Deverá ser ordenado alfabeticamente pelo nome da estação.
2. `/station/{{nome}}` - Deverá retornar todas as instâncias da estação com o nome informado. Com os cálculos realizados.
3. `/temperatura/{{temperatura}}` - Deve retornar todas as estações em que o número se enquadra no intervalo. Sem nomes duplicados.

# O que será avaliado?

A avaliação não será exclusivamente baseada na solução. Queremos saber de como você solucionaria este problema, quais conhecimentos que você possui e qual a sua forma de pensar.

# Como Instalar

1. Clone o repositório

```bash
https://github.com/Cubo-Midia/Teste_backend_estagio.git
```

2. Instale as dependências
```bash
npm install
```
3. Rode o projeto
```bash
npm run dev
```
4. Quando finalizado, o repositório deverá ser enviado no link [Neste Link](https://docs.google.com/forms/d/e/1FAIpQLSfCNCVBEOjP0fdpArcFgZt3eP2QYvB635jP2VcditZ9nRLOMA/viewform).

# **IMPORTANTE:** O projeto deverá ser entregue até dia 17/06

#### Obs:

Caso alguma mudança no arquivo `measurements.txt`. poderá utilizar o comando npm `run build` para ter o arquivo gerado novamente.

