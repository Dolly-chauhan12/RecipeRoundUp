import logo from "../assets/RR(Logo2).png";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-12 my-3 z-40">
      <div className="flex items-center justify-around gap-1.5">
        <img src={logo} alt="Recipe roundup logo" width={60} height={60} />
        <p className="font-lexend text-3xl font-bold pt-1.5">RR</p>
      </div>
      <div className="flex items-center justify-around gap-24 font-poppins text-lg">
        <nav>Home</nav>
        <nav className="text-white">Recipes</nav>
        <nav className="text-white">About</nav>
        <nav>
          <button className="bg-black text-white p-3 rounded-full ">
            Submit a recipe
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
