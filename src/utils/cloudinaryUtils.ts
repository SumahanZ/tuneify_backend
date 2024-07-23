import { v2 as cloudinary } from "cloudinary";
import env from "../env";

export async function uploadToCloudinary(filePath: string, folderName: string) {
  cloudinary.config({
    cloud_name: "dkintlemd",
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });

  return cloudinary.uploader.upload(filePath, {
    resource_type: "auto",
    folder: folderName,
    allowed_formats: ["jpg", "mp3", "png"],
  });
}
