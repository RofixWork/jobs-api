import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import connectDB from "./db/connect.js";
import authRouter from "./routes/auth.routes.js";
import jobRouter from "./routes/job.routes.js";
import authenticateMiddleware from "./middlewares/authenticate.js";

// secutiry middlewares
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import xss from "xss-clean";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});

const app = express();

app.use(express.static(path.resolve("public")));
app.use(express.json());
app.set("trust proxy", 1);
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(xss()); // prevent XSS attacks

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateMiddleware, jobRouter);
app.get("/", (req, res) => {
  throw new Error("hello");
});

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || process.env.LOCAL_PORT;
(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server listening on port ${PORT}...`));
  } catch (error) {
    console.error(error);
  }
})();
