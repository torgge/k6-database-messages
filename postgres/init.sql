-- data/init.sql
CREATE TABLE IF NOT EXISTS products (
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    sku VARCHAR(5) NOT NULL UNIQUE,
    PRIMARY KEY (sku)
);

INSERT INTO products (name, price, sku) VALUES ('Laptop', 1200.00, '00001');
INSERT INTO products (name, price, sku) VALUES ('Mouse', 25.50, '00002');
INSERT INTO products (name, price, sku) VALUES ('Keyboard', 75.00, '00003');
INSERT INTO products (name, price, sku) VALUES ('Monitor', 300.00, '00004');
INSERT INTO products (name, price, sku) VALUES ('Desk Chair', 150.00, '00005');
INSERT INTO products (name, price, sku) VALUES ('USB Cable', 10.99, '00006');
INSERT INTO products (name, price, sku) VALUES ('Webcam', 89.99, '00007');
INSERT INTO products (name, price, sku) VALUES ('External Hard Drive', 120.00, '00008');
INSERT INTO products (name, price, sku) VALUES ('Smartphone', 800.00, '00009');
INSERT INTO products (name, price, sku) VALUES ('Tablet', 450.00, '00010');
INSERT INTO products (name, price, sku) VALUES ('Printer', 200.00, '00011');
INSERT INTO products (name, price, sku) VALUES ('Speakers', 60.00, '00012');
INSERT INTO products (name, price, sku) VALUES ('Router', 55.00, '00013');
INSERT INTO products (name, price, sku) VALUES ('Microphone', 110.00, '00014');
INSERT INTO products (name, price, sku) VALUES ('Graphics Card', 500.00, '00015');
INSERT INTO products (name, price, sku) VALUES ('Headphones', 85.00, '00016');
INSERT INTO products (name, price, sku) VALUES ('Laptop Stand', 40.00, '00017');
INSERT INTO products (name, price, sku) VALUES ('Docking Station', 130.00, '00018');
INSERT INTO products (name, price, sku) VALUES ('Projector', 600.00, '00019');
INSERT INTO products (name, price, sku) VALUES ('Power Bank', 35.00, '00020');
INSERT INTO products (name, price, sku) VALUES ('Smartwatch', 250.00, '00021');
INSERT INTO products (name, price, sku) VALUES ('Bluetooth Adapter', 18.00, '00022');
INSERT INTO products (name, price, sku) VALUES ('SSD Drive', 150.00, '00023');
INSERT INTO products (name, price, sku) VALUES ('RAM Module', 90.00, '00024');
INSERT INTO products (name, price, sku) VALUES ('Desktop Computer', 950.00, '00025');
INSERT INTO products (name, price, sku) VALUES ('Ergonomic Mouse', 45.00, '00026');
INSERT INTO products (name, price, sku) VALUES ('Laser Pointer', 22.00, '00027');
INSERT INTO products (name, price, sku) VALUES ('Surge Protector', 28.00, '00028');
INSERT INTO products (name, price, sku) VALUES ('HDMI Cable', 12.50, '00029');
INSERT INTO products (name, price, sku) VALUES ('Wireless Charger', 32.00, '00030');

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO clients (id, name, email) VALUES (1, 'Alice Johnson', 'alice.johnson@example.com');
INSERT INTO clients (id, name, email) VALUES (2, 'Bob Smith', 'bob.smith@example.com');
INSERT INTO clients (id, name, email) VALUES (3, 'Carol Lee', 'carol.lee@example.com');
INSERT INTO clients (id, name, email) VALUES (4, 'David Kim', 'david.kim@example.com');
INSERT INTO clients (id, name, email) VALUES (5, 'Eva Brown', 'eva.brown@example.com');
INSERT INTO clients (id, name, email) VALUES (6, 'Frank Miller', 'frank.miller@example.com');
INSERT INTO clients (id, name, email) VALUES (7, 'Grace Turner', 'grace.turner@example.com');
INSERT INTO clients (id, name, email) VALUES (8, 'Henry Clark', 'henry.clark@example.com');
INSERT INTO clients (id, name, email) VALUES (9, 'Ivy Scott', 'ivy.scott@example.com');
INSERT INTO clients (id, name, email) VALUES (10, 'Jack Wilson', 'jack.wilson@example.com');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- 200 sample inserts for orders table
INSERT INTO orders (id, client_id, order_date) VALUES (1, 1, '2024-06-01 10:00:00');
INSERT INTO orders (id, client_id, order_date) VALUES (2, 2, '2024-06-01 10:05:00');
INSERT INTO orders (id, client_id, order_date) VALUES (3, 3, '2024-06-01 10:10:00');
INSERT INTO orders (id, client_id, order_date) VALUES (4, 4, '2024-06-01 10:15:00');
INSERT INTO orders (id, client_id, order_date) VALUES (5, 5, '2024-06-01 10:20:00');
INSERT INTO orders (id, client_id, order_date) VALUES (6, 6, '2024-06-01 10:25:00');
INSERT INTO orders (id, client_id, order_date) VALUES (7, 7, '2024-06-01 10:30:00');
INSERT INTO orders (id, client_id, order_date) VALUES (8, 8, '2024-06-01 10:35:00');
INSERT INTO orders (id, client_id, order_date) VALUES (9, 9, '2024-06-01 10:40:00');
INSERT INTO orders (id, client_id, order_date) VALUES (10, 10, '2024-06-01 10:45:00');
INSERT INTO orders (id, client_id, order_date) VALUES (11, 1, '2024-06-01 10:50:00');
INSERT INTO orders (id, client_id, order_date) VALUES (12, 2, '2024-06-01 10:55:00');
INSERT INTO orders (id, client_id, order_date) VALUES (13, 3, '2024-06-01 11:00:00');
INSERT INTO orders (id, client_id, order_date) VALUES (14, 4, '2024-06-01 11:05:00');
INSERT INTO orders (id, client_id, order_date) VALUES (15, 5, '2024-06-01 11:10:00');
INSERT INTO orders (id, client_id, order_date) VALUES (16, 6, '2024-06-01 11:15:00');
INSERT INTO orders (id, client_id, order_date) VALUES (17, 7, '2024-06-01 11:20:00');
INSERT INTO orders (id, client_id, order_date) VALUES (18, 8, '2024-06-01 11:25:00');
INSERT INTO orders (id, client_id, order_date) VALUES (19, 9, '2024-06-01 11:30:00');
INSERT INTO orders (id, client_id, order_date) VALUES (20, 10, '2024-06-01 11:35:00');
INSERT INTO orders (id, client_id, order_date) VALUES (21, 1, '2024-06-01 11:40:00');
INSERT INTO orders (id, client_id, order_date) VALUES (22, 2, '2024-06-01 11:45:00');
INSERT INTO orders (id, client_id, order_date) VALUES (23, 3, '2024-06-01 11:50:00');
INSERT INTO orders (id, client_id, order_date) VALUES (24, 4, '2024-06-01 11:55:00');
INSERT INTO orders (id, client_id, order_date) VALUES (25, 5, '2024-06-01 12:00:00');
INSERT INTO orders (id, client_id, order_date) VALUES (26, 6, '2024-06-01 12:05:00');
INSERT INTO orders (id, client_id, order_date) VALUES (27, 7, '2024-06-01 12:10:00');
INSERT INTO orders (id, client_id, order_date) VALUES (28, 8, '2024-06-01 12:15:00');
INSERT INTO orders (id, client_id, order_date) VALUES (29, 9, '2024-06-01 12:20:00');
INSERT INTO orders (id, client_id, order_date) VALUES (30, 10, '2024-06-01 12:25:00');
INSERT INTO orders (id, client_id, order_date) VALUES (31, 1, '2024-06-01 12:30:00');
INSERT INTO orders (id, client_id, order_date) VALUES (32, 2, '2024-06-01 12:35:00');
INSERT INTO orders (id, client_id, order_date) VALUES (33, 3, '2024-06-01 12:40:00');
INSERT INTO orders (id, client_id, order_date) VALUES (34, 4, '2024-06-01 12:45:00');
INSERT INTO orders (id, client_id, order_date) VALUES (35, 5, '2024-06-01 12:50:00');
INSERT INTO orders (id, client_id, order_date) VALUES (36, 6, '2024-06-01 12:55:00');
INSERT INTO orders (id, client_id, order_date) VALUES (37, 7, '2024-06-01 13:00:00');
INSERT INTO orders (id, client_id, order_date) VALUES (38, 8, '2024-06-01 13:05:00');
INSERT INTO orders (id, client_id, order_date) VALUES (39, 9, '2024-06-01 13:10:00');
INSERT INTO orders (id, client_id, order_date) VALUES (40, 10, '2024-06-01 13:15:00');
INSERT INTO orders (id, client_id, order_date) VALUES (41, 1, '2024-06-01 13:20:00');
INSERT INTO orders (id, client_id, order_date) VALUES (42, 2, '2024-06-01 13:25:00');
INSERT INTO orders (id, client_id, order_date) VALUES (43, 3, '2024-06-01 13:30:00');
INSERT INTO orders (id, client_id, order_date) VALUES (44, 4, '2024-06-01 13:35:00');
INSERT INTO orders (id, client_id, order_date) VALUES (45, 5, '2024-06-01 13:40:00');
INSERT INTO orders (id, client_id, order_date) VALUES (46, 6, '2024-06-01 13:45:00');
INSERT INTO orders (id, client_id, order_date) VALUES (47, 7, '2024-06-01 13:50:00');
INSERT INTO orders (id, client_id, order_date) VALUES (48, 8, '2024-06-01 13:55:00');
INSERT INTO orders (id, client_id, order_date) VALUES (49, 9, '2024-06-01 14:00:00');
INSERT INTO orders (id, client_id, order_date) VALUES (50, 10, '2024-06-01 14:05:00');
-- ... (rest of the orders inserts) ...

