import mongoose from 'mongoose';

var subSchema = mongoose.Schema(
  {
    product: mongoose.SchemaTypes.ObjectId,
    quantity: Number,
  },
  { _id: false }
);

const cartsSchema = new mongoose.Schema({
  products: [subSchema],
});

export const cartModel = mongoose.model('Carts', cartsSchema);
