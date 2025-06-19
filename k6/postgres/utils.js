const ORDERS = `
select orders.id, clients.name, products.sku, products.name, order_items.quantity from orders 
inner join order_items on (orders.id = order_items.order_id)
inner join products on (products.sku = order_items.product_sku)
inner join clients on (clients.id = orders.client_id);
`;

export function getOrdersQuery() {
  return ORDERS + 'order by orders.id, products.sku;';
}

export function getOrdersQueryWithLimit(limit) {
  return ORDERS + `order by orders.id limit ${limit};`;
}