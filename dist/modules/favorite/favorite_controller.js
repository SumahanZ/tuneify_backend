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
exports.addRemoveFavoriteHandler = addRemoveFavoriteHandler;
exports.getUserFavoritesHandler = getUserFavoritesHandler;
const mongodb_1 = require("mongodb");
const favorite_service_1 = require("./favorite_service");
function addRemoveFavoriteHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundFavorite = yield (0, favorite_service_1.getOneFavorite)({
                user: res.locals.user._id,
                song: req.body.songId,
            });
            console.log(foundFavorite);
            if (foundFavorite) {
                yield (0, favorite_service_1.deleteFavorite)({
                    _id: foundFavorite._id,
                });
                return res.status(201).json({ msg: "Removed song!" });
            }
            yield (0, favorite_service_1.createFavorite)({
                user: res.locals.user,
                song: new mongodb_1.ObjectId(req.body.songId),
            });
            return res.status(201).json({ msg: "Added song!" });
        }
        catch (err) {
            return res.status(400).json({ msg: err.message });
        }
    });
}
function getUserFavoritesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFavorites = yield (0, favorite_service_1.getFavorites)({
                user: res.locals.user._id,
            });
            return res.status(200).json(userFavorites);
        }
        catch (err) {
            return res.status(400).json({ msg: err.message });
        }
    });
}
