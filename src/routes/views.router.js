import { Router } from 'express';
import ProductManager from '../Dao/ProductManager.js';
import { __dirname } from '../utils.js';

const path = __dirname + '/products.json';

const router = Router();

const productManager = new ProductManager(path);

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    console.log(error);
    res.status(500).json('product search error');
  }
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

router.get('/chat', async (req, res) => {
  res.render('chat');
});

export default router;
