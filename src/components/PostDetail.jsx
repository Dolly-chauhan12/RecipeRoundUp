import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "./";
import { client } from "../client";
import { postDetailQuery } from "../utils/data";
import { v4 as uuidv4 } from "uuid";
import { BsThreeDotsVertical, BsPencilSquare } from "react-icons/bs";
import { LikeButton } from "./";

const PostDetail = ({ user }) => {
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState("");
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [showMenubar, setshowMenubar] = useState(false);

  const fetchPostDetails = () => {
    const query = postDetailQuery(postId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPostDetail(data[0]);
      });
    }
  };

  useEffect(() => {
    fetchPostDetails();
    // eslint-disable-next-line
  }, [postId]);

  const addComment = async () => {
    if (comment) {
      setAddingComment(true);

      const data = await client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit();

      setPostDetail({ ...postDetail, comments: data.comments });

      setComment("");
      setAddingComment(false);
    }
  };

  const handleLike = async () => {
    if (user) {
      const data = await client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .append("likes", [{ _ref: user._id, _key: uuidv4() }])
        .commit();

      setPostDetail({ ...postDetail, likes: data.likes });
    }
  };

  if (!postDetail) {
    return <Spinner message="Showing post" />;
  }

  return (
    <>
      {postDetail && (
        <div
          className="flex  flex-col m-auto bg-white my-1"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div className="flex justify-center items-center  w-full  h-[200px] md:h-[420px] lg:h-[460px] pt-1">
            <img
              className="rounded-3xl  w-full lg:w-[60vw] h-full"
              src={postDetail?.image.asset.url}
              alt="user-post"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold break-words mt-3 mb-2">
              {postDetail.title}
            </h1>

            <div className="flex place-content-between">
              <div>
                {user && (
                  <LikeButton
                    likes={postDetail.likes}
                    flex="flex"
                    handleLike={() => handleLike(true)}
                  />
                )}
              </div>

              {user && user._id === postDetail?.postedBy._id && (
                <div className="px-4 mt-2 relative">
                  <button
                    className="mt-4 pt-2 inline text-md sm:text-xl"
                    onClick={() => setshowMenubar((prev) => !prev)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {showMenubar && (
                    <div className="absolute right-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="none">
                        <Link
                          to={`/post/edit/${postId}`}
                          className="flex px-4 py-2 text-sm text-gray-700"
                        >
                          <BsPencilSquare fontSize={21} className="mr-2" />
                          Edit Recipe
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {postDetail?.ingredients && (
              <div>
                <h2 className="text-xl font-bold my-1"> Ingredients</h2>
                <div className="flex flex-wrap my-1 py-1">
                  {postDetail.ingredients.map((tag, index) => (
                    <span
                      className={`inline-block  px-3 py-1 rounded-full mr-2 mb-2 hover:scale-110 duration-500 ease-in-out ${
                        index % 2 === 0 ? "bg-green-100" : "bg-green-300"
                      }`}
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex my-2">
            <p className="text-lg font-bold mr-2 py-2">By : </p>
            <Link
              to={`/user-profile/${postDetail?.postedBy._id}`}
              className="flex gap-2 items-center bg-white rounded-lg "
            >
              <img
                src={postDetail?.postedBy?.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{postDetail?.postedBy.userName}</p>
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-bold my-1"> Cooking Instructions </h2>
            <div className="font-semibold text-large whitespace-pre-wrap mt-2 p-2 rounded-md border border-slate-300 shadow-lg">
              {postDetail.recipe}
            </div>
          </div>

          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="max-h-370 overflow-y-auto mb-2">
            {postDetail?.comments?.length ? (
              postDetail?.comments?.map((item) => (
                <div
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                  key={item.comment}
                >
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
              ))
            ) : (
              <div className="mb-2">
                <p className="text-lg">No comments till now...</p>
              </div>
            )}
          </div>

          {user && (
            <div className="flex flex-wrap mt-2 mb-2 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
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
                className="bg-green-800 text-white rounded-full px-6 py-2 font-semibold text-base outline-none disabled:opacity-30"
                onClick={addComment}
                disabled={comment.length > 0 ? false : true}
              >
                {addingComment ? "Adding Comment.." : "Comment"}
              </button>
            </div>
          )}

          <span className="text-sm text-slate-400 my-1 ">
            *Please allow a few minutes for new comments to be visible on the
            post.
          </span>
        </div>
      )}
    </>
  );
};

export default PostDetail;
