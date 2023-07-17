import Navbar from "@components/navbar";

const HomeLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-2 ">
        {children}
      </div>
    </main>
  );
}

export default HomeLayout;