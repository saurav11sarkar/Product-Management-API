import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  note_env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
};
