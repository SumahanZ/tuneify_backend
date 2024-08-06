"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const songSchema = new mongoose_1.default.Schema({
    name: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        unique: true,
    },
    artist: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
    audioURL: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
    thumbnailURL: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
    hexCode: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.SongModel = mongoose_1.default.model("Song", songSchema);
