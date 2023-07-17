'use client'

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLInputTypeAttribute, useState } from "react";

const DateInput = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { icon: IconProp }) => {
  const [type, setType] = useState<HTMLInputTypeAttribute | undefined>('text')
  return <div className="relative -z-10 flex items-center">
    <input {...props} type={type} onFocus={() => setType(props.type)} onBlur={() => setType('text')} className="mt-1 pe-10 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500
"/>
    <span className="inline-block absolute end-0 mr-4 text-xs mt-1">
      <FontAwesomeIcon icon={props.icon} />
    </span>
  </div>;
};

export default DateInput;
