import { cookies } from 'next/headers'
import { CONST, FetchResultResp, User } from "@client-lib";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const getMe = async (): Promise<FetchResultResp<User>> => {
  try {
    const cookie = cookies()?.get(CONST.COOKIE)
    const res = await fetch(CONST.BASE_URL + '/api/auth', {
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`
      },
      next: {
        revalidate: 600
      }
    })
    return await res.json()
  } catch (e: any) {
    return { status: false, message: e.message, data: null }
  }
}

const Navbar = async () => {

  const { status, message, data } = await getMe()

  console.log(data)

  return <nav className="sticky  top-0 border-b border-slate-200 border-solid bg-white">
    <div className="container py-4 mx-auto px-2 flex justify-between items-center">
      <Link href='/' className="text-1xl font-bold">Schedule Appointment</Link>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBell} />
        <div className="h-8 mx-2 w-8 rounded-full overflow-hidden">
          <img src="/avatar.png" className="cover-full" alt="" />
        </div>
        <div>
          <p className="text-sm">{data?.name}</p>
          <p className="text-xs text-slate-400">{data?.email}</p>
        </div>
      </div>
    </div>
  </nav>;
};

export default Navbar;
