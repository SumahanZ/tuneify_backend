"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
exports.checkFileType = checkFileType;
exports.getDataURIFromMemory = getDataURIFromMemory;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.storage = multer_1.default.memoryStorage();
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|mpeg|/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb("Error: Images and audio files only! (jpeg, jpg, png, gif, mp3)");
    }
}
function getDataURIFromMemory(buffer, mimetype) {
    const b64 = Buffer.from(buffer).toString("base64");
    let dataURI = "data:" + mimetype + ";base64," + b64;
    return dataURI;
}
