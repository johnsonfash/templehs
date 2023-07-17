import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return <nav className="sticky  top-0 border-b border-slate-200 border-solid bg-white">
    <div className="container py-4 mx-auto px-2 flex justify-between items-center">
      <h3 className="text-1xl font-bold">Schedule Appointment</h3>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBell} />
        <div className="h-8 mx-2 w-8 rounded-full overflow-hidden">
          <img src="/avatar.png" className="cover-full" alt="" />
        </div>
        <div>
          <p className="text-sm">Pelumi Alesh</p>
          <p className="text-xs text-slate-400">fashanutosin7@gmail.com</p>
        </div>
      </div>
    </div>
  </nav>;
};

export default Navbar;
