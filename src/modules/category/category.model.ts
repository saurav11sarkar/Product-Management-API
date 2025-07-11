import mongoose from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
