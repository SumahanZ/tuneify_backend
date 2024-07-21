import multer from "multer";
import path from "path";

export const storage = multer.memoryStorage();

export function checkFileType(file: Express.Multer.File, cb: any) {
  const filetypes = /jpeg|jpg|png|gif|mpeg|/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images and audio files only! (jpeg, jpg, png, gif, mp3)");
  }
}

export function getDataURIFromMemory(buffer: Buffer, mimetype: string) {
  const b64 = Buffer.from(buffer).toString("base64");
  let dataURI = "data:" + mimetype + ";base64," + b64;
  return dataURI;
}
