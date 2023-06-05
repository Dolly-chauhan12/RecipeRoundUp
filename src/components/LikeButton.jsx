import React from "react";
import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeButton = ({ likes, handleLike, flex }) => {
  const { userProfile } = useAuthStore();

  const [alreadyLiked, setAlreadyLiked] = useState(false);
  let filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`${flex} gap-6`}>
      <div className="mt-4 flex justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div className="bg-primary rounded-full p-2 md:p-4 text-green-900">
            <AiFillLike className="text-lg md:text-4xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-green-800 "
            onClick={handleLike}
          >
            <AiOutlineLike className="text-xl md:text-4xl" />
          </div>
        )}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
