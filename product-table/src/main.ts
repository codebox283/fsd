// src/main.ts

import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

let products: Product[] = [];

const productTable = document.getElementById('product-table') as HTMLTableElement;
const addButton = document.getElementById('add') as HTMLButtonElement;
const deleteButton = document.getElementById('delete') as HTMLButtonElement;

const fetchProducts = async () => {
  try {
    const response = await axios.get<Product[]>('http://localhost:3000/products');
    products = response.data;
    renderTable();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const renderTable = () => {
  const tbody = productTable.querySelector('tbody')!;
  tbody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
    `;
    tbody.appendChild(row);
  });
};

const addProduct = () => {
  const newProduct: Product = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name: `Product ${products.length + 1}`,
    price: Math.floor(Math.random() * 100) + 1
  };
  products.push(newProduct);
  renderTable();
};

const deleteProduct = () => {
  products.pop();
  renderTable();
};

addButton.addEventListener('click', addProduct);
deleteButton.addEventListener('click', deleteProduct);

fetchProducts();
