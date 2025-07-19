"use client";

import axios from "axios";
import React, { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";

const GetApi = () => {
  const [loading, setLoading] = useState(false);

  const getAccessToken = () => localStorage.getItem("access");

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("/api/refresh");
      const newAccess = response?.data?.access;
      if (newAccess) {
        localStorage.setItem("access", newAccess);
        return newAccess;
      } else {
        throw new Error("No access token received");
      }
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || "Refresh failed");
    }
  };

  const handleGetApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/protected", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      toast.success(response?.data?.message);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshAccessToken();

          const retryResponse = await axios.get("/api/protected", {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          toast.success(retryResponse?.data?.message);
        } catch (refreshError: any) {
          toast.error(
            refreshError?.message || "Session expired. Please login again."
          );
        }
      } else {
        toast.error(error?.response?.data?.error || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGetApi}
      className="bg-amber-500 text-white font-bold px-7 py-4 cursor-pointer"
    >
      {loading ? (
        <VscLoading className="animate-spin w-6 text-2xl" />
      ) : (
        <span>GET /api</span>
      )}
    </button>
  );
};

export default GetApi;
