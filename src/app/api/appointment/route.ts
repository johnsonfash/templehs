import { AppError, CONST, db, header } from "@serve-lib";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { Appointment, Doctor } from "@client-lib";
import { validateToken } from "@serve-lib/token";

export async function GET(request: Request) {

  try {
    const { searchParams } = new URL(request.url)
    const doctor_id = searchParams.get('doctor_id') ?? ''

    const result = await db.from<Doctor>(CONST.DOCTOR_TABLE).where('id', Number(doctor_id)).first()

    if (!result) throw new Error('Doctor not found')
    const { password, ...doctor } = result

    return NextResponse.json({ status: true, message: 'OK', data: doctor }, {
      status: 200,
      statusText: 'OK',
      headers: header
    })

  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message, data: null }, {
      status: e?.code ?? 500,
      statusText: 'Error',
      headers: header
    })
  }
}

export async function POST(request: Request) {
  try {
    const token = cookies().get(CONST.COOKIE)?.value
    if (!token) throw new AppError('Invalid token', { status: 401 })
    const { status, data } = await validateToken(token)
    if (!status) throw new AppError('Token expired', { status: 401 })
    const { date, time, doctor_id } = await request.json()
    const check = await db.from<Appointment>(CONST.APPOINTMENT_TABLE)
      .where('user_id', data?.id)
      .andWhere('doctor_id', doctor_id)
      .andWhere('appointment_date', date)
      .andWhere('appointment_time', time).first()
    if (check) throw new AppError('You already have an appointment for this time slot', {
      status: 400
    })

    await db<Appointment>(CONST.APPOINTMENT_TABLE).insert({
      doctor_id,
      user_id: data?.id,
      appointment_date: date,
      appointment_time: time,
    })

    return NextResponse.json({ status: true, message: 'OK', data: null }, {
      status: 200,
      statusText: 'OK',
      headers: header
    })

  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message, data: null }, {
      status: e?.status ?? 500,
      statusText: 'Error',
      headers: header
    })
  }
}