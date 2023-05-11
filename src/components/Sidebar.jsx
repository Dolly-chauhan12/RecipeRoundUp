import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im'
import { Discover } from './';
import useAuthStore from '../store/authStore';
import Logo from '../assets/logo3.png'

const Sidebar = () => {


  const [showSidebar, setshowSidebar] = useState(true);
  const { userProfile } = useAuthStore();

  return (
    <div>
      <div className='block xl:hidden m-2 mt-3 text-xl' onClick={() => setshowSidebar((prev) => (!prev))}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-80 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4 flex flex-col'>

            <div className='xl:w-78 w-18 h-10 xl:h-24 '>
              <img className=' h-full w-full' src={Logo} alt='rrlogo' />
            </div>


            <Link to="/">
              <div className='flex items-center gap-3 bg-gray-200 p-3 justify-center xl:justify-start cursor-pointer font-semibold text-emerald-600 rounded mt-1 xl:mt-2 '>
                <p className='text-2xl'> <AiFillHome /></p>
                <span className='capitalize text-xl hidden xl:block'>Home</span>

              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <span className='text-gray-400'> Log in to like,comment and share your recipes</span>
              <button className='bg-white text-lg border-[1px] border-[#3A5A40] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#3A5A40] hover:cursor-default'>Log in</button>
            </div>
          )}

          <Discover />
          <div>
            <p className='text-gray-500 text-lg  mt-5 hidden xl:block'>© 2023 RecipeRoundup(RR)</p>
          </div>

        </div>
      )}
    </div>
  )
}

export default Sidebar