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
exports.signupUserHandler = signupUserHandler;
exports.loginUserHandler = loginUserHandler;
exports.getDataHandler = getDataHandler;
const user_service_1 = require("./user_service");
const jwtUtils_1 = require("../../utils/jwtUtils");
const logger_1 = __importDefault(require("../../utils/logger"));
const env_1 = __importDefault(require("../../env"));
const favorite_service_1 = require("../favorite/favorite_service");
function signupUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        try {
            const newUser = yield (0, user_service_1.createUser)({ name, email, password });
            return res.status(201).json({ user: newUser });
        }
        catch (err) {
            logger_1.default.error(err);
            return res.status(404).json({ msg: "User signup unsuccessful!" });
        }
    });
}
function loginUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const validatedUser = yield (0, user_service_1.validatePassword)({ email, password });
            if (!validatedUser)
                return res.status(400).json({ msg: "Email or password is not valid" });
            const accessToken = (0, jwtUtils_1.signJWT)(validatedUser, {
                expiresIn: env_1.default.ACCESS_TOKEN_LIFE,
            });
            if (!accessToken)
                return res.status(400).json({ msg: "Failed to generate access token" });
            const refreshToken = (0, jwtUtils_1.signJWT)(validatedUser, {
                expiresIn: env_1.default.REFRESH_TOKEN_LIFE,
            });
            if (!refreshToken)
                return res.status(400).json({ msg: "Failed to generate refresh token!" });
            const favorites = yield (0, favorite_service_1.getFavorites)({
                user: validatedUser._id,
            });
            return res.status(200).json({ accessToken, refreshToken, user: validatedUser, favorites });
        }
        catch (err) {
            return res.status(400).json({ msg: "User login unsuccessful!" });
        }
    });
}
function getDataHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const favorites = yield (0, favorite_service_1.getFavorites)({
            user: res.locals.user._id,
        });
        return res.status(200).json({ user: res.locals.user, favorites });
    });
}
