import { Router } from 'express';
//import ProductManager from '../Dao/ProductManager.js';
import ProductManager from '../Dao/ProductManagerMongo.js';
import { __dirname } from '../utils.js';

const path = __dirname + '/products.json';

const router = Router();

const productManager = new ProductManager(path);

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (!limit) {
      res.status(201).json({ products });
    } else {
      let newLimit = parseInt(req.query.limit);
      const filterProducts = products.filter((p) => p.id <= newLimit);
      res.json({ filterProducts });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('product search error');
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (!product) {
      res.json({ message: 'Product does not exist' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Product search error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const newProduct = await productManager.addProducts(obj);
    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (error) {
    console.error(err);
    res.status(400).json({ error: 'It was not possible to add the product' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const obj = req.body;
    const product = await productManager.updateProduct(pid, obj);
    res.status(201).json({ product });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Error updating the product' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const response = await productManager.deleteProducts();
    res.status(201).json({ response });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'It was not possible to delete the products' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const products = await productManager.deleteProductsById(pid);
    res.status(201).json({ products });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'It was not possible to delete the product' });
  }
});

export default router;
