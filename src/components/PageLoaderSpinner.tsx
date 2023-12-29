import React from "react";
import { Watch } from "react-loader-spinner";

const PageLoaderSpinner = (props: { message: string }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-900/20 ">
      <Watch
        height="115"
        width="250"
        radius="48"
        color="#17803D"
        ariaLabel="watch-loading"
        visible={true}
      />
      <p className="text-xl text-center px-2 my-2 ">{props.message}</p>
    </div>
  );
};

export default PageLoaderSpinner;
