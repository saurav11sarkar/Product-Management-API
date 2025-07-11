
import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  discount?: number;
  imageUrl?: string;
  status: "In Stock" | "Stock Out";
  productCode: string;
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
