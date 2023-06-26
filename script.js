const express = require('express');
const app = express();
app.use(express.json());


let products = [
  { id: 1, name: 'Товар 1' },
  { id: 2, name: 'Товар 2' },
  { id: 3, name: 'Товар 3' }
];


app.get('/products', (req, res) => {
  res.json(products);
});


app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Товар не знайдено' });
  }
});


app.post('/products', (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(201).json(product);
});


app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (product) {
    product.name = req.body.name;
    res.json(product);
  } else {
    res.status(404).json({ error: 'Товар не знайдено' });
  }
});


app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ error: 'Товар не знайдено' });
  }
});


app.listen(3000, () => {
  console.log('Сервер запущено на порту 3000');
});
