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
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = __importDefault(require("../../env"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        unique: true,
    },
    name: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
    password: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        const salt = yield bcrypt_1.default.genSalt(env_1.default.SALT_ROUNDS);
        const hashedPassword = bcrypt_1.default.hashSync(this.password, salt);
        this.password = hashedPassword;
        return next();
    });
});
exports.UserModel = mongoose_1.default.model("User", userSchema);
