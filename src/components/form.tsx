'use client'

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CONST, formHandler } from "@client-lib";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";

type FormProp = { prop: { date: string, time: string }, doctor_id: string }

const Form = ({ prop, doctor_id }: FormProp) => {

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      formHandler(e, ['confirmed'])
      setLoading(true)
      const promise = await fetch(CONST.BASE_URL + '/api/appointment', {
        body: JSON.stringify({ doctor_id, date: prop.date, time: prop.time }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        credentials: 'include'
      })
      const result = await promise.json()
      result.status ? toast.success('Appointment booked') : toast.error(result.message)
    } catch (e: any) {
      toast.error(e.message)
    }
    setLoading(false)
  }

  return <form onSubmit={handleSubmit}>
    <label className="flex items-center mt-5">
      <input disabled={loading} required name='confirmed' type="checkbox" className="accent-green-800 inline-block w-5 h-5" />
      <span className="inline-block ms-2">I certify that i have read and accept the terms of Temple</span>
    </label>
    <div className="flex justify-end mt-5">
      <button type='submit' disabled={loading} className="disabled:opacity-70 bg-green-900 px-7 active:ring-2 ring-green-600 py-2 rounded-3xl text-white border-none">
        {loading && <FontAwesomeIcon icon={faSpinner} className='mr-2 animate-spin' />}
        Schedule Appointment</button>
    </div>
  </form>;
};

export default Form;
