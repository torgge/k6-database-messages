# Contexto do Projeto k6-database-messages

Este arquivo fornece contexto detalhado para o GitHub Copilot sobre o projeto `k6-database-messages`, com o objetivo de **otimizar a assistência e as sugestões de código** durante o desenvolvimento e a manutenção.

## 1. Visão Geral do Projeto

*   **Nome Completo do Repositório**: `torgge/k6-database-messages`
*   **Proprietário**: torgge
*   **Propósito Principal (POC)**: Este projeto é um **"Proof of Concept" (POC)**. Seu objetivo é **"provar que as bibliotecas XK6 podem usar alguns protocolos"**. Isso indica que o foco é validar a capacidade do K6 (através de extensões XK6) de interagir com diferentes protocolos de comunicação, provavelmente para fins de testes de performance e carga. O termo "database-messages" no nome sugere uma **ênfase em interações e testes com bancos de dados ou sistemas de mensageria**.

## 2. Tecnologias Chave Utilizadas

*   **Ferramenta de Teste de Performance**: **k6**. É uma ferramenta de código aberto para testes de carga e performance.
*   **Extensões/Bibliotecas**: O projeto utiliza **"bibliotecas XK6"**, que são extensões para o k6, permitindo a adição de funcionalidades e suporte a protocolos que não estão nativamente no core do k6.
*   **Linguagem de Programação**: Todo o código do projeto é escrito em **JavaScript (100.0%)**.
*   **Orquestração/Ambiente**: A presença de um **`Dockerfile.k6`** e um **`docker-compose.yaml`** indica que o projeto utiliza **Docker** e **Docker Compose** para configurar e gerenciar o ambiente de teste, incluindo o K6 e potencialmente os serviços ou bancos de dados sob teste.

## 3. Estrutura de Arquivos e Componentes Relevantes

Com base na estrutura do repositório, os seguintes arquivos e diretórios são importantes:
*   **Scripts k6**: Arquivos JavaScript que contêm os roteiros de teste de performance.
*   **`Dockerfile.k6`**: Define o ambiente Docker para executar os testes k6, provavelmente incluindo as bibliotecas XK6 necessárias.
*   **`docker-compose.yaml`**: Utilizado para orquestrar serviços, como instâncias de banco de dados ou outros serviços que os testes k6 interagem.
*   **`README.md`**: O arquivo principal de documentação do projeto, que descreve o POC e como executá-lo.
*   **`LICENSE`**: O projeto está sob a licença **MIT license**.

## 4. Objetivo ao Interagir com o Copilot

O Copilot deve ser guiado para auxiliar nas seguintes áreas:

*   **Desenvolvimento de Scripts K6**: Ajuda na escrita, refatoração e otimização de **scripts JavaScript para k6**, focando na implementação de testes de performance para diversos protocolos através das bibliotecas XK6.
*   **Interação com Protocolos**: Sugestões e exemplos para **testar protocolos específicos**, como aqueles usados para comunicação com bancos de dados (`database-messages`), filas de mensagens ou APIs.
*   **Configuração de Ambiente**: Orientação para **configurar e gerenciar o ambiente de teste** usando `Dockerfile.k6` e `docker-compose.yaml`, incluindo a instalação e uso de bibliotecas XK6.
*   **Melhoria da Documentação**: Auxílio na **criação e atualização de documentação** no `README.md` que explique o POC, os testes implementados e os resultados.
*   **Debugging e Otimização**: Suporte na identificação e resolução de problemas (debugging) em scripts k6 e na otimização da performance dos próprios testes.

Este `context.md` visa fornecer ao GitHub Copilot uma compreensão aprofundada do propósito, das tecnologias e da estrutura do projeto `k6-database-messages`, permitindo um suporte mais preciso e relevante.