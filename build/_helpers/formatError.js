"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const formatError = (error) => {
    const formatedErrorObject = {};
    for (let i of error.details) {
        const key = i.path[0];
        formatedErrorObject[key] = i.message;
    }
    return formatedErrorObject;
};
exports.formatError = formatError;
