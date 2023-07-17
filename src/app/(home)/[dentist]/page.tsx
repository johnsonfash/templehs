import { FC } from "react";

interface DentistPageProp {
  params: { dentist: string }
  searchParams: { date: string }
}

const DentistPage: FC<DentistPageProp> = (prop) => {
  return <div>{JSON.stringify(prop)}</div>;
};

export default DentistPage;
