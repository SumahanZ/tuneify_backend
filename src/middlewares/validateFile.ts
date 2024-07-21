import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { checkFileType, storage } from "../utils/configureMultipart";

export function fileValidation(fields: { name: string }[]) {
  const upload = multer({
    storage: storage,
    limits: { fileSize: 30000000 },
    fileFilter: (
      _req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      checkFileType(file, cb);
    },
  }).fields(fields);

  return upload;
}
