import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { verifyToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  // const protectedRoutes = ['/contacts'];

  if (token) {
    // if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    //   return NextResponse.redirect(new URL('/', req.url));
    // }
  
    // try {
    //   if (token) await verifyToken(token ?? '');
    //   if (req.nextUrl.pathname === "/") {
    //     return NextResponse.redirect(new URL("/contacts", req.url));
    //   }
    //   return NextResponse.next();
    // } catch (error) {
    //   console.log("error", error);
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: [
    // Aplica a todas las rutas excepto API y static
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
