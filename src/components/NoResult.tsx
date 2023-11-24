import React from "react";
import { GiPeriscope } from "react-icons/gi";

interface Props {
  text: string;
}

const NoResult = ({ text }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full pt-12">
      <p className="text-8xl text-green-600">
        <GiPeriscope />
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
