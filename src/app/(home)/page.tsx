import Card from "@components/card";
import DateInput from "@components/date";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";

const Page = () => {
  return <div className="flex space-x-36 justify-between mb-5">
    <h1 className="text-3xl mt-10 w-5/12">
      Select your doctor and appointment time
    </h1>
    <div className="w-7/12">
      <div className="flex space-x-3 justify-between">
        <div className="w-1/3">
          <label className="block w-full ">
            <span className="block">Date</span>
            <DateInput type="date" placeholder="Select date" icon={faCalendar} />
          </label>
        </div>
        <div className="w-1/3">
          <label className="block w-full ">
            <span className="block">Time</span>
            <DateInput type="time" placeholder="Select time range" icon={faClock} />
          </label>
        </div>
        <div className="w-1/3">
          <label className="block w-full ">
            <span className="block">Expertise</span>
            <select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            ">
              <option value="">Junior level</option>
              <option value="">Middle level</option>
              <option value="">Senior level</option>
            </select>
          </label>
        </div>
      </div>

      <div className='mt-3'>
        {
          Array(10).fill(0).map((_, i) =>
            <Card className="mb-5" visit={i % 2 ? 'Virtual' : 'In-person'} key={i} />
          )
        }
      </div>


    </div>
  </div>;
};

export default Page;
