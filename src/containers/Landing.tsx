import { Link } from "react-router-dom";
import { Header } from "../components";
import heroimg from "../assets/hero.png";
const Landing = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-300 flex flex-col ">
      <Header />
      <div
        className="flex 
       h-full w-full "
      >
        <div className="w-full lg:w-1/2 px-3 lg:px-6 flex flex-col gap-4 py-24 lg:py-36 ">
          <h2 className="font-poppins   text-6xl ">
            Discover Simple, Delicious and
            <br />
            <span className="text-green-800">fast recipes !</span>
          </h2>
          <p className="font-lexend text-2xl font-semibold">
            No one is born a great cook. One learns by doing.
          </p>
          <Link to="/home">
            <button className="w-full sm:w-fit bg-black text-white px-6 py-3 rounded-full text-base lg:text-2xl font-montaguSlab">
              Explore
            </button>
          </Link>
        </div>

        <img
          src={heroimg}
          alt="hero-section"
          className="hidden lg:block absolute top-0 right-0 lg:w-1/2 h-screen z-10 "
        />
      </div>
    </div>
  );
};

export default Landing;
