import express from "express";
import path from "path";
import fs from "fs";
import morgan from "morgan";
import cors from "cors";
import { Request, Response } from "express-serve-static-core";
import { NextFunction } from "connect";
import BaseRouter from "./routes";
import AuthRouter from "./routes/auth/authRoutes";
import { ExtendedError } from "./public/models/ErrorClass";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

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
 * @description handle incorrect routes
 */
app.use((req, res, next) => {
  return next(new Error("Could not find this route"));
});

/**
 * @description handle errors in application
 */
app.use(
  (error: ExtendedError, req: Request, res: Response, next: NextFunction) => {
    console.log("error handler route");
    // delete image if we got an error
    // multer adds file property to request object
    if (req.file) {
      fs.unlink(req.file.path, (err) => console.log(err));
    } else if (req.files) {
      const fileKeys = Object.keys(req.files);
      fileKeys.forEach((key) => {
        //@ts-ignore
        fs.unlink(req.files[key].path, (err) => console.log(err));
      });
    }

    const errorObject: { message: string; error?: object } = {
      message: error.message,
    };

    if (error.data) {
      errorObject.error = error.data;
    }

    // console.log("******** error object *******");
    // console.log(error);

    res.status(error.statusCode || 500);
    res.json(errorObject);
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("app started on port %d", PORT);
});
