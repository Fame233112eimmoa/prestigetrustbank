import { AUTH_SESSION_VERSION } from "@/lib/auth-session";

export async function GET() {
  return Response.json(
    { sessionVersion: AUTH_SESSION_VERSION },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
