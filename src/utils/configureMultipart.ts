import multer from "multer";
import path from "path";
import { Request } from "express";

// Configure storage engine and filename
export const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (_req: Request, file: Express.Multer.File, multerNext) {
    multerNext(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export function checkFileType(file: Express.Multer.File, cb: any) {
  const filetypes = /jpeg|jpg|png|gif|mp3/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images and audio files only! (jpeg, jpg, png, gif, mp3)");
  }
}
