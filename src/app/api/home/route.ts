import { NextResponse } from 'next/server'
import { CONST, db, header } from "@serve-lib"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') ?? ''
    const time = searchParams.get('time') ?? ''
    const field = searchParams.get('field') ?? ''

    let andApend = false
    let dbChain = db.from(CONST.DOCTOR_TABLE);

    if (field) {
      dbChain = dbChain.where('field', field)
      andApend = false
    }

    if (date) {
      const query = '? = ANY(available_date)'
      dbChain = dbChain[andApend ? 'andWhereRaw' : 'whereRaw'](query, date)
      andApend = true
    }

    if (time) {
      const query = '? = ANY(available_time)'
      dbChain = dbChain[andApend ? 'andWhereRaw' : 'whereRaw'](query, date)
      andApend = true
    }

    const data = await dbChain

    return NextResponse.json({ status: true, message: 'OK', data }, {
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