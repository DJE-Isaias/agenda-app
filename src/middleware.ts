import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const protectedRoutes = ["/contacts"];
  const isProctedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProctedRoute && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isProctedRoute && token) {
    return NextResponse.redirect(new URL("/contacts", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto API y static
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
