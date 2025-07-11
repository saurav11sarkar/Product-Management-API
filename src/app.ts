import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import globalError from "./error/globalError";
import router from "./router/routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is Running");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

app.use(globalError);

export default app;
