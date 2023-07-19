import { User } from "@client-lib";
import { AppError, CONST, db, header } from "@serve-lib";
import { signToken, validateToken } from "@serve-lib/token";
import * as argon from 'argon2';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password: reqPassword } = await request.json()
    const user = await db.from<User>(CONST.USER_TABLE).where('email', email.trim()).first()
    if (!user?.email) throw new Error('Invalid email address')
    if (!await argon.verify(user.password, reqPassword.trim())) throw new Error('Invalid password')
    const token = await signToken({ id: user.id })
    const { password, ...data } = user
    return NextResponse.json({ status: true, message: 'OK', data }, {
      status: 200,
      statusText: 'OK',
      headers: {
        ...header,
        'Set-Cookie': `${CONST.COOKIE}=${token}; Path=/`
      }
    })
  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message, data: null }, {
      status: e?.code ?? 500,
      statusText: 'Error',
      headers: header
    })
  }
}


export async function GET(request: NextRequest) {
  try {
    const token = cookies().get(CONST.COOKIE)?.value
    console.log('token', request.cookies.getAll())
    if (!token) throw new AppError('Invalid token', { status: 401 })
    const { status, data } = await validateToken(token)
    if (!status) throw new AppError('Token expired', { status: 401 })
    const user = await db.from<User>(CONST.USER_TABLE).where('id', data?.id).first()
    if (!user) throw new AppError('Not found', { status: 400 })
    const { password, ...me } = user
    return NextResponse.json({ status: true, message: 'OK', data: me }, {
      status: 200,
      statusText: 'OK',
    })
  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message, data: null }, {
      status: e?.status ?? 500,
      statusText: 'Error',
      headers: header
    })
  }
}