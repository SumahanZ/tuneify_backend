import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary(
  filePaths: string[],
  folderName: string
) {
  cloudinary.config({
    cloud_name: "dkintlemd",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  await Promise.all(
    filePaths.map((path) =>
      cloudinary.uploader.upload(path, {
        type: "auto",
        folder: folderName,
        allowed_formats: ["jpg", "mp3"],
      })
    )
  );
}
