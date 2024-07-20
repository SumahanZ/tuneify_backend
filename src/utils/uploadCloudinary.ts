import { v2 as cloudinary } from "cloudinary";

export async function uploadToCloudinary() {
  cloudinary.config({
    cloud_name: "dkintlemd",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  await cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
    {
      public_id: "shoes",
    }
  );
}
