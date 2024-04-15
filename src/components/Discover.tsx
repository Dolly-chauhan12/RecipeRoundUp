import React from "react";
import { Link } from "react-router-dom";
import useQuery from "../utils/useQuery";
import { categories } from "../assets/constant";

const Discover = () => {
  let query: URLSearchParams = useQuery();
  const category = query.get("category");

  const activeTopicStyle =
    "xl:border-2  xl:border-green-800 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-green-700 ";
  const topicStyle =
    "xl:border-2 hover:bg-emerald-800 hover:text-white hover:border-none xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-gray-500 group ";

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6 max-h-screen overflow-y-auto pt-1">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {categories?.map((item) => (
          <Link to={`/home/?category=${item.name}`} key={item.name}>
            <div
              className={category === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md lg:group-hover:animate-bounce">
                {item.icon}
              </span>
              <span
                className={`font-medium text-md hidden xl:block capitalize`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
