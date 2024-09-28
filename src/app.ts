import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRoute";
import { handleErrors } from "./middleware/error";

const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "running",
    message: "Server is running !",
  });
});

app.use("/api/v1/auth", authRouter);

app.use(handleErrors);

export default app;
