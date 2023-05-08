import React, { useState, useEffect } from 'react'
import useQuery from '../utils/useQuery';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data'
import { Spinner, RecipeCard, NoResult } from './'

const Feed = () => {

  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(false);
  let query = useQuery();
  const categoryId = query.get("category");

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const queryTerm = searchQuery(categoryId);
      client.fetch(queryTerm).then((data) => {
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
  }, [categoryId]);

  const ideaName = categoryId || "new";

  if (loading) {
    return (<Spinner message={`We are adding ${ideaName} recipes to your feed`} />);
  }

  return (
    <div className='flex flex-col gap-2 h-full '>
      {posts.length
        ? posts?.map((post) => (<RecipeCard post={post} key={post._id} />))
        : <NoResult text={`Sorry , No Recipes Found`} />
      }
    </div>
  )
}

export default Feed