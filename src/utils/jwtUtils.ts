import jwt from "jsonwebtoken";
import {
  privateKey as storedPrivateKey,
  publicKey as storedPublicKey,
} from "../config/keys";

export function signJWT(payload: Object, options?: jwt.SignOptions) {
  if (!options) return;

  return jwt.sign(payload, storedPrivateKey, {
    ...options,
    algorithm: "RS256",
  });
}
