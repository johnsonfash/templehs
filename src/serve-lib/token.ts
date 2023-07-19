import * as jose from 'jose'

const secret = jose.base64url.decode(process?.env?.ACCESS_TOKEN as string)
const alg = 'HS256'

export const validateToken = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, secret)
    return { status: true, message: 'OK', data: payload as { id: number } }
  } catch (e: any) {
    return { status: false, message: e.message, data: null }
  }
}

export const signToken = async (data: { id: number }) => {
  return await new jose.SignJWT(data)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('15h')
    .sign(secret)
}