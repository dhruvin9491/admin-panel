import axios from "axios";

export const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "???");
    formData.append("folder", "???");

    const response = await axios.post("https://api.cloudinary.com/v1_1/???/image/upload", formData);

    return response.data.secure_url;
}
