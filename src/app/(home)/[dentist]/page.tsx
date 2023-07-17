'use client'

import { faBell, faCalendarCheck, faClock, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formHandler } from "@lib/form";
import { FC, FormEvent, useState } from "react";

interface DentistPageProp {
  params: { dentist: string }
  searchParams: { date: string }
}

const DentistPage: FC<DentistPageProp> = (prop) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const { confirmed } = formHandler(e, ['confirmed'])
    console.log(confirmed)
  }
  return <div className="flex space-x-36 justify-between mb-5">
    <h1 className="text-3xl mt-10 w-5/12">
      Confirm your appointment details.
    </h1>
    <div className="w-7/12">
      <div className='rounded-md shadow-md shadow-slate-400/40'>
        <div className='flex w-full pt-5 px-4'>
          <div className="h-12 mr-3 w-12 min-w-[3rem] min-h-[3rem] rounded-full overflow-hidden flex justify-center items-center">
            <img src="/avatar.png" className="cover-full" alt="" />
          </div>
          <div>
            <h4 className="text-xl font-medium">Leo Standon, MD</h4>
            <p className='text-slate-600'>Care Team Clinician Supervisor</p>
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
                <td className='pl-10 font-medium'>Tomorrow, June 12. 3:00PM</td>
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
      <form onSubmit={handleSubmit}>
        <label className="flex items-center mt-5">
          <input required name='confirmed' type="checkbox" className="accent-green-800 inline-block w-5 h-5" />
          <span className="inline-block ms-2">I certify that i have read and accept the terms of Temple</span>
        </label>
        <div className="flex justify-end mt-5">
          <button className="bg-green-900 px-7 active:ring-2 ring-green-600 py-2 rounded-3xl text-white border-none">Schedule Appointment</button>
        </div>
      </form>
    </div>
  </div>;
};

export default DentistPage;
