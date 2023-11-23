import React from "react";

const Comments = ({ postDetail }) => {
  return (
    <div className="max-h-370 overflow-y-auto mb-2 ">
      {postDetail?.comments?.length ? (
        postDetail?.comments?.map((item) => (
          <div
            className="flex gap-2 mt-3 items-center bg-slate-100 rounded-lg py-1"
            key={item.comment}
          >
            <img
              src={item.postedBy?.image}
              className="w-10 h-10 rounded-full cursor-pointer bg-slate-100 ml-1"
              alt="user-profile"
            />

            <div className="flex flex-col ">
              <p className="font-bold underline font-PTserif">
                {item.postedBy?.userName}
              </p>
              <p className="font-poppins font-light">{item.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comments;
