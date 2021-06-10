import axios from "axios"

export async function getVideos(data) {
  const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/videos`, {params: { data }});
  return response;
}