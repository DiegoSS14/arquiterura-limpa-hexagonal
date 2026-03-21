# Arquitetura Limpa e Hexagonal

Este projeto é um estudo prático sobre **Arquitetura Limpa (Clean Architecture)** e **Arquitetura Hexagonal (Ports and Adapters)**.

O objetivo é demonstrar, de forma simples e aplicada, como estruturar um sistema para:

- manter o domínio independente de frameworks e detalhes de infraestrutura;
- separar responsabilidades entre regras de negócio e implementação técnica;
- facilitar testes, manutenção e evolução do código ao longo do tempo.

## O que é demonstrado neste estudo

- uso prático do padrão **Adapter** para conectar a aplicação a serviços externos;
- definição de **Ports** (interfaces) para desacoplar a camada de aplicação;
- implementação de adaptadores de infraestrutura (ex.: banco de dados e criptografia);
- aplicação de conceitos de **DDD (Domain-Driven Design)** na organização das camadas.

## Foco em DDD

A estrutura do projeto segue princípios de DDD para deixar explícitos:

- o **domínio** e suas regras de negócio;
- os **casos de uso** da aplicação;
- os contratos de entrada/saída por meio de interfaces;
- a infraestrutura como detalhe, e não como centro da solução.

## Propósito

Este repositório tem caráter educacional e serve como referência para quem deseja entender, na prática, como combinar **Clean Architecture + Hexagonal + DDD** em projetos TypeScript.
