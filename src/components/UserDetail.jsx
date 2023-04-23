import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import useAuthStore from '../store/authStore';
import { client } from '../client';
import { userCreatedPostsQuery } from '../utils/data';
import { RecipeCard, NoResult } from './'

const UserDetail = ({ user }) => {

  const { removeUser } = useAuthStore();
  const [postsList, setPostsList] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {

    const fetchPosts = async () => {

      const postsQuery = userCreatedPostsQuery(userId);
      client.fetch(postsQuery).then((data) => {
        setPostsList(data)
        console.log(data);
      });
    }

    fetchPosts();

  }, [userId]);



  return (
    <div className="pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex items-center mt-2">

            <img
              className="rounded-full w-20 h-20 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3 pl-2">
              {user.userName}
            </h1>
          </div>

          <div className="absolute top-2 z-1 right-0 p-2 font-bold">
            <button
              type='button'
              onClick={() => {
                googleLogout();
                removeUser();
                navigate('/');
              }}
              className='border-2  rounded-full cursor-pointer outline-none shadow-md px-8 py-3'
            >
              Logout
            </button>
          </div>
        </div>
        <div className="text-center mb-7">
          <p className='text-xl font-semibold'>Your Recipes</p>
        </div>

        <div className='flex flex-wrap md:justify-start'>
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