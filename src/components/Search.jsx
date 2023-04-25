import React from 'react'
import { RecipeCard, NoResult, Spinner } from './';
import { useEffect, useState } from 'react';
import { client } from '../client';
import { searchQuery, feedQuery } from '../utils/data';


const Search = ({ searchTerm }) => {
  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(false)

  const fetchSearchPosts = () => {
    console.log(searchTerm)
    if (searchTerm !== '') {

      setLoading(true);
      const query = searchQuery(searchTerm);
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      })
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      })
    }
  }

  useEffect(() => {
    fetchSearchPosts()
  }, [searchTerm])

  if (loading) {
    return <Spinner message="Searching pins" />
  }
  return (
    <div className='flex flex-col gap-10 h-full'>
      {posts.length
        ? posts?.map((post) => (<RecipeCard post={post} key={post._id} />))
        : <NoResult text={`Sorry , No Recipes Found`} />
      }
    </div>
  )
}

export default Search