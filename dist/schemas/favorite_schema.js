"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFavoriteInputSchema = void 0;
const zod_1 = require("zod");
exports.addFavoriteInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        songId: (0, zod_1.string)({
            required_error: "Song Id must be provided",
        }),
    }),
});
