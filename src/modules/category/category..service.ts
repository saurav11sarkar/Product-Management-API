import { SortOrder } from "mongoose";
import AppError from "../../error/appError";
import pagenation from "../../utils/pagenation";
import { ICategory } from "./category.interface";
import Category from "./category.model";

const createCategory = async (payload: Partial<ICategory>) => {
  const category = await Category.findOne({ name: payload.name });
  if (category) {
    throw new AppError(400, "Category already exists");
  }
  const result = await Category.create(payload);
  return result;
};

const getAllCategory = async (params: any, options: any) => {
  const { searchTerm, ...specifiedFields } = params;
  const { page, limit, skip, sortBy, sortOrder } = pagenation(options);

  const andSerarchFild = [];

  if (searchTerm) {
    const serchFiled = ["name"];
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

  const result = await Category.find(whereCondition)
    .sort({ [sortBy]: sortOrder as SortOrder })
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments(whereCondition);

  return { data: result, meta: { total, page, limit } };
};

const getCategoryById = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new AppError(404, "Category not found");
  }
  return category;
};

const deletedCategory = async (id: string) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new AppError(404, "Category not found");
  }
  return category;
};

const updatedCategory = async (id: string, payload: Partial<ICategory>) => {
  const category = await Category.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!category) {
    throw new AppError(404, "Category not found");
  }
  return category;
};

export const categoryService = {
  createCategory,
  getAllCategory,
  getCategoryById,
  deletedCategory,
  updatedCategory,
};
