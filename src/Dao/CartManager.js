import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const cartsInFile = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(cartsInFile);
    } else {
      return [];
    }
  };

  getCartById = async (id) => {
    const cartsInFile = await fs.promises.readFile(this.path, "utf-8");
    const carts = JSON.parse(cartsInFile);
    const findCart = carts.find((c) => c.id === id);
    if (findCart) {
      return findCart;
    } else {
      return [];
    }
  };

  addCarts = async () => {
    const cartsInFileAsk = await this.getCarts();
    const id = this.#generateID(cartsInFileAsk);
    const newCarts = { id: id, products: [] };
    cartsInFileAsk.push(newCarts);
    await fs.promises.writeFile(this.path, JSON.stringify(cartsInFileAsk));
    return newCarts;
  };

  addProductsToCart = async (cid, pid) => {
    const cartsInFileAsk = await this.getCarts();
    const cart = cartsInFileAsk.find((c) => c.id === cid);
    let q = 1;
    const obj = { product: pid, quantity: q };
    if (!cart) {
      return "Cart doesn't exist";
    } else {
      const product = cart.products.find((p) => p.product === pid);
      if (!product) {
        cart.products.push(obj);
        const cartIndex = cartsInFileAsk.findIndex((p) => p.id === cid);
        cartsInFileAsk.splice(cartIndex, 1, cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsInFileAsk));
        return "Product in cart";
      } else {
        product.quantity++;
        const cartIndex = cartsInFileAsk.findIndex((p) => p.id === cid);
        cartsInFileAsk.splice(cartIndex, 1, cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsInFileAsk));
        return "Product in cart";
      }
    }
  };

  #generateID = (cart) => {
    let id;
    if (cart.length === 0) {
      id = 1;
    } else {
      id = cart[cart.length - 1].id + 1;
    }
    return id;
  };
}

export default CartManager;
