// types for API response
interface RecipeImage {
  asset: {
    url: string;
  };
}

interface UserRefrence {
  _ref: string;
  _key: string;
}

export interface User {
  _id: string;
  userName: string;
  image: string;
}

interface Comment {
  comment: string;
  _key: string;
  postedBy: User;
}

export interface RecipePost {
  _id: string;
  image: RecipeImage;
  ingredients?: string[];
  recipe?: string;
  title: string;
  userId: string;
  likes: UserRefrence[];
  postedBy: User;
  _createdAt: string;
}

export interface RecipeDetail {
  _id: string;
  category: string;
  image: RecipeImage;
  ingredients?: string[];
  recipe: string;
  title: string;
  userId: string;
  likes: UserRefrence[];
  postedBy: User;
  comments: Comment[] | null;
}

export interface UserPost {
  userId: string;
  _id: string;
  postedBy: User;
  image: RecipeImage;
  title: string;
  likes: UserRefrence[];
  _createdAt: string;
}
