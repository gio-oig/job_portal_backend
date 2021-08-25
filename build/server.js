"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const authRoutes_1 = __importDefault(require("./routes/auth/authRoutes"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(morgan_1.default("common"));
app.use(cors_1.default());
app.use("/uploads/images", express_1.default.static(path_1.default.join(__dirname, "..", "uploads", "images")));
app.use("/auth", authRoutes_1.default);
app.use("/api", routes_1.default);
app.use("/", (req, res) => {
    res.send("works");
});
app.use((req, res, next) => {
    return next(new Error("Could not find this route"));
});
app.use((error, req, res, next) => {
    console.log("error handler route");
    // delete image if we got an error
    // multer adds file property to request object
    if (req.file) {
        fs_1.default.unlink(req.file.path, (err) => console.log(err));
    }
    else if (req.files) {
        const fileKeys = Object.keys(req.files);
        fileKeys.forEach((key) => {
            //@ts-ignore
            fs_1.default.unlink(req.files[key].path, (err) => console.log(err));
        });
    }
    const errorObject = {
        message: error.message,
    };
    if (error.data) {
        errorObject.error = error.data;
    }
    // console.log("******** error object *******");
    // console.log(error);
    res.status(error.statusCode || 500);
    res.json(errorObject);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("app started on port %d", PORT);
});
