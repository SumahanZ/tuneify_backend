"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const env = (0, envalid_1.cleanEnv)(process.env, {
    SERVER_PORT: (0, envalid_1.num)({ default: 3002 }),
    DB_URL: (0, envalid_1.str)({ default: "mongodb://localhost:27017/tuneify-development" }),
    SALT_ROUNDS: (0, envalid_1.num)({ default: 10 }),
    ACCESS_TOKEN_LIFE: (0, envalid_1.str)({ default: "10m" }),
    REFRESH_TOKEN_LIFE: (0, envalid_1.str)({ default: "1y" }),
    CLOUDINARY_API_KEY: (0, envalid_1.str)({ default: "747399636826933" }),
    CLOUDINARY_API_SECRET: (0, envalid_1.str)({ default: "BfdlyeeHuohxBz81vpXMAHr235Y" }),
});
exports.default = env;
