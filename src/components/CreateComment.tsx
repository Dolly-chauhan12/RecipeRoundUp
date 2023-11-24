import React, { useState } from "react";
import { client } from "../client";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { RecipeDetail, User } from "../types";

interface CreateCommentProps {
  user: User;
  postId: string;
  postDetail: RecipeDetail;
  setPostDetail: React.Dispatch<React.SetStateAction<RecipeDetail>>;
}

const CreateComment = ({
  user,
  postId,
  postDetail,
  setPostDetail,
}: CreateCommentProps) => {
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

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

  return (
    <>
      <div className="flex flex-wrap mt-2 mb-2 gap-3">
        <Link to={`/user-profile/${user._id}`}>
          <img
            src={user.image}
            className="w-10 h-10 rounded-full cursor-pointer"
            alt="user-profile"
          />
        </Link>
        <input
          className=" flex-1 border-gray-400 outline-none border-2 p-2 rounded-2xl focus:border-none focus:outline-4 focus:outline-gray-400"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          maxLength={400}
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
    </>
  );
};

export default CreateComment;
