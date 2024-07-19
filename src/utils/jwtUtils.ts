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

export function verifyJWT(accessToken: string) {
  try {
    const decodedToken = jwt.verify(accessToken, storedPublicKey);

    return {
      valid: true,
      expired: false,
      decodedToken,
    };
  } catch (err: any) {
    //if token can't be verified we will return this object
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decodedToken: null,
    };
  }
}
