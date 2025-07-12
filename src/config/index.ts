import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  note_env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  clodunary: {
    cloude_name: process.env.CLOUDE_NAME,
    clodue_api_key: process.env.CLOUDE_API_KEY,
    cloude_api_secret: process.env.CLODUE_API_SECRET,
  },
};
