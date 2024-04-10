import React from "react";
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { RecipePost } from "../types";

interface RecipeCardProps {
  post: RecipePost;
  searchPage?: boolean;
}
const colors = [
  "bg-orange-100",
  "bg-lime-100",
  "bg-amber-100",
  "bg-slate-100",
  "bg-green-100",
  "bg-indigo-100",
  "bg-red-100",
  "bg-cyan-100",
  "bg-violet-100",
  "bg-fuchsia-100",
];

const RecipeCard = ({ post, searchPage }: RecipeCardProps) => {
  const { postedBy, image, _id, title, recipe, likes } = post;

  const random = Math.floor(Math.random() * colors.length);

  const cardClass = `flex flex-col rounded-md  pb-3 transform duration-500 hover:-translate-y-2 hover:shadow-2xl ${colors[random]}`;

  return (
    <div className={cardClass}>
      <div>
        <div className="flex gap-1.5 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-14 md:h-12 w-10 h-10 pl-1">
            <Link to={`/home/user-profile/${postedBy?._id}`}>
              <>
                <img
                  width={44}
                  height={44}
                  className="rounded-full"
                  src={postedBy?.image}
                  referrerPolicy="no-referrer"
                  alt="user-profile"
                />
              </>
            </Link>
          </div>
          <div className="md:w-60 md:h-12 w-30 h-10 flex items-center">
            <Link to={`/home/user-profile/${postedBy?._id}`}>
              <p className="flex gap-2 items-center md:text-lg font-bold  hover:underline font-PTserif">
                {postedBy.userName}{" "}
                <GoVerified className="text-blue-400 text-md" />
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className=" flex gap-4 relative ml-3">
        <Link to={`/home/post-detail/${_id}`}>
          <div className="group flex justify-center text-center relative overflow-hidden rounded-md cursor-pointer p-8">
            <img
              alt="recipe"
              src={image.asset.url}
              className="lg:w-[600px] lg:h-[372px] md:w-[550px] md:h-[400px]  sm:w-[86vw] sm:h-[56vh] w-[80vw] h-[40vh] object-cover rounded-2xl cursor-pointer bg-gray-100 ease-in-out duration-500  md:group-hover:scale-110 "
            ></img>
          </div>
          <div>
            <h2 className=" font-semibold text-2xl line-clamp-1 px-8 font-hind">
              {title}{" "}
            </h2>
          </div>

          <p className="font-bold mt-1 px-8">
            Liked by {likes?.length ? likes?.length : 0} people
          </p>
        </Link>
        {/* {recipe && recipe.length > 0 && !searchPage && (
          <div className="w-1/2 mt-2 pt-5  h-[390px]  hidden md:block ml-1">
            <p className="line-clamp-15  font-medium whitespace-pre-wrap font-lexend">
              {recipe}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default RecipeCard;

// border-b-2 border-gray-200
// md:group-hover:rotate-3
// md:group-hover:opacity-80
