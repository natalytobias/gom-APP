import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const enviarCSVParaGOM = async (file: File, k: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("k", k.toString());

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
