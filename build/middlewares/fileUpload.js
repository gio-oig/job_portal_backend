"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};
exports.fileUpload = multer_1.default({
    //   limits: 50000,
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            // null is the place for error
            cb(null, "uploads/images");
        },
        filename: (req, file, cb) => {
            // set file extention
            console.log("filename section");
            console.dir(file);
            // @ts-ignore
            const extension = MIME_TYPE_MAP[file.mimetype];
            // create file name
            cb(null, uuid_1.v4() + "." + extension);
        },
    }),
    fileFilter: (req, file, cb) => {
        // check if file type is acceptable or not -> true/false
        // @ts-ignore
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        const error = isValid ? null : new Error("Invalid mime type!");
        console.log("error section");
        console.log(error);
        console.log("is valid");
        console.log(isValid);
        // @ts-ignore
        cb(error, isValid);
    },
});
