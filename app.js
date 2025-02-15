import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import connectDB from "./db/connect.js";
const app = express();

app.use(express.static(path.resolve("public")));
app.use(express.json());

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
