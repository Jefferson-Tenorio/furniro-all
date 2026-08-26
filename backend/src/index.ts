import cors from "cors";
import express, { Request, Response } from "express";

import errorHandler from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/loggerMiddleware";
import productsRouter from "./routes/productRouter";
import authRouter from "./routes/authRouter";
import healthRouter from "./routes/healthRouter";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Health OK");
});

app.use("/health", healthRouter);
app.use("/products", productsRouter);
app.use("/auth", authRouter);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
