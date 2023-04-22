export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            title,
            userId,
            recipe,
            postedBy->{
              _id,
              userName,
              image
            },
           likes,

          }`;
  return query;
};


export const feedQuery = `*[_type == "post"] | order(_createdAt desc) {
 _id,
     title,
       image{
        asset->{
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
   
  }`;


export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
        image{
          asset->{
            url
          }
        },
            _id,
            title,
            recipe,
            postedBy->{
              _id,
              userName,
              image
            },
           likes,
          comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          }
          }`;
  return query;
};


export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     title,
       image{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     title,
       image{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};