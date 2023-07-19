'use client'
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fields } from "@client-lib";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

const DateInput = ({ type }: { type: "clock" | "calendar" | 'select' }) => {
  const [loading, setLoading] = useState(false)
  const [clock, setClock] = useState<any>(new Date());
  const [calendar, setCalendar] = useState<any>(new Date());
  const [invalidClock, setInvalidClock] = useState(false);
  const [invalidCalendar, setInvalidCalendar] = useState(false);
  const route = useRouter()
  const search = useSearchParams();
  const date = search.get('date') ?? ''
  const time = search.get('time') ?? ''
  const field = search.get('field') ?? ''

  useEffect(() => {
    setLoading(false)
  }, [date, time, field]);

  const handleChange = async (value: any, type: 'clock' | 'calendar' | 'select') => {
    setLoading(true)
    if (type == 'clock') {
      invalidClock && setInvalidClock(false)
      setClock(value)
      route.push(`/?date=${date}&time=${value}&field=${field}`)
    } else if (type == 'calendar') {
      const date = new Date(value)
      const newValue = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
      invalidCalendar && setInvalidCalendar(false)
      setCalendar(value)
      route.push(`/?date=${newValue}&time=${time}&field=${field}`)
    } else {
      route.push(`/?date=${date}&time=${time}&field=${value}`)
    }
  }

  const handleInvalid = (type: 'clock' | 'calendar') => {
    type === 'clock' ? setInvalidClock(true) : setInvalidCalendar(true)
  }

  return <div>
    {
      type === 'calendar' ?
        <DatePicker format='dd-MM-y' calendarIcon={<FontAwesomeIcon className={loading ? 'animate-spin' : ''} icon={loading ? faSpinner : faCalendar} />} className={`border ${invalidCalendar && 'border-red-400'} rounded-md`} disabled={loading} onInvalidChange={() => handleInvalid('calendar')} minDate={new Date()} name='calendar' onChange={(e) => handleChange(e, 'calendar')} value={calendar} />
        : type === 'clock' ?
          <div className={`border flex items-center relative ${invalidCalendar && 'border-red-400'} rounded-md`}>
            < TimePicker disabled={loading} onInvalidChange={() => handleInvalid('clock')} minTime={new Date() as any} disableClock name='clock' onChange={(e) => handleChange(e, 'clock')} value={clock} />
            <span className='absolute right-4'>
              <FontAwesomeIcon className={loading ? 'animate-spin text-slate-500' : ''} icon={loading ? faSpinner : faClock} />
            </span>
          </div> :
          <div className='flex items-center relative'>
            <select disabled={loading} onChange={(e) => handleChange(e.target.value, 'select')} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-100
                ">
              <option value="" disabled selected>Select field</option>
              <option value="">All</option>
              {
                fields.map((item, i) =>
                  <option key={i} value={item.n}>{item.n}</option>
                )
              }
            </select>
            {loading && <FontAwesomeIcon icon={faSpinner} className='animate-spin absolute right-6' />}
          </div>
    }
  </div>
};

export default DateInput;
