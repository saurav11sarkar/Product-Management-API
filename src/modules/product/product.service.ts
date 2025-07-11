import AppError from "../../error/appError";
import Category from "../category/category.model";
import { generateProductCode } from "./generateProductCode";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const createProduct = async (payload: IProduct) => {
  const { name, description, price, discount, imageUrl, status, category } =
    payload;

  const categoryId = await Category.findById(category);
  if (!categoryId) throw new AppError(401, "Invalid category ID");

  const productCode = generateProductCode(name);
  const exists = await Product.findOne({ productCode });
  if (exists) throw new AppError(404, "Product code already exists");

  const result = await Product.create({
    name,
    description,
    price,
    discount,
    imageUrl,
    status,
    productCode,
    category: categoryId._id,
  });

  if (!result) throw new AppError(404, "Product not created");

  return result;
};

export const productService = {
  createProduct,
};
