import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="h-screen lg:h-[88vh] flex flex-grow items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">403</h1>
        <p className="text-gray-600">Oops! Looks Like you are lost.</p>

        <p className="mt-4 text-gray-600">
          <Link
            to="/"
            className="mt-4 inline-block rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-400"
          >
            Let's get you back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
