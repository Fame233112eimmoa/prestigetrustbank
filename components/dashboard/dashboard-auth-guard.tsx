"use client";

import { useEffect, useEffectEvent, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useDashboard } from "@/components/dashboard/dashboard-provider";
import {
  clearAuthSession,
  fetchCurrentSessionVersion,
  getCookieSessionVersion,
  getStoredSessionVersion,
  hasValidAuthSession,
} from "@/lib/auth-session";

const SESSION_VERSION_CHECK_INTERVAL_MS = 60_000;

export function DashboardAuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { resetDashboardState } = useDashboard();
  const hasRedirectedRef = useRef(false);

  const logout = useEffectEvent(() => {
    if (hasRedirectedRef.current) {
      return;
    }

    hasRedirectedRef.current = true;
    resetDashboardState();
    clearAuthSession();
    router.replace("/login");
  });

  const verifySession = useEffectEvent(async () => {
    if (!hasValidAuthSession()) {
      logout();
      return;
    }

    try {
      const currentSessionVersion = await fetchCurrentSessionVersion();
      const storedSessionVersion = getStoredSessionVersion();
      const cookieSessionVersion = getCookieSessionVersion();

      if (
        !storedSessionVersion ||
        !cookieSessionVersion ||
        storedSessionVersion !== currentSessionVersion ||
        cookieSessionVersion !== currentSessionVersion
      ) {
        logout();
      }
    } catch {
      if (!hasValidAuthSession()) {
        logout();
      }
    }
  });

  useEffect(() => {
    void verifySession();
  }, [pathname]);

  useEffect(() => {
    void verifySession();

    const intervalId = window.setInterval(() => {
      void verifySession();
    }, SESSION_VERSION_CHECK_INTERVAL_MS);

    function handleWindowFocus() {
      void verifySession();
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void verifySession();
      }
    }

    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
}
