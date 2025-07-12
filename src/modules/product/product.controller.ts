import catchAsync from "../../utils/catchAsycn";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import uploadCludunary from "../../utils/uploadCludanaryImg";
import { IProduct } from "./product.interface";
import { productService } from "./product.service";

interface CloudinaryUploadResult {
  secure_url: string;
}

const createProduct = catchAsync(async (req, res) => {
  let files = req.files as Express.Multer.File[];
  let payload: any;
  let imageUrls: string[] = [];

  if (files && files.length > 0) {
    payload = JSON.parse(req.body.data);
    imageUrls = await Promise.all(
      files.map(async (file) => {
        const uploaded = await uploadCludunary(file);
        return (uploaded as CloudinaryUploadResult).secure_url;
      })
    );
  } else {
    payload = req.body;
    if (Array.isArray(payload.imageUrl)) {
      imageUrls = payload.imageUrl;
    } else if (typeof payload.imageUrl === "string") {
      imageUrls = [payload.imageUrl];
    }
  }

  const result = await productService.createProduct({
    ...payload,
    imageUrl: imageUrls,
  } as IProduct);

  sendResponse(res, 201, "Product created successfully", result);
});

const updatedProduct = catchAsync(async (req, res) => {
  const result = await productService.updatedProduct(req.params.id, req.body);
  sendResponse(res, 200, "Product updated successfully", result);
});

const getAllProduct = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    "name",
    "description",
    "status",
    "productCode",
    "price",
    "discount",
    "searchTerm",
  ]);
  const options = pick(req.query, ["sortBy", "sortOrder", "limit", "page"]);
  const result = await productService.getAllProduct(filters, options);
  sendResponse(
    res,
    200,
    "Product fetched successfully",
    result.data,
    result.meta
  );
});

const getCategoryById = catchAsync(async (req, res) => {
  const result = await productService.getProductById(req.params.id);
  sendResponse(res, 200, "Category fetched successfully", result);
});

const deletedProductById = catchAsync(async (req, res) => {
  const result = await productService.deletedProductById(req.params.id);
  sendResponse(res, 200, "Product deleted successfully", result);
});

export const productController = {
  createProduct,
  updatedProduct,
  getAllProduct,
  getCategoryById,
  deletedProductById,
};