CREATE TABLE IF NOT EXISTS order_items (
    order_id INTEGER NOT NULL,
    product_sku VARCHAR(5) NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_sku) REFERENCES products(sku)
);

-- Sample inserts for order_items referencing above orders and products
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (1, '00001', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (1, '00002', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (2, '00003', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (2, '00004', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (3, '00005', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (3, '00006', 3);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (4, '00007', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (4, '00008', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (5, '00009', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (5, '00010', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (6, '00011', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (6, '00012', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (7, '00013', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (7, '00014', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (8, '00015', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (8, '00016', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (9, '00017', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (9, '00018', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (10, '00019', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (10, '00020', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (11, '00021', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (11, '00022', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (12, '00023', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (12, '00024', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (13, '00025', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (13, '00026', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (14, '00027', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (14, '00028', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (15, '00029', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (15, '00030', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (16, '00001', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (16, '00003', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (17, '00005', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (17, '00007', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (18, '00009', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (18, '00011', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (19, '00013', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (19, '00015', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (20, '00017', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (20, '00019', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (21, '00021', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (21, '00023', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (22, '00025', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (22, '00027', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (23, '00029', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (23, '00002', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (24, '00004', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (24, '00006', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (25, '00008', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (25, '00010', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (26, '00012', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (26, '00014', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (27, '00016', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (27, '00018', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (28, '00020', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (28, '00022', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (29, '00024', 2);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (29, '00026', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (30, '00028', 1);
INSERT INTO order_items (order_id, product_sku, quantity) VALUES (30, '00030', 2);
-- Add more as needed for your test data
