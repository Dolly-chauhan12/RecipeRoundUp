import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spinner } from './'
import { client } from '../client'
import { postDetailQuery } from '../utils/data'
import { v4 as uuidv4 } from 'uuid';



const PostDetail = ({ user }) => {
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState();
  const [comment, setComment] = useState();
  const [addingComment, setAddingComment] = useState(false);

  const fetchPostDetails = () => {
    const query = postDetailQuery(postId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPostDetail(data[0]);
        console.log(data);
      });
    }
  }


  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  const addComment = () => {

    if (comment) {
      setAddingComment(true);

      client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment('');
          setAddingComment(false);
        });

    };
  }


  if (!postDetail) {
    return (
      <Spinner message="Showing post" />
    );
  }

  return (
    <>
      {postDetail && (
        <div className="flex  flex-col m-auto bg-white my-1" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center  flex-initial w-full h-[200px] md:h-[420px] lg:h-[460px] ">
            <img
              className="rounded-t-3xl rounded-b-lg w-full h-full"
              src={(postDetail?.image.asset.url)}
              alt="user-post"

            />
          </div>

          <div>
            <h1 className="text-4xl font-bold break-words mt-3">
              {postDetail.title}
            </h1>
          </div>

          <Link to={`/user-profile/${postDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
            <img src={postDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
            <p className="font-bold">{postDetail?.postedBy.userName}</p>
          </Link>

          <div><p> Here the recipe text will be rendered
            <br />
            {postDetail.recipe}
          </p></div>

          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='max-h-370 overflow-y-auto'>
            {postDetail?.comments?.map((item) => (
              <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={item.comment}>
                <img
                  src={item.postedBy?.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{item.postedBy?.userName}</p>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          </div>


          <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user._id}`}>
              <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
            </Link>
            <input
              className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
              type="text"
              placeholder="Add a comment "
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={addComment}
            >
              {addingComment ? 'Doing...' : 'Done'}
            </button>
          </div>


        </div>
      )}
    </>
  );
}


export default PostDetail;