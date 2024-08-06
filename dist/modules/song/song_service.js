"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSong = createSong;
exports.uploadSongImageToStorage = uploadSongImageToStorage;
exports.getSongs = getSongs;
const cloudinaryUtils_1 = require("../../utils/cloudinaryUtils");
const logger_1 = __importDefault(require("../../utils/logger"));
const song_model_1 = require("./song_model");
const multerUtils_1 = require("../../utils/multerUtils");
const generateID_1 = require("../../utils/generateID");
function createSong(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdSong = yield song_model_1.SongModel.create(input);
            if (!createdSong)
                throw new Error("Song created unsuccessfully!");
            return createdSong;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function uploadSongImageToStorage(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(filePath["thumbnail"][0] && filePath["audio"][0]))
                throw new Error("Provided files doesn't match");
            const thumbnailResult = yield (0, cloudinaryUtils_1.uploadToCloudinary)((0, multerUtils_1.getDataURIFromMemory)(filePath["thumbnail"][0].buffer, filePath["thumbnail"][0].mimetype), `thumbnails/${(0, generateID_1.customID)()}`);
            const audioResult = yield (0, cloudinaryUtils_1.uploadToCloudinary)((0, multerUtils_1.getDataURIFromMemory)(filePath["audio"][0].buffer, filePath["audio"][0].mimetype), `audios/${(0, generateID_1.customID)()}`);
            return { thumbnailResult, audioResult };
        }
        catch (err) {
            logger_1.default.error(err);
            throw new Error(err);
        }
    });
}
function getSongs(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (query)
                return yield song_model_1.SongModel.find(query).lean();
            return yield song_model_1.SongModel.find().lean();
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
