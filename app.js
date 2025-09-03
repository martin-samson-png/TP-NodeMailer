import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import buildContainer from "./buildContainer.js";
import errorHandler from "./middleware/handling.error.js";

const app = express();
const PORT = process.env.PORT;

const container = buildContainer();
const usersController = container.usersController;

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/users", usersRoutes(usersController));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Localhost connected", PORT);
});
