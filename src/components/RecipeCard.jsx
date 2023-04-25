import React from 'react'
import { Link } from 'react-router-dom'
import { GoVerified } from 'react-icons/go';


const RecipeCard = ({ post }) => {

  const { postedBy, image, _id, title, recipe, likes } = post;


  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-3'>
      <div>
        <div className='flex gap-2 p-2 cursor-pointer font-semibold rounded '>
          <div className='md:w-14 md:h-12 w-10 h-10'>
            <Link to={`/user-profile/${postedBy?._id}`}>
              <>
                <img
                  width={44}
                  height={44}
                  className=' rounded-full'
                  src={postedBy?.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div className='md:w-40 md:h-12 w-30 h-10 flex items-center'>
            <Link to={`/user-profile/${postedBy?._id}`}>
              <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                {postedBy.userName}{' '}
                <GoVerified className='text-blue-400 text-md' />
              </p>

            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative'>
        <div>
          <Link to={`/post-detail/${_id}`}>
            <p className=' font-semibold mb-1'>{title} </p>
            <img
              alt="recipe"
              src={image.asset.url}
              className='lg:w-[600px] lg:h-[372px] md:w-[450px] md:h-[400px]  w-[350px] h-[240px] rounded-2xl cursor-pointer bg-gray-100'
            ></img>
            <p className='font-bold mt-1'>Liked by {likes?.length ? likes?.length : 0} people</p>
          </Link>
        </div>
        <div className=' w-1/2 mt-1 h-[390px] overflow-hidden'>

          <p className='text-clip '>{recipe}</p>


        </div>
      </div>

    </div>
  )
}

export default RecipeCard