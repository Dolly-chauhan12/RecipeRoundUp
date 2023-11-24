export const searchQuery = (searchTerm: string) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*'] | order(_createdAt desc) {
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
           likes[],
          }`;
  return query;
};

export const searchQueryByLikes = (searchTerm: string) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*'] |  order(count(likes) desc) {
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
           likes[],
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
      recipe,
      postedBy->{
        _id,
        userName,
        image
      },
    likes,
   
  }`;

export const feedQueryByLikes = `*[_type == "post"] |  order(count(likes) desc) {
 _id,
     title,
       image{
        asset->{
          url
        }
      },
      userId,
      recipe,
      postedBy->{
        _id,
        userName,
        image
      },
    likes[],
   
  }`;

export const postDetailQuery = (postId: string) => {
  const query = `*[_type == "post" && _id == '${postId}']{
        image{
          asset->{
            url
          }
        },
            _id,
            title,
            recipe,
            category,
            postedBy->{
              _id,
              userName,
              image
            },
           likes,
          ingredients,
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

export const userQuery = (userId: string) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};
// order(_createdAt desc)
export const userCreatedPostsQuery = (userId: string) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(count(likes) desc)
  {
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
    likes[],
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

export const userLikedPostsQuery = (userId: string) => {
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
//
