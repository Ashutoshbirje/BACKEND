import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_APT_SECRET,
});

const uploadOncloudinary = async (locationFilePath) => {
  try {
    if(!locationFilePath) return null
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(locationFilePath, {
        resource_type: "auto"
    });
    // file jhas been uploaded successfully 
    console.log("File is uploaded on cloudinary", response.url);
    fs.unlinkSync(locationFilePath)
    return response;
  } catch (error) {
    fs.unlinkSync(locationFilePath)
    return null;
  }
};

// cloudinary.uploader.upload(
//   "../../public/1.jpeg", // ✅ give a valid path or URL
//   { public_id: "olympic_flag" },  // options go here
//   function (error, result) {
//     if (error) console.error("❌ Upload failed:", error);
//     else console.log("✅ Upload success:", result);
//   }
// );

export {uploadOncloudinary}
