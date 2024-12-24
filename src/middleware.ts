import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname.startsWith("/login");

  console.log("Radhe");
  

  // Define paths and extensions to exclude
  const excludedPaths: string[] = [
    "/favicon.ico",
    "/sitemap.xml",
    "/robots.txt",
    "/dashboard",
  ];
  const excludedPrefixes: string[] = [
    "/api",
    "/_next/static",
    "/_next/image",
    "/static",
  ];
  const excludedExtensions: string[] = [
    ".css",
    ".js",
    ".jpg",
    ".jpeg",
    ".png",
    ".svg",
    ".woff",
    ".woff2",
    ".ttf",
  ];

  // Attach context to the request object
  req.context = {
    messagecode: 200,
    message: "",
    data: [],
  };

  // Exclude static paths and extensions
  if (
    excludedPaths.includes(pathname) ||
    excludedPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    excludedExtensions.some((ext) => pathname.endsWith(ext))
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("token : ",token);
  

  if (!token && (!isLogin || pathname === "/")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isLogin && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}
