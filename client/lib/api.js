"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = window.localStorage.getItem("companion-circle-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function request(method, url, data, config = {}) {
  const response = await api({
    method,
    url,
    data,
    ...config
  });

  return response.data;
}

export default api;
