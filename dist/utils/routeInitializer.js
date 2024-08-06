"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoute = initializeRoute;
const user_route_1 = __importDefault(require("../modules/user/user_route"));
const song_route_1 = __importDefault(require("../modules/song/song_route"));
const favorite_route_1 = __importDefault(require("../modules/favorite/favorite_route"));
function initializeRoute(app) {
    app.use(user_route_1.default);
    app.use(song_route_1.default);
    app.use(favorite_route_1.default);
}
