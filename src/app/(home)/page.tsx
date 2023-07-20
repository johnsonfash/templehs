import { CONST, Doctor, FetchResultResp, objectToURL } from "@client-lib";
import Card from "@components/card";
import DateInput from "@components/filter";
import { cookies } from 'next/headers'

type SearchProp = { date: string, time: string, field: string }
interface PageProp {
  params: { dentist: string }
  searchParams: SearchProp
}


const getAppointMents = async (params: SearchProp): Promise<FetchResultResp<Doctor[]>> => {
  try {
    const res = await fetch(CONST.BASE_URL + '/home?' + objectToURL(params), {
      headers: {
        'Authorization': 'Bearer ' + cookies().get(CONST.COOKIE)?.value
      },
      next: {
        revalidate: 3000
      }
    })
    return await res.json()
  } catch (e: any) {
    return { status: false, message: e.message, data: null }
  }
}

const Page = async ({ searchParams }: PageProp) => {

  const { status, message, data } = await getAppointMents(searchParams)

  return status ? <div className="flex lg:flex-nowrap lg:space-x-36 justify-between mb-5">
    <h1 className="text-3xl mt-3 lg:mt-10 w-full mb-6 lg:w-5/12">
      Select your doctor and appointment time
    </h1>
    <div className="w-full lg:w-7/12">
      <div className="flex space-x-3 justify-between">
        <div className="w-1/3">
          <label className="block w-full ">
            <span className="block">Date</span>
            <DateInput type="calendar" />
          </label>
        </div>
        <div className="w-1/3">
          <label className="block w-full ">
            <span className="block">Time</span>
            <DateInput type="clock" />
          </label>
        </div>
        <div className="w-1/3">
          <label className="block w-full ">
            <span className="block">Expertise</span>
            <DateInput type="select" />

          </label>
        </div>
      </div>
      <div className='mt-3'>
        {
          data?.length ?
            data?.map((item, i) =>
              <Card data={item} className="mb-5" key={i} />
            ) :
            null
        }
      </div>
    </div>
  </div> :
    <div className="mt-10 block mx-auto text-lg text-red-800 bg-red-500">
      Something went wrong on, please try again!
    </div>
};

export default Page;
