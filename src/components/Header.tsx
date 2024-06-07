import logo from "../assets/RR(Logo2).png";
import {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  MouseEventHandler,
} from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Login } from "./";

const links = [
  {
    id: 1,
    name: "home",
    to: "/home",
  },
  {
    id: 2,
    name: "recipes",
    to: "/home/search",
  },
  {
    id: 3,
    name: "about",
    to: "/about",
  },
];

const Header = () => {
  const sideNavRef = useRef<HTMLDivElement>(null);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: Event) {
    if (
      sideNavRef.current &&
      !sideNavRef?.current?.contains(event.target as Node)
    ) {
      // Clicked outside the side navigation bar, close it
      // Implement your close side navigation bar logic here
      setNav(false);
    }
  }

  return (
    <div className="flex items-center justify-between px-12 my-3 z-40 ">
      <div className="flex items-center justify-around gap-1.5">
        <img src={logo} alt="Recipe roundup logo" width={60} height={60} />
        <p className="font-lexend text-3xl font-bold pt-1.5">RR</p>
      </div>

      <div className="hidden lg:flex items-center justify-around gap-24 font-poppins text-xl   ">
        {links.map(({ id, name, to }) => (
          <nav
            key={id}
            className="cursor-pointer capitalize hover:underline hover:scale-110 duration-100"
          >
            <Link to={to}> {name} </Link>
          </nav>
        ))}
        <nav className="lg:w-52">
          <Login />
        </nav>
      </div>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-30 text-black lg:hidden"
      >
        {!nav && <FaBars size={30} />}
      </div>

      {nav && (
        <div
          className="flex flex-col  pl-4 justify-center items-start absolute top-0 right-0 w-2/3 md:w-2/5 h-full font-poppins text-2xl font-bold gap-12 bg-slate-100"
          ref={sideNavRef}
        >
          {links.map(({ id, to, name }) => (
            <nav
              key={id}
              className="cursor-pointer capitalize hover:underline hover:scale-110 duration-100 underline-offset-4"
            >
              <Link to={to} onClick={() => setNav(!nav)}>
                {" "}
                {name}{" "}
              </Link>
            </nav>
          ))}

          <nav>
            <Login />
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
