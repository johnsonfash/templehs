import { SEED_DATABASE, up } from "@serve-lib";

const sleep = () => new Promise(r => setTimeout(() => r, 3000))
const Page = async () => {
  await up()
  await sleep()
  await SEED_DATABASE()
  return <div>Page</div>;
};

export default Page;
