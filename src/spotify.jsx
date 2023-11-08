import axios from "axios";

const clientId = "421f37dfd2354987b5397433f426aec3";
const clientSecret = "998561c322b646d5b29b0cdc6b38fe84";
const redirectUri = "http://localhost:5173/";
const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  " "
)}&response_type=code&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error.response);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export async function requestAccessToken() {
  const code = localStorage.getItem("code");
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error requesting access token:", error.response?.data);
    throw error;
  }
}

async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
        },
      }
    );

    localStorage.setItem("access_token", response.data.access_token);
    // localStorage.setItem("refresh_token", response.data.refresh_token);

    console.log("New access token:", response.data.access_token);
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data);
    throw error;
  }
}

export default apiClient;
