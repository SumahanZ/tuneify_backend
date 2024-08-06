"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserInputSchema = exports.createUserInputSchema = void 0;
const zod_1 = require("zod");
exports.createUserInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password too short -  should be 6 chars minimum"),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
    }),
});
exports.loginUserInputSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password too short -  should be 6 chars minimum"),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
    }),
});
