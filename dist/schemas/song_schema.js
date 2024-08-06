"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSongInputSchema = void 0;
const zod_1 = require("zod");
exports.createSongInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Song Name is required",
        }).min(6, "Song Name too short -  should be 6 chars minimum"),
        artist: (0, zod_1.string)({
            required_error: "Artist Name is required",
        }).min(6, "Artist Name too short -  should be 6 chars minimum"),
        hexCode: (0, zod_1.string)({
            required_error: "Hex Code is required",
        }),
    }),
});
