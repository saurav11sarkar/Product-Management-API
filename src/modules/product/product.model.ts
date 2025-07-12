import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive number"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount must be a positive number"],
      max: [100, "Discount cannot exceed 100%"],
    },
    finalPrice: {
      type: Number,
    },
    imageUrl: {
      type: [String],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["In Stock", "Stock Out"],
        message: "Status must be either 'In Stock' or 'Stock Out'",
      },
      default: "In Stock",
    },
    productCode: {
      type: String,
      required: [true, "Product code is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
