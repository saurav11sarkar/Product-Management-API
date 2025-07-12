import catchAsycn from "../../utils/catchAsycn";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { categoryService } from "./category.service";

const createCategory = catchAsycn(async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  sendResponse(res, 201, "Category created successfully", result);
});

const getAllCategory = catchAsycn(async (req, res) => {
  const filters = pick(req.query, ["name", "searchTerm"]);
  const options = pick(req.query, ["sortBy", "sortOrder", "limit", "page"]);
  const result = await categoryService.getAllCategory(filters, options);
  sendResponse(
    res,
    200,
    "Category fetched successfully",
    result.data,
    result.meta
  );
});

const getCategoryById = catchAsycn(async (req, res) => {
  const result = await categoryService.getCategoryById(req.params.id);
  sendResponse(res, 200, "Category fetched successfully", result);
});

const deletedCategory = catchAsycn(async (req, res) => {
  const result = await categoryService.deletedCategory(req.params.id);
  sendResponse(res, 200, "Category deleted successfully", result);
});

const updateCategory = catchAsycn(async (req, res) => {
  const result = await categoryService.updatedCategory(req.params.id, req.body);
  sendResponse(res, 200, "Category updated successfully", result);
});

export const categoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  deletedCategory,
  updateCategory,
};
