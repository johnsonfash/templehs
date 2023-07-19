import { SEED_DATABASE, up } from "@serve-lib";

const sleep = () => new Promise(r => setTimeout(() => r, 1000))
const Page = async () => {
  await up()
  await SEED_DATABASE()
  return <div>Page is UP</div>;
};

export default Page;
