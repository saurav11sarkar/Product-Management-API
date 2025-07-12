import { SortOrder } from "mongoose";
import AppError from "../../error/appError";
import pagenation from "../../utils/pagenation";
import Category from "../category/category.model";
import { generateProductCode } from "./generateProductCode";
import { IProduct, IProductFilters } from "./product.interface";
import Product from "./product.model";

const createProduct = async (payload: IProduct) => {
  const { name, description, price, discount, imageUrl, status, category } =
    payload;

  const categoryId = await Category.findById(category);
  if (!categoryId) throw new AppError(401, "Invalid category ID");

  const productCode = generateProductCode(name);
  const exists = await Product.findOne({ productCode });
  if (exists) throw new AppError(409, "Product code already exists");

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

  if (!result) throw new AppError(500, "Product not created");

  return result;
};

const updatedProduct = async (id: string, payload: Partial<IProduct>) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, "Product not found");
  const { status, discount, description } = payload;

  const result = await Product.findByIdAndUpdate(
    id,
    { status, discount, description },
    { new: true }
  );

  if (!result) throw new AppError(404, "Product not updated");

  return result;
};

const getAllProduct = async (params: IProductFilters, options: any) => {
  const { searchTerm, ...specifiedFields } = params;
  const { page, limit, skip, sortBy, sortOrder } = pagenation(options);

  const andSerarchFild = [];

  if (searchTerm) {
    const serchFiled = ["name", "description", "status", "productCode"];
    andSerarchFild.push({
      $or: serchFiled.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }

  if (Object.keys(specifiedFields).length > 0) {
    andSerarchFild.push({
      $and: Object.entries(specifiedFields).map(([field, value]) => ({
        [field]: { $eq: value },
      })),
    });
  }

  const whereCondition =
    andSerarchFild.length > 0 ? { $and: andSerarchFild } : {};

  const result = await Product.find(whereCondition)
    .sort({ [sortBy]: sortOrder as SortOrder })
    .skip(skip)
    .limit(limit);

  if (!result) throw new AppError(404, "No product found");

  // Calculate final price
  const modifiedProducts = result.map((product) => {
    const obj = product.toObject();
    const discount = obj.discount || 0;
    obj.finalPrice = obj.price - (obj.price * discount) / 100;
    return obj;
  });

  const total = await Product.countDocuments(whereCondition);

  return { data: { modifiedProducts }, meta: { total, page, limit } };
};

const getProductById = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) throw new AppError(404, "Product not found");

  // Calculate final price
  const filnalPriceProduct = result.toObject();
  const discount = filnalPriceProduct.discount || 0;
  filnalPriceProduct.finalPrice =
    filnalPriceProduct.price - (filnalPriceProduct.price * discount) / 100;

  return filnalPriceProduct;
};

const deletedProductById = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) throw new AppError(404, "Product not found");

  return result;
};

export const productService = {
  createProduct,
  updatedProduct,
  getAllProduct,
  getProductById,
  deletedProductById,
};
