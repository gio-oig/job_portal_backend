"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedError = void 0;
class ExtendedError extends Error {
    constructor(message, statusCode, data) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}
exports.ExtendedError = ExtendedError;
