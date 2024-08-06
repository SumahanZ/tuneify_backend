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
exports.createFavorite = createFavorite;
exports.getFavorites = getFavorites;
exports.deleteFavorite = deleteFavorite;
exports.getOneFavorite = getOneFavorite;
const favorite_model_1 = require("./favorite_model");
function createFavorite(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdFavorite = yield favorite_model_1.FavoriteModel.create(input);
            if (!createdFavorite)
                throw new Error("Unable to add song to favorite!");
            return createdFavorite;
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function getFavorites(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield favorite_model_1.FavoriteModel.find(query).populate("song").lean();
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function deleteFavorite(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield favorite_model_1.FavoriteModel.findOneAndDelete(query).lean();
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
function getOneFavorite(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield favorite_model_1.FavoriteModel.findOne(query).lean();
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
