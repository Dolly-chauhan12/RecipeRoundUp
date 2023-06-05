import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, EditPostForm } from "./";
import { client } from "../client";
import { postDetailQuery } from "../utils/data";

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();

  const fetchPostDetails = () => {
    const query = postDetailQuery(postId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPost(data[0]);
      });
    }
  };

  useEffect(() => {
    fetchPostDetails();
    // eslint-disable-next-line
  }, [postId]);

  if (!post) {
    return <Spinner message="Please wait a moment , fetching post details" />;
  }

  return <EditPostForm post={post} />;
};

export default EditPost;
