import { NextFunction, Request } from "express";
import multer from "multer";
import { checkFileType, storage } from "../utils/configureMultipart";

type FileValidationType = { name: string; maxCount: 1 }[];

function fileValidation(fields: FileValidationType) {
  const upload = multer({
    storage: storage,
    limits: { fileSize: 30000000 },
    fileFilter: (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      if (req.files?.length !== fields.length)
        return cb(new Error("Fields provided does not match"));
      checkFileType(file, cb);
    },
  }).fields(fields);

  return upload;
}

export function uploadMiddleware(fields: { name: string; maxCount: 1 }[]) {
  return (req: Request, res: any, next: NextFunction) => {
    const upload = fileValidation(fields);
    upload(req, res, (err: any) => {
      if (err) return res.status(400).send({ message: err.message });
      next();
    });
  };
}
