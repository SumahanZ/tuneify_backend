"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = uploadMiddleware;
const multer_1 = __importDefault(require("multer"));
const multerUtils_1 = require("../utils/multerUtils");
function fileValidation(fields) {
    const upload = (0, multer_1.default)({
        storage: multerUtils_1.storage,
        limits: { fileSize: 30000000 },
        fileFilter: (_req, file, cb) => {
            (0, multerUtils_1.checkFileType)(file, cb);
        },
    }).fields(fields);
    return upload;
}
function uploadMiddleware(fields) {
    return (req, res, next) => {
        const upload = fileValidation(fields);
        upload(req, res, (err) => {
            if (err)
                return res.status(400).send({ message: err.message });
            next();
        });
    };
}
