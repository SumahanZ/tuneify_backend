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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSongHandler = uploadSongHandler;
exports.fetchLatestSongsHandler = fetchLatestSongsHandler;
const cloudinary_1 = require("cloudinary");
const song_service_1 = require("./song_service");
function uploadSongHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, artist, hexCode } = req.body;
        try {
            const filePaths = req.files;
            const { thumbnailResult, audioResult } = yield (0, song_service_1.uploadSongImageToStorage)(filePaths);
            try {
                const newSong = yield (0, song_service_1.createSong)({
                    name,
                    artist,
                    hexCode,
                    thumbnailURL: thumbnailResult.url,
                    audioURL: audioResult.url,
                });
                return res.status(201).json({ song: newSong });
            }
            catch (err) {
                yield Promise.all([thumbnailResult.public_id, audioResult.public_id].map((id) => cloudinary_1.v2.uploader.destroy(id)));
                return res.status(404).json({ msg: "User signup unsuccessful!" });
            }
        }
        catch (err) {
            return res.status(400).json({ msg: err.message });
        }
    });
}
function fetchLatestSongsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const latestSongs = yield (0, song_service_1.getSongs)();
            return res.status(200).json(latestSongs);
        }
        catch (err) {
            return res.status(400).json({ msg: err.message });
        }
    });
}
