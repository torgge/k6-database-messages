# k6 Performance Testing for Kafka, PostgreSQL, and RabbitMQ

This project provides a comprehensive setup for performance testing of Kafka, PostgreSQL, and RabbitMQ using k6. It includes Docker Compose configurations for all services and k6 scripts for each system.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Services](#services)
- [k6 Scripts](#k6-scripts)
- [Running the Tests](#running-the-tests)
- [Results](#results)

## Overview

This repository is designed to serve as a proof-of-concept for using k6 with various data stores and messaging systems. It demonstrates how to use xk6 extensions to interact with Kafka, PostgreSQL, and RabbitMQ for performance testing.

The project uses Docker to orchestrate the services, making it easy to set up and tear down the testing environment.

## Project Structure

```
/Users/gbonespirito/Development/k6-database-kafka/
├───.gitignore
├───docker-compose.yaml
├───Dockerfile.k6-kafka
├───Dockerfile.k6-rabbitmq
├───LICENSE
├───package-lock.json
├───package.json
├───README.md
├───.copilot/
│   └───context.md
├───.git/...
├───k6/
│   ├───k6-script.js
│   ├───kafka/
│   │   ├───k6-kafka.js
│   │   ├───infra/
│   │   │   └───kafka-config.js
│   │   ├───results/
│   │   ├───schemas/
│   │   │   ├───order-key.avsc
│   │   │   └───order-value.avsc
│   │   └───utils/
│   │       ├───envs.js
│   │       └───utils.js
│   ├───postgres/
│   │   ├───k6-postgres.js
│   │   ├───utils.js
│   │   └───results/
│   └───rabbitmq/
│       ├───k6-rabbitmq.js
│       └───results/
├───pgadmin/
│   └───servers.json
└───postgres/
    └───init.sql
```

## Prerequisites

- Docker
- Docker Compose
- k6 (with xk6-kafka, xk6-sql, and xk6-amqp extensions)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/k6-database-kafka.git
    cd k6-database-kafka
    ```

2.  **Build and start the services:**

    ```bash
    docker-compose up -d
    ```

## Services

The `docker-compose.yaml` file defines the following services:

-   **`kafka-k6`**: Apache Kafka for message streaming.
-   **`postgres-k6`**: PostgreSQL database.
-   **`pgadmin-k6`**: Web-based administration tool for PostgreSQL.
-   **`kafka-ui-k6`**: Web UI for Kafka.
-   **`rest-proxy-k6`**: Confluent REST Proxy for Kafka.
-   **`schema-registry-k6`**: Confluent Schema Registry for Avro schemas.
-   **`rabbitmq-k6`**: RabbitMQ for message queuing.
-   **`k6-rabbitmq`**: k6 container for RabbitMQ tests.
-   **`k6-kafka`**: k6 container for Kafka tests.

## k6 Scripts

The `k6/` directory contains the following k6 test scripts:

-   **`k6/kafka/k6-kafka.js`**: A k6 script for testing Kafka with Avro messages. It produces and consumes messages from a Kafka topic.
-   **`k6/postgres/k6-postgres.js`**: A k6 script for testing PostgreSQL. It queries the `products` table.
-   **`k6/rabbitmq/k6-rabbitmq.js`**: A k6 script for testing RabbitMQ. It publishes messages to a queue.
-   **`k6/k6-script.js`**: A combined script that queries PostgreSQL and publishes the results to Kafka.

## Running the Tests

You can run the k6 tests using the following commands:

-   **Run Kafka test:**

    ```bash
    docker-compose run k6-kafka
    ```

-   **Run RabbitMQ test:**

    ```bash
    docker-compose run k6-rabbitmq
    ```

## Results

The test results are stored in the `k6/kafka/results` and `k6/rabbitmq/results` directories. The results include a summary JSON file and a detailed output file.
