import catchAsycn from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";

const createProduct = catchAsycn(async (req, res) => {
  const result = await productService.createProduct(req.body);
  sendResponse(res, 201, "Product created successfully", result);
});

export const productController = {
  createProduct,
};
