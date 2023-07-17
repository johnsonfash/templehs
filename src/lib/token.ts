import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';

export const validateToken = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN as string) as { id: number }
    return { status: true, data };
  } catch (e: any) {
    return { status: false, data: null };
  }
}

export const signToken = (data: { id: number }) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN as string, { expiresIn: '15h' })
}

export const getAuthHeader = (req: NextRequest) => {
  try {
    const token = req.headers.get('Authorization')
  } catch (e: any) {

  }
}