import { CONST } from "@client-lib";
import { goodToken } from "@client-lib/token";
import { NextRequest, NextResponse } from "next/server";

const authRedirects = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(CONST.COOKIE)?.value ?? ''
  const status = goodToken(token)
  const pathname = request.nextUrl?.pathname
  const url = request.nextUrl.clone()
  if (authRedirects.includes(pathname) && status) {
    url.pathname = '/';
    return NextResponse.redirect(url)
  }
  else if (pathname.match(/^\/$|^\/[\d]+/) && !status) {
    url.pathname = '/login';
    return NextResponse.redirect(url)
  }
}