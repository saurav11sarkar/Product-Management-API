import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number"),
  discount: z.number().min(0).max(100).optional(),
  imageUrl: z.string().url("Image URL must be valid").optional(),
  status: z.enum(["In Stock", "Stock Out"]).optional(),
  productCode: z.string().min(1, "Product code is required").optional(),
  category: z.string().min(1, "Category ID is required"),
});

export const productValidation = {
  productSchema,
};
