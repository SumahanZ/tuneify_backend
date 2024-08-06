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
exports.createUser = createUser;
exports.findUser = findUser;
exports.findUserById = findUserById;
exports.validatePassword = validatePassword;
const lodash_1 = require("lodash");
const user_model_1 = require("./user_model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = __importDefault(require("../../utils/logger"));
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdUser = yield user_model_1.UserModel.create(input);
            if (!createdUser)
                throw new Error("User created unsuccessfully!");
            return (0, lodash_1.omit)(createdUser, "password");
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function findUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_model_1.UserModel.find(query).lean();
            if (!foundUser)
                throw new Error("User not found!");
            return (0, lodash_1.omit)(foundUser, "password");
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield user_model_1.UserModel.findById(userId).lean();
            if (!foundUser)
                throw new Error("User not found!");
            return (0, lodash_1.omit)(foundUser, "password");
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function validatePassword(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password }) {
        try {
            const user = yield user_model_1.UserModel.findOne({ email });
            if (!user)
                return false;
            const isValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isValid)
                return false;
            return (0, lodash_1.omit)(user.toJSON(), "password");
        }
        catch (err) {
            logger_1.default.error(err);
            throw new Error(err);
        }
    });
}
