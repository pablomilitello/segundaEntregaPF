import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import './db/dbConfig.js';

import ProductManager from '../src/Dao/ProductManager.js';
const path = __dirname + '/products.json';
const productManager = new ProductManager(path);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);

const PORT = 8080;

//Configuro el SocketServer
const httpServer = app.listen(PORT, () => console.log(`Listen in port ${PORT}`));

const messages = [];

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log(`Client conected id: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconected id: ${socket.id}`);
  });

  socket.on('addNewProduct', async (product) => {
    await productManager.addProducts(product);
  });

  socket.on('deleteProduct', (id) => {
    console.log(`Product deleted ${id}`);
    productManager.deleteProductsById(id);
  });

  socket.on('message', (info) => {
    messages.push(info);
    socketServer.emit('chat', messages);
  });

  socket.on('newUser', (newUser) => {
    socket.broadcast.emit('broadcastChat', newUser);
    socketServer.emit('chat', messages);
  });
});
