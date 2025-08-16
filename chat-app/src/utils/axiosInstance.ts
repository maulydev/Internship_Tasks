import axios from "axios";

function isTokenExpired(token: string) {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (err) {
    console.error("Invalid token format", err);
    return true;
  }
}

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access");

    if (token && isTokenExpired(token)) {
      try {
        const response = await axios.post(
          "/api/refresh",
          {},
          { withCredentials: true }
        );
        const newAccessToken = response.data.access;
        localStorage.setItem("access", newAccessToken);
        token = newAccessToken;
      } catch (refreshError) {
        console.error("Refresh token invalid or expired", refreshError);

        try {
          await axios.post(
            "/api/signout",
            {},
            { withCredentials: true }
          );
        } catch (signoutError) {
          console.error("Error during signout:", signoutError);
        }

        localStorage.removeItem("access");
        window.location.href = "/signin";
        throw refreshError;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;



// import axios from "axios";

// const axiosInstance = axios.create({
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const response = await axios.post(
//           "/api/refresh",
//           {},
//           { withCredentials: true }
//         );
//         const newAccessToken = response.data.access;

//         localStorage.setItem("access", newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError: any) {
//         console.error("Refresh token invalid or expired", refreshError);

//         try {
//           await axios.post(
//             "/api/signout",
//             {},
//             { withCredentials: true }
//           );
//         } catch (signoutError) {
//           console.error("Error during signout:", signoutError);
//         }

//         localStorage.removeItem("access");
//         window.location.href = "/signin";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
