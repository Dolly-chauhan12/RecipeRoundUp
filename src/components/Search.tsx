import React from "react";
import { RecipeCard, NoResult, Spinner } from "./";
import { useEffect, useState } from "react";
import { client } from "../client";
import { searchQuery, feedQuery } from "../utils/data";
import { RecipePost } from "../types";
import { defaultRecipePost } from "../assets/constant";

interface SearchProps {
  searchTerm: string;
}

const Search = ({ searchTerm }: SearchProps) => {
  const [posts, setPosts] = useState<RecipePost[]>([defaultRecipePost]);
  const [loading, setLoading] = useState(false);

  const fetchSearchPosts = () => {
    if (searchTerm !== "") {
      setLoading(true);
      const query = searchQuery(searchTerm);
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    fetchSearchPosts();
    // eslint-disable-next-line
  }, [searchTerm]);

  if (loading) {
    return <Spinner message="Searching pins" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-[1800px]:grid-cols-3 gap-1 justify-items-center lg:justify-items-start h-full">
      {posts.length ? (
        posts?.map((post) => (
          <RecipeCard post={post} key={post._id} searchPage={true} />
        ))
      ) : (
        <NoResult text={`Sorry , No Recipes Found`} />
      )}
    </div>
  );
};

export default Search;
