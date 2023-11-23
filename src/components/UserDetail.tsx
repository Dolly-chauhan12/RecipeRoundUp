import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import {
  userQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../utils/data";
import { RecipeCard, NoResult, Spinner } from "./";

const UserDetail = ({ viewer }) => {
  const [user, setUser] = useState("");
  const [postsList, setPostsList] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUserPost, setShowUserPost] = useState(true);

  const { userId } = useParams();

  const posted = showUserPost
    ? " border-b-2 border-green-800 text-green-800"
    : "text-gray-400";
  const liked = !showUserPost
    ? "border-b-2 border-green-800 text-green-800"
    : "text-gray-400";

  useEffect(() => {
    const fetchUser = async () => {
      const query = userQuery(userId);
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    };

    const fetchPosts = async () => {
      setLoading(true);
      if (showUserPost) {
        const postsQuery = userCreatedPostsQuery(userId);
        client.fetch(postsQuery).then((data) => {
          setPostsList(data);
          // console.log(postsList)
        });
      } else {
        const postsQuery = userLikedPostsQuery(userId);
        client.fetch(postsQuery).then((data) => {
          setPostsList(data);
        });
      }
      setLoading(false);
    };
    fetchUser();
    fetchPosts();
  }, [showUserPost, userId]);

  if (loading) {
    return <Spinner message="We are fetching user  recipes " />;
  }

  return (
    <div className="pb-2 h-full justify-center items-center mr-1">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-6">
          <div className="flex items-center mt-2 gap-1 pt-1">
            <img
              className="rounded-full w-10 h-10 md:w-16 md:h-16 shadow-xl object-cover"
              src={user.image}
              referrerPolicy="no-referrer"
              alt="user-pic"
            />
            <h1 className="font-bold text-sm md:text-3xl text-center mt-2 pl-2">
              {user.userName}
            </h1>
          </div>
        </div>
        <div className="mb-7 flex  w-full border-gray-200 bg-white justify-evenly text-center">
          <p
            className={`text-xl font-semibold cursor-pointer w-1/2 mt-1 py-2 ${posted}`}
            onClick={() => setShowUserPost(true)}
          >
            Posted by user
          </p>
          {viewer?._id === userId ? (
            <p
              className={`text-xl font-semibold cursor-pointer w-1/2 mt-1 py-2 ${liked}`}
              onClick={() => setShowUserPost(false)}
            >
              Your Liked Recipes
            </p>
          ) : (
            <></>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-[1800px]:grid-cols-3 gap-2 justify-items-center lg:justify-items-start">
          {postsList.length ? (
            postsList?.map((post) => <RecipeCard post={post} key={post._id} />)
          ) : (
            <NoResult text={"Not posted any recipes yet"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
