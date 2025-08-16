import axiosInstance from "@/utils/axiosInstance";

export async function uploadFile(file: File, uploadUrl: string): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
