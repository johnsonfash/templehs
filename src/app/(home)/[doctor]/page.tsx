import { CONST, Doctor, FetchResultResp, appointmentTIme } from "@client-lib";
import Form from "@components/form";
import { faBell, faCalendarCheck, faClock, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface DentistPageProp {
  params: { doctor: string }
  searchParams: { date: string, time: string }
}

const getDoctor = async (id: string): Promise<FetchResultResp<Doctor>> => {
  try {
    const res = await fetch(CONST.BASE_URL + '/appointment?doctor_id=' + id, {
      next: {
        revalidate: 300
      }
    })
    return await res.json()
  } catch (e: any) {
    return { status: false, message: e.message, data: null }
  }
}

const DentistPage: FC<DentistPageProp> = async ({ params, searchParams }) => {

  const { status, message, data } = await getDoctor(params.doctor)

  return <div className="flex space-x-36 justify-between mb-5">
    <h1 className="text-3xl mt-10 w-5/12">
      Confirm your appointment details.
    </h1>
    <div className="w-7/12">
      <div className='rounded-md shadow-md shadow-slate-400/40'>
        <div className='flex w-full pt-5 px-4'>
          <div className="h-12 mr-3 w-12 min-w-[3rem] min-h-[3rem] rounded-full overflow-hidden flex justify-center items-center">
            <img src={data?.image} className="cover-full" alt="" />
          </div>
          <div>
            <h4 className="text-xl font-medium">{data?.name}, {data?.abbr}</h4>
            <p className='text-slate-600'>{data?.field}</p>
          </div>
        </div>
        <div className="px-4 py-3">
          <table className='table-auto border-spacing-y-3 border-separate'>
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faCalendarCheck} className='mr-2' />
                  Date:
                </td>
                <td className='pl-10 font-medium'>Today, {appointmentTIme(searchParams.date, searchParams.time)}</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faClock} className='mr-2' />
                  Duration:
                </td>
                <td className='pl-10 font-medium'>30 Minutes</td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon icon={faBell} className='mr-2' />
                  Reminders:
                </td>
                <td className='pl-10 font-medium'>
                  <span>fashanutosin7@gmail.com</span>
                  <button className="text-green-800/80 ml-5">Change</button>
                </td>
              </tr>
              <tr className="py-5">
                <td>
                  <FontAwesomeIcon icon={faCreditCard} className='mr-2' />
                  Payment Details:
                </td>
                <td className='pl-10 font-medium'>
                  <span>Mastercard ****6345 - Exp 02/25</span>
                  <button className="text-green-800/80 ml-5">Change</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Form prop={searchParams} doctor_id={params.doctor} />
    </div>
  </div>;
};

export default DentistPage;
