import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return <div className="min-h-[75vh] flex w-full items-center justify-center">
    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
  </div>;
};

export default Loading;
