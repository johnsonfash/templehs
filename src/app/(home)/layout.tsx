import Button from "@components/button";
import Navbar from "@components/navbar";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-2">
        <div className="py-4 sticky inline-block bg-white w-1/4 top-0">
          <Button action="back" >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="inline-block ml-3">Go back</span>
          </Button>
        </div>
        {children}
      </div>
    </main>
  );
}

export default HomeLayout;