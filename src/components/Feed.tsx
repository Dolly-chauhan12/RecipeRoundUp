import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";
import useQuery from "../utils/useQuery";
import { client } from "../client";
import {
  feedQuery,
  feedQueryByLikes,
  searchQuery,
  searchQueryByLikes,
  nextPageQueryFeed,
  nextPageQueryFeedByLikes,
  nextPageQueryCategory,
  nextPageQueryCategoryByLikes,
} from "../utils/data";
import { Spinner, RecipeCard, NoResult } from "./";
import { RecipePost } from "../types";

const Feed = () => {
  const [posts, setPosts] = useState<RecipePost[]>([]);
  const [sortBy, setSortBy] = useState<string>("dateCreated"); // Default sort option

  const [loading, setLoading] = useState<boolean>(false);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  const lastId = useRef<string | null>(null);
  const lastCreatedAt = useRef<string | null>(null);
  const lastLikesCount = useRef<number | null>(null);

  let query: URLSearchParams = useQuery();

  const categoryId = query.get("category");

  useEffect(() => {
    let results: RecipePost[] = [];
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

        if (results.length > 0) {
          if (sortBy === "likeCount") {
            lastLikesCount.current = results[results.length - 1].likes.length;
          } else {
            lastCreatedAt.current = results[results.length - 1]._createdAt;
          }
          lastId.current = results[results.length - 1]._id;
        } else {
          lastId.current = null; // Reached the end
        }
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

        if (results.length > 0) {
          if (sortBy === "likeCount") {
            lastLikesCount.current = results[results.length - 1].likes.length;
          } else {
            lastCreatedAt.current = results[results.length - 1]._createdAt;
          }

          lastId.current = results[results.length - 1]._id;
        } else {
          lastId.current = null; // Reached the end
        }
      });
    }
    console.log(results);
  }, [categoryId, sortBy]);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const fetchNextData = async () => {
    console.log("reached here");

    if (lastId === null || lastCreatedAt === null) {
      console.log("exited bcz of null");
      return;
    }
    console.log("reached here 1");

    if (categoryId) {
      if (sortBy === "likeCount") {
        let queryTerm = nextPageQueryCategoryByLikes(
          categoryId,
          lastId.current as string,
          lastLikesCount.current as number
        );
        console.log("reached here 2");
        const result = await client.fetch(queryTerm);
        console.log(result);
        console.log("reached here 3");

        if (result.length > 0) {
          lastLikesCount.current = result[result.length - 1].likes.length;
          lastId.current = result[result.length - 1]._id;
        } else {
          lastId.current = null; // Reached the end
        }
        setPosts((current) => [...current, ...result]);

        return;
      } else {
        let queryTerm = nextPageQueryCategory(
          categoryId,
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
        setPosts((current) => [...current, ...result]);

        return;
      }
    } else {
      if (sortBy === "likeCount") {
        let queryTerm = nextPageQueryFeedByLikes(
          lastId.current as string,
          lastLikesCount.current as number
        );
        console.log("reached here 2");
        const result = await client.fetch(queryTerm);
        console.log(result);
        console.log("reached here 3");

        if (result.length > 0) {
          lastLikesCount.current = result[result.length - 1].likes.length;
          lastId.current = result[result.length - 1]._id;
        } else {
          lastId.current = null; // Reached the end
        }
        setPosts((current) => [...current, ...result]);

        return;
      } else {
        let queryTerm = nextPageQueryFeed(
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
        setPosts((current) => [...current, ...result]);

        return;
      }
    }
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

          <InfiniteScroll
            pageStart={0}
            loadMore={fetchNextData}
            hasMore={posts.length < totalPosts}
            loader={<Spinner message="Fetching new recipes for you..." />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
              {posts.map((post) => (
                <RecipeCard post={post} key={post._id} />
              ))}
            </div>
          </InfiniteScroll>
        </>
      ) : (
        <NoResult text={`Sorry , No Recipes Found`} />
      )}
    </div>
  );
};

export default Feed;
