import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  AUTH_SESSION_VERSION,
  authCookieNames,
  legacyAuthCookieNames,
} from "@/lib/auth-session";

function redirectToLogin(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));

  legacyAuthCookieNames.forEach((cookieName) => {
    response.cookies.set(cookieName, "", {
      maxAge: 0,
      path: "/",
    });
  });

  response.cookies.set(authCookieNames.sessionVersion, "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}

export function proxy(request: NextRequest) {
  const sessionVersion = request.cookies.get(authCookieNames.sessionVersion)?.value;

  if (sessionVersion !== String(AUTH_SESSION_VERSION)) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
