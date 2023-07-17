import Card from "@components/card";
import DateInput from "@components/date";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { FC } from "react";

interface DentistPageProp {
  params: { dentist: string }
  searchParams: { date: string }
}

const DentistPage: FC<DentistPageProp> = (prop) => {
  return <div className="flex space-x-36 justify-between mb-5">
    <h1 className="text-3xl mt-10 w-5/12">
      Confirm your appointment details.
    </h1>
    <div className="w-7/12">
      <Card className="mb-5" visit="Virtual" />
    </div>
  </div>;
};

export default DentistPage;
