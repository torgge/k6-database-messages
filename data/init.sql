-- data/init.sql
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES ('Laptop', 1200.00);
INSERT INTO products (name, price) VALUES ('Mouse', 25.50);
INSERT INTO products (name, price) VALUES ('Keyboard', 75.00);