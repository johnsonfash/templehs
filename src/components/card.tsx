'use client'

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRef, useState } from "react";


interface CardProps {
  className?: string
  visit?: 'Virtual' | 'In-person'
}

const Card = ({ className, visit }: CardProps) => {
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
            <img src="/avatar.png" className="cover-full" alt="" />
          </div>
          <div>
            <h4 className="text-xl">Leo Standon, MD</h4>
            <p className='text-slate-600'>Care Team Clinician Supervisor</p>
          </div>
        </div>
        <div className={`whitespace-nowrap ${visit === 'Virtual' ? 'bg-green-100 py-1 text-green-700' : 'bg-blue-100 py-1 text-blue-500'} px-5`}>{visit} visit only</div>
      </div>
      <div className="px-4 py-3">
        <p className='text-slate-600 line-clamp-3'>Dr. Lao Noto is a board certified intermist with a broad experience treating both complex and simple medical conditions. He has been practicing for more than 10 years. He graduated from Turf Univ...</p>
        <p className="text-md text-slate-800 my-3 font-semibold">Next Availability Slots</p>
        <div className="flex items-center">
          <div ref={timeSlotRef} className="text-sm overflow-slider w-full">
            {
              Array(10).fill(0).map((_, i) =>
                <Link href='/1' key={i} className="mr-3 whitespace-nowrap inline-flex border-slate-300 border py-3 px-4 rounded-full">
                  <span className='font-semibold me-1'>Today,</span>
                  <span>3:{i}PM</span>
                </Link>
              )
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
