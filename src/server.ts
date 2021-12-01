import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import BaseRouter from "./routes";
import AuthRouter from "./routes/auth/authRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import {
  incorrectRouteHandler,
  mainErrorhandler,
} from "./_helpers/errorHandler";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal",
      version: "1.0.0",
    },
  },
  apis: [
    "./src/routes/index.ts",
    "./src/routes/auth/authRoutes.ts",
    "./src/routes/companyRoutes.ts",
    "./src/routes/locationRoutes.ts",
    "./src/routes/categoryRoutes.ts",
  ],
};

const openapiSpecification = swaggerJsdoc(options);

/**
 * @middleware
 */
app.use(express.json());
app.use(morgan("common"));
app.use(cors());

app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "..", "uploads", "images"))
);

/**
 * @routers
 */
app.use("/auth", AuthRouter);
app.use("/api", BaseRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/**
 * @description handle incorrect routes.
 */
app.use(incorrectRouteHandler);

/**
 * @description handle errors in application
 */
app.use(mainErrorhandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("app started on port%d", PORT);
});
