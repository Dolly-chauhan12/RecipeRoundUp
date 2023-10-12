import React from "react";
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";

const RecipeCard = ({ post, searchPage }) => {
  const { postedBy, image, _id, title, recipe, likes } = post;

  return (
    <div className="flex flex-col rounded-md bg-slate-100 pb-3 transform duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-slate-200">
      <div>
        <div className="flex gap-1.5 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-14 md:h-12 w-10 h-10 pl-1">
            <Link to={`/user-profile/${postedBy?._id}`}>
              <>
                <img
                  width={44}
                  height={44}
                  className="rounded-full"
                  src={postedBy?.image}
                  referrerPolicy="no-referrer"
                  alt="user-profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div className="md:w-60 md:h-12 w-30 h-10 flex items-center">
            <Link to={`/user-profile/${postedBy?._id}`}>
              <p className="flex gap-2 items-center md:text-lg font-bold  hover:underline font-PTserif">
                {postedBy.userName}{" "}
                <GoVerified className="text-blue-400 text-md" />
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative ml-3">
        <div>
          <Link to={`/post-detail/${_id}`}>
            <h2 className=" font-semibold text-2xl mb-1 line-clamp-1 px-2 font-hind">
              {title}{" "}
            </h2>
            <div className="group flex justify-center text-center relative overflow-hidden rounded-md cursor-pointer">
              <img
                alt="recipe"
                src={image.asset.url}
                className="lg:w-[600px] lg:h-[372px] md:w-[550px] md:h-[400px]  sm:w-[86vw] sm:h-[56vh] w-[80vw] h-[40vh] object-cover rounded-2xl cursor-pointer bg-gray-100 ease-in-out duration-500  md:group-hover:scale-125 "
              ></img>
            </div>

            <p className="font-bold mt-1 px-2">
              Liked by {likes?.length ? likes?.length : 0} people
            </p>
          </Link>
        </div>
        {recipe && recipe.length > 0 && !searchPage && (
          <div className="w-1/2 mt-2 pt-5  h-[390px]  hidden md:block ml-1">
            <p className="line-clamp-15  font-medium whitespace-pre-wrap font-lexend">
              {recipe}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;

// border-b-2 border-gray-200
// md:group-hover:rotate-3
// md:group-hover:opacity-80
