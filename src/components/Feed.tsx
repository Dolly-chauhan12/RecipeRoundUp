import { useState, useEffect, useRef } from "react";
import useQuery from "../utils/useQuery";
import { client } from "../client";
import {
  feedQuery,
  feedQueryByLikes,
  searchQuery,
  searchQueryByLikes,
  nextPageQuery,
} from "../utils/data";
import { Spinner, RecipeCard, NoResult } from "./";
import { RecipePost } from "../types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Feed = () => {
  const [posts, setPosts] = useState<RecipePost[]>([]);
  const [sortBy, setSortBy] = useState<string>("dateCreated"); // Default sort option

  const [loading, setLoading] = useState<boolean>(false);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  const lastId = useRef<string | null>(null);
  const lastCreatedAt = useRef<string | null>(null);

  let query: URLSearchParams = useQuery();

  const categoryId = query.get("category");

  useEffect(() => {
    let results: string | any[] = [];
    console.log("results", results);
    if (categoryId) {
      setLoading(true);
      client
        .fetch(
          `count(*[_type == "post" && title match '${categoryId}*' || category match '${categoryId}*'])`
        )
        .then((data) => setTotalPosts(data));
      let queryTerm;
      if (sortBy === "likeCount") {
        queryTerm = searchQueryByLikes(categoryId);
      } else {
        queryTerm = searchQuery(categoryId);
      }
      client.fetch(queryTerm).then((data) => {
        setPosts(data);
        setLoading(false);
        results = data;
      });
    } else {
      setLoading(true);
      client
        .fetch(`count(*[_type == "post"])`)
        .then((data) => setTotalPosts(data));
      let queryTerm;
      if (sortBy === "likeCount") {
        queryTerm = feedQueryByLikes;
      } else {
        queryTerm = feedQuery;
      }

      client.fetch(queryTerm).then((data) => {
        setPosts(data);
        setLoading(false);
        results = data;
      });
    }
    console.log(results);
    if (results.length > 0) {
      lastCreatedAt.current = results[results.length - 1]._createdAt;
      lastId.current = results[results.length - 1]._id;
    } else {
      lastId.current = null; // Reached the end
    }
  }, [categoryId, sortBy]);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const fetchNextPage = async () => {
    console.log("reached here");
    if (lastId === null || lastCreatedAt === null) {
      console.log("exited bcz of null");
      return;
    }
    setLoading(true);
    console.log(
      "before fetching value of refreces",
      lastId.current,
      " refrence of lastCreatedAt",
      lastCreatedAt.current
    );
    let queryTerm = nextPageQuery(
      lastId.current as string,
      lastCreatedAt.current as string
    );
    const result = await client.fetch(queryTerm);
    console.log(result);

    if (result.length > 0) {
      lastCreatedAt.current = result[result.length - 1]._createdAt;
      lastId.current = result[result.length - 1]._id;
    } else {
      lastId.current = null; // Reached the end
    }
    console.log(
      "After fetching value of refrences",
      lastId.current,
      " refrence of lastCreatedAt",
      lastCreatedAt.current
    );
    setPosts(result);
    setLoading(false);
    return;
  };
  const ideaName = categoryId || "new";

  const buttonStyle =
    " border-2 p-2  cursor-pointer outline-none shadow-sm flex rounded-full items-center gap-2 justify-center m-1.5 lg:m-1 w-1/4 hover:bg-green-800 hover:text-white";

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

          {totalPosts > 10 ? (
            <div className="w-full flex justify-between my-3 text-white">
              <button
                type="button"
                className="flex items-center gap-2 text-xl rounded-md bg-green-900 px-3 py-2 font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900"
              >
                <FaAngleLeft />

                <span>Prev</span>
              </button>
              <button
                type="button"
                onClick={fetchNextPage}
                className="flex items-center gap-2 text-xl rounded-md bg-green-900 px-3 py-2 font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900"
              >
                <span>Next</span>
                <FaAngleRight />
              </button>
            </div>
          ) : (
            <> </>
          )}
        </>
      ) : (
        <NoResult text={`Sorry , No Recipes Found`} />
      )}
    </div>
  );
};

export default Feed;
