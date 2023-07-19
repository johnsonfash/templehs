'use client'

import { CONST, formHandler } from "@client-lib";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: true, message: '' })
  const [password, setPassword] = useState(true);
  const route = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const data = formHandler(e, ['email', 'password'])
      setError({ status: true, message: '' })
      setLoading(true)
      const result = await fetch(CONST.BASE_URL + '/api/auth', {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = await result.json()
      if (res.status) {
        console.log(res)
        route.push('/')
      } else {
        setError(res)
      }
    } catch (e: any) {
      setError({ status: false, message: e.message })
    }
    setLoading(false)
  }

  return <div className="container mx-auto">
    <div className="w-full md:px-5 lg:w-6/12 mx-auto mt-12 shadow-lg rounded-sm border">
      <form onSubmit={handleSubmit} className="bg-white rounded-md px-3 py-5">
        <div className="text-center mb-3">
          <h4 className="text-2xl font-semibold">Login</h4>
          <small className="text-sm" >Log in using email address</small>
        </div>
        <div className={`${!error.status && 'border-red-500'} border flex rounded-md flex-col-reverse pt-3 rounded-2 my-2 px-2 pb-1`}>
          <input disabled={loading} name='email' type="email" required className="border-0 outline-0 pr-5" placeholder="you@mail.com" />
          <label htmlFor="email" className="text-slate-600 w-full">Email address</label>
        </div>
        <div className='flex mt-4 items-center relative w-100'>
          <div className={`${!error.status && 'border-red-500'} border w-full rounded-md flex flex-col-reverse pt-3 rounded-2 px-2 pb-1`}>
            <input required disabled={loading} name='password' type={password ? 'password' : 'text'} className="border-0 outline-0 pr-5" placeholder="********" />
            <label htmlFor="password" className="text-slate-600 w-full">Password</label>
          </div>
          <span onClick={() => setPassword(!password)} className="block right-0 pe-2 text-slate-600 cursor-pointer absolute"><FontAwesomeIcon icon={password ? faEye : faEyeSlash} /></span>
        </div>
        <small className="mt-2 text-red-700 block">
          {!error?.status ? (`* ${error.message}`) : null}
        </small>
        <button type="submit" disabled={loading} className="block bg-blue-600 mt-6 disabled:bg-blue-400 w-full p-2 rounded-lg border-none text-white">
          {loading && <FontAwesomeIcon icon={faSpinner} className='mr-2 animate-spin' />}
          Login
        </button>
        <div className="my-3 text-center">
          <small>Need to create an account? <Link href='/register' className="no-underline text-opacity-0">Sign Up</Link></small>
        </div>
      </form>
    </div>
  </div>;
};

export default LoginPage;
