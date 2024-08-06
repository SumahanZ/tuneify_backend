"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customID = void 0;
const customID = (alphabet = "abcdefghijklmnopqrstuvwxyz0123456789", defaultSize = 10) => {
    let id = "";
    let i = defaultSize;
    while (i--) {
        id += alphabet[(Math.random() * alphabet.length) | 0];
    }
    return id;
};
exports.customID = customID;
