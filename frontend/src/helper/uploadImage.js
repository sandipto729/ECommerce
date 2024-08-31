const REACT_APP_CLOUD_NAME='dodpgohuc';
const url = `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "Ecom_Website");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json();
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export default uploadImage;
