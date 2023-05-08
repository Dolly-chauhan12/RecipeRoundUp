import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import useAuthStore from '../store/authStore';
import { client } from '../client';
import { userCreatedPostsQuery, userLikedPostsQuery } from '../utils/data';
import { RecipeCard, NoResult, Spinner } from './'

const UserDetail = ({ user }) => {

  const { removeUser } = useAuthStore();
  const [postsList, setPostsList] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUserPost, setShowUserPost] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();

  const videos = showUserPost ? 'border-b-2 border-green' : 'text-gray-400';
  const liked = !showUserPost ? 'border-b-2 border-green' : 'text-gray-400';

  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true);
      if (showUserPost) {
        const postsQuery = userCreatedPostsQuery(userId);
        client.fetch(postsQuery).then((data) => {
          setPostsList(data)
        });
      } else {
        const postsQuery = userLikedPostsQuery(userId);
        client.fetch(postsQuery).then((data) => {
          setPostsList(data)
        });
      }
      setLoading(false);
    }

    fetchPosts();
  }, [showUserPost, userId]);

  if (loading) {
    return (<Spinner message="We are fetching your recipes " />);
  }

  return (
    <div className='pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-6'>
          <div className='flex items-center mt-2 gap-1 pt-1'>

            <img
              className='rounded-full w-10 h-10 md:w-16 md:h-16 shadow-xl object-cover'
              src={user.image}
              alt="user-pic"
            />
            <h1 className='font-bold text-sm md:text-3xl text-center mt-2 pl-2'>
              {user.userName}
            </h1>
          </div>

          <div className='absolute top-2 z-1 right-0 p-2 font-bold'>
            <button
              type='button'
              onClick={() => {
                googleLogout();
                removeUser();
                navigate('/');
              }}
              className='border-2 rounded-full cursor-pointer outline-none shadow-md px-4 py-1.5 md:px-8 md:py-3'
            >
              Logout
            </button>
          </div>
        </div>
        <div className='mb-7 flex  w-full border-gray-200 bg-white gap-10'>
          <p className={`text-xl font-semibold cursor-pointer mt-1 ${videos}`} onClick={() => setShowUserPost(true)}>Your Posts</p>
          <p className={`text-xl font-semibold cursor-pointer mt-1 ${liked}`} onClick={() => setShowUserPost(false)}>Your Liked Posts</p>
        </div>

        <div className='flex flex-col '>
          {postsList.length ? (
            postsList?.map((post) =>
              (<RecipeCard post={post} key={post._id} />)
            )
          ) :
            <NoResult text={"Not posted recipes yet"} />
          }
        </div>
      </div>

    </div>
  )
}

export default UserDetail