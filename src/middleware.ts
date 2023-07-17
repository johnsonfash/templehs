import { validateToken } from "@lib";
import { NextRequest, NextResponse } from "next/server";

const authRedirects = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get('__On_C_deAt')?.value ?? '';
  // const pathname = request.nextUrl?.pathname
  // const { status } = validateToken(token)
  // const url = request.nextUrl.clone()
  // if (authRedirects.includes(pathname) && status) {
  //   url.pathname = '/';
  //   return NextResponse.redirect(url)
  // } else if (pathname.match(/^\/$|^\/[\d]+/) && !status) {
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url)
  // }
}