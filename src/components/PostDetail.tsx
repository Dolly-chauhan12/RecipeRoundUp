import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Comments, CreateComment, Spinner } from "./";
import { client } from "../client";
import { postDetailQuery } from "../utils/data";
import { v4 as uuidv4 } from "uuid";
import { BsThreeDotsVertical, BsPencilSquare } from "react-icons/bs";
import { LikeButton } from "./";
import { RecipeDetail, User } from "../types";
import { defaultRecipeDetail } from "../assets/constant";
interface PostDetailProps {
  user: User | null;
}

const PostDetail = ({ user }: PostDetailProps) => {
  const { postId } = useParams() as { postId: string };

  const [postDetail, setPostDetail] =
    useState<RecipeDetail>(defaultRecipeDetail);

  const [showMenubar, setshowMenubar] = useState<boolean>(false);

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
            <h1 className="text-4xl break-words mt-3 mb-2 font-poppins">
              {postDetail.title}
            </h1>

            <div className="flex place-content-between">
              <div>
                {user && (
                  <LikeButton
                    likes={postDetail.likes}
                    flex="flex"
                    handleLike={() => handleLike()}
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
                          to={`/home/post/edit/${postId}`}
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
                <h2 className="text-xl font-normal my-1 font-poppins">
                  {" "}
                  Ingredients
                </h2>
                <div className="flex flex-wrap my-1 py-1 ">
                  {postDetail.ingredients.map((tag, index) => (
                    <span
                      className={`inline-block font-montaguSlab px-3 py-1 rounded-full mr-2 mb-2 hover:scale-110 duration-500 ease-in-out ${
                        index % 2 === 0 ? "bg-green-200" : "bg-green-400"
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
              to={`/home/user-profile/${postDetail?.postedBy._id}`}
              className="flex gap-2 items-center bg-white rounded-lg "
            >
              <img
                src={postDetail?.postedBy?.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold font-PTserif hover:underline">
                {postDetail?.postedBy.userName}
              </p>
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-bold my-1 font-hind">
              {" "}
              Cooking Instructions{" "}
            </h2>
            <div className="font-normal text-large whitespace-pre-wrap mt-2 p-2 rounded-md border border-slate-300 shadow-lg font-lexend">
              {postDetail.recipe}
            </div>
          </div>
          <br />

          {user && (
            <CreateComment
              user={user}
              postId={postId}
              postDetail={postDetail}
              setPostDetail={setPostDetail}
            />
          )}
          <Comments postDetail={postDetail} />

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
