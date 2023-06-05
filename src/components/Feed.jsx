import React, { useState, useEffect } from "react";
import useQuery from "../utils/useQuery";
import { client } from "../client";
import {
  feedQuery,
  feedQueryByLikes,
  searchQuery,
  searchQueryByLikes,
} from "../utils/data";
import { Spinner, RecipeCard, NoResult } from "./";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("dateCreated"); // Default sort option

  const [loading, setLoading] = useState(false);
  let query = useQuery();
  const categoryId = query.get("category");

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      let queryTerm;
      if (sortBy === "likeCount") {
        queryTerm = searchQueryByLikes(categoryId);
      } else {
        queryTerm = searchQuery(categoryId);
      }
      client.fetch(queryTerm).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      let queryTerm;
      if (sortBy === "likeCount") {
        queryTerm = feedQueryByLikes;
      } else {
        queryTerm = feedQuery;
      }

      client.fetch(queryTerm).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [categoryId, sortBy]);

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const ideaName = categoryId || "new";

  const buttonStyle =
    " border-2 p-2  cursor-pointer outline-none shadow-sm flex rounded-full items-center gap-2 justify-center m-1.5 lg:m-1 w-1/4 hover:bg-slate-200";

  const activeButtonStyle =
    "border-2 p-2  cursor-pointer outline-none shadow-sm flex rounded-full items-center gap-2 justify-center m-1.5 lg:m-1 text-green-600 border-green-600  font-bold  w-1/4 ";

  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} recipes to your feed`} />
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full ">
      {posts.length > 0 ? (
        <>
          <div className="w-full flex justify-center">
            <button
              type="button"
              className={`${
                sortBy === "dateCreated" ? activeButtonStyle : buttonStyle
              }`}
              onClick={() => handleSortChange("dateCreated")}
            >
              Latest
            </button>
            <button
              type="button"
              className={`${
                sortBy === "likeCount" ? activeButtonStyle : buttonStyle
              }`}
              onClick={() => handleSortChange("likeCount")}
            >
              Popular
            </button>
          </div>

          {posts.map((post) => (
            <RecipeCard post={post} key={post._id} />
          ))}
        </>
      ) : (
        <NoResult text={`Sorry , No Recipes Found`} />
      )}
    </div>
  );
};

export default Feed;
