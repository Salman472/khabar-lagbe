import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_CLOUDE_KEY,
  api_secret: process.env.CLOUDINARY_CLOUDE_SECRET,
});

const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
  try {
    if (!file) return null;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type:'auto' },
        (error, result) => {
          if (error) {
            console.error("Upload Error:", error);
            reject(null);
          } else {
            resolve(result?.secure_url || null);
          }
        }
      );

      uploadStream.end(buffer); 
    });
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return null;
  }
};

export default uploadOnCloudinary;