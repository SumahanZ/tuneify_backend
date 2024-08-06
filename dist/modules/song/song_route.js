"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateUser_1 = require("../../middlewares/validateUser");
const validateFile_1 = require("../../middlewares/validateFile");
const validateSchema_1 = require("../../middlewares/validateSchema");
const song_schema_1 = require("../../schemas/song_schema");
const song_controller_1 = require("./song_controller");
const router = (0, express_1.Router)();
router.post("/song/upload-song", [
    validateUser_1.validateUser,
    (0, validateFile_1.uploadMiddleware)([
        { name: "thumbnail", maxCount: 1 },
        { name: "audio", maxCount: 1 },
    ]),
    (0, validateSchema_1.validateSchema)(song_schema_1.createSongInputSchema),
], song_controller_1.uploadSongHandler);
router.get("/song/list", validateUser_1.validateUser, song_controller_1.fetchLatestSongsHandler);
router.use("/api", router);
exports.default = router;
