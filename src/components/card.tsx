/* eslint-disable @next/next/no-img-element */
'use client'

import { Doctor, timeConv } from "@client-lib";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface CardProps {
  className?: string
  data?: Doctor
}

const Card = ({ className, data }: CardProps) => {
  const timeSlotRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState(1)

  const slide = (direction: 'front' | 'back') => {
    if (timeSlotRef.current) {
      const max = timeSlotRef.current.scrollWidth - timeSlotRef.current.clientWidth
      timeSlotRef.current.scrollLeft += direction === 'front' ? 400 : -400
      if (timeSlotRef.current.scrollLeft === 0) {
        setDim(1)
      } else if (max === timeSlotRef.current.scrollLeft) {
        setDim(2)
      }
    }
  }

  return (
    <div className={`${className} rounded-md shadow-md shadow-slate-400/40`}>
      <div className='flex items-start'>
        <div className='flex w-full pt-5 px-4'>
          <div className="h-12 mr-3 w-12 min-w-[3rem] min-h-[3rem] rounded-full overflow-hidden flex justify-center items-center">
            <img src={data?.image} className="cover-full" alt="" />
          </div>
          <div>
            <h4 className="text-xl">{data?.name}, {data?.abbr}</h4>
            <p className='text-slate-600'>{data?.field}</p>
          </div>
        </div>
        <div className={`whitespace-nowrap ${data?.visit_type === 'Virtual' ? 'bg-green-100 py-1 text-green-700' : 'bg-blue-100 py-1 text-blue-500'} px-5`}>{data?.visit_type} visit only</div>
      </div>
      <div className="px-4 py-3">
        <p className='text-slate-600 line-clamp-3'>{data?.bio}</p>
        <p className="text-md text-slate-800 my-3 font-semibold">Next Availability Slots</p>
        <div className="flex items-center">
          <div ref={timeSlotRef} className="text-sm overflow-slider w-full">
            {
              data?.available_time?.length ?
                data?.available_time?.map((time, i) =>
                  <Link href={`/${data.id}?date=${data?.available_date ? data?.available_date[i] : ''}&time=${time}`} key={i} className="mr-3 whitespace-nowrap inline-flex border-slate-300 border py-3 px-4 rounded-full">
                    <span className='font-semibold me-1'>Today,</span>
                    <span>{timeConv(time)}</span>
                  </Link>
                ) : null
            }
          </div>
          <div className='whitespace-nowrap pl-5 flex space-x-5 text-xl'>
            <button disabled={dim == 1} className='disabled:text-slate-300' onClick={() => slide('back')}><FontAwesomeIcon icon={faChevronLeft} /></button>
            <button disabled={dim == 2} className='disabled:text-slate-300' onClick={() => slide('front')}><FontAwesomeIcon icon={faChevronRight} /></button>
          </div>
        </div>
        <div className="mt-5 text-green-700 mb-2">
          <Link href='/' className="">Check full profile and availability</Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
