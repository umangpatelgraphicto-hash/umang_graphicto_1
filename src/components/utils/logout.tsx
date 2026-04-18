"use client";
import { useEffect } from "react";


export default function Logout() {


  useEffect(() => {
    if (typeof window !== "undefined") {
      // Clear authentication data immediately
      localStorage.clear();
      // destroyCookie(null, "token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // Redirect to login instantly
      window.location.href = "/login";
    }
  }, []);

  return null;
}