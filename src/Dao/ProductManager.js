import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const productsInFile = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(productsInFile);
    } else {
      return [];
    }
  };

  getProductById = async (id) => {
    const productsInFile = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productsInFile);
    const findProduct = products.find((p) => p.id === id);
    if (findProduct) {
      return findProduct;
    } else {
      return [];
    }
  };

  addProducts = async (product) => {
    const productsInFileAsk = await this.getProducts();
    const id = this.#generateID(productsInFileAsk);
    const newProducts = { id, ...product };
    productsInFileAsk.push(newProducts);
    await fs.promises.writeFile(this.path, JSON.stringify(productsInFileAsk));
    return newProducts;
  };

  updateProduct = async (id, obj) => {
    const productsFile = await this.getProducts();
    const product = productsFile.find((p) => p.id === id);
    if (!product) {
      return "Product doesn't exist";
    } else {
      const updateProduct = { ...product, ...obj };
      const productIndex = productsFile.findIndex((p) => p.id === id);
      productsFile.splice(productIndex, 1, updateProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
      return "Product updated";
    }
  };

  deleteProducts = async () => {
    if (fs.existsSync(this.path)) {
      await fs.promises.unlink(this.path);
      return "Delete products";
    } else {
      return "Non-existent file";
    }
  };

  deleteProductsById = async (id) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return "Product doesn't exist";
    } else {
      products.splice(productIndex, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return "Product deleted";
    }
  };

  #generateID = (product) => {
    let id;
    if (product.length === 0) {
      id = 1;
    } else {
      id = product[product.length - 1].id + 1;
    }
    return id;
  };
}

export default ProductManager;

//Products para llenar el Thunder Client
// const product1 = {
//   title: "jeans",
//   description: "blue jeans medium",
//   category: "summer",
//   price: 30,
//   thumbnail: [],
//   code: "ABC0001",
//   stock: 10,
//   status: true,
// };
// const product2 = {
//   title: "shirt",
//   description: "white shirt medium",
//   category: "summer",
//   price: 20,
//   thumbnail: [],
//   code: "ABC0002",
//   stock: 7,
//   status: true,
// };
// const product3 = {
//   title: "shoes",
//   description: "black shoes 41",
//   category: "summer",
//   price: 22,
//   thumbnail: [],
//   code: "ABC0003",
//   stock: 15,
//   status: true,
// };
// const product4 = {
//   title: "boots",
//   description: "white boots",
//   category: "winter",
//   price: 23,
//   thumbnail: [],
//   code: "ABC0004",
//   stock: 10,
//   status: true,
// };
// const product5 = {
//   title: "belt",
//   description: "red belt 1m",
//   category: "summer",
//   price: 7,
//   thumbnail: [],
//   code: "ABC0005",
//   stock: 5,
//   status: true,
// };
// const product6 = {
//   title: "dress",
//   description: "pink beautifull dress",
//   category: "summer",
//   price: 12,
//   thumbnail: [],
//   code: "ABC0006",
//   stock: 3,
//   status: true,
// };
// const product7 = {
//   title: "jacket",
//   description: "black and white jacket",
//   category: "summer",
//   price: 25,
//   thumbnail: [],
//   code: "ABC0007",
//   stock: 7,
//   status: true,
// };
// const product8 = {
//   title: "hat",
//   description: "sun hat brown",
//   category: "winter",
//   price: 6,
//   thumbnail: [],
//   code: "ABC0008",
//   stock: 12,
//   status: true,
// };
// const product9 = {
//   title: "gloves",
//   description: "large gloves",
//   category: "winter",
//   price: 3,
//   thumbnail: [],
//   code: "ABC0009",
//   stock: 20,
//   status: true,
// };
// const product10 = {
//   title: "gloves",
//   description: "medium black gloves",
//   price: 7,
//   thumbnail: [],
//   code: "ABC00010",
//   stock: 15,
//   status: true,
// };
