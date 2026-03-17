import axios from "axios";

export const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "foodyassets");
    formData.append("folder", "products");

    const response = await axios.post("https://api.cloudinary.com/v1_1/deiofdjcn/image/upload", formData);

    return response.data.secure_url;
}