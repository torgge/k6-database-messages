# k6-database-messages
POC - To proof XK6 libraries to use some protocols 


# k6-database-messages
POC - To proof XK6 libraries to use some protocols 

```mermaid

flowchart TD
    subgraph Test Runner
        K6["k6 (xk6 extensions)"]
    end

    subgraph Messaging
        RabbitMQ[RabbitMQ]
        Kafka[Kafka]
    end

    subgraph Database
        Postgres[PostgreSQL]
    end

    K6 -- AMQP/xk6-amqp --> RabbitMQ
    K6 -- Kafka/xk6-kafka --> Kafka
    K6 -- SQL/xk6-sql --> Postgres

    RabbitMQ -.->|Depends On| K6
    Kafka -.->|Depends On| K6
    Postgres -.->|Depends On| K6

```mermaid