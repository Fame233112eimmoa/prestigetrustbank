"use client";

import { useEffect } from "react";

import { initializeAuthSessionStorage } from "@/lib/auth-session";

export function AuthSessionBootstrap() {
  useEffect(() => {
    initializeAuthSessionStorage();
  }, []);

  return null;
}
