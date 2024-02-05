import {
  GiFrenchFries,
  GiSlicedBread,
  GiDonut,
  GiNoodles,
  GiSausage,
  GiHamburger,
  GiRiceCooker,
} from "react-icons/gi";
import { IoMdWine } from "react-icons/io";
import { FaLeaf } from "react-icons/fa";
import { MdBrunchDining, MdLunchDining, MdDinnerDining } from "react-icons/md";
import { RecipeDetail, RecipePost, UserPost } from "../types";

export const categories = [
  {
    name: "Appetizers",
    icon: <GiFrenchFries />,
  },
  {
    name: "Bevereges",
    icon: <IoMdWine />,
  },
  {
    name: "Breakfast",
    icon: <GiSlicedBread />,
  },
  {
    name: "Brunch",
    icon: <MdBrunchDining />,
  },
  {
    name: "Lunch",
    icon: <MdLunchDining />,
  },
  {
    name: "Dinner",
    icon: <MdDinnerDining />,
  },
  {
    name: "Desserts",
    icon: <GiDonut />,
  },
  {
    name: "Vegan",
    icon: <FaLeaf />,
  },
  {
    name: "Asian",
    icon: <GiNoodles />,
  },
  {
    name: "European",
    icon: <GiSausage />,
  },
  {
    name: "Indian",
    icon: <GiRiceCooker />,
  },
  {
    name: "American",
    icon: <GiHamburger />,
  },
];

export const defaultRecipeDetail: RecipeDetail = {
  _id: "191d4f79-a29f-4b1a-8454-34acaf07822d",
  category: "Breakfast",
  image: {
    asset: {
      url: "https://cdn.sanity.io/images/5s93exse/production/de427179d89978-5784x3520.jpg",
    },
  },
  recipe:
    "tempus metus. Curabitur bibendum nisl nec diam fermentum, id aliquam dolor placerat.",
  title: "Paneer Toasty",
  userId: "10829396",
  likes: [
    {
      _key: "1649bfe2-3a18-495e-bfcd-0eebfa379f46",
      _ref: "108293968939661",
    },
  ],
  postedBy: {
    _id: "10829396",
    userName: "DOLLY CHAUHAN",
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxYj-6L8p-zaXRGFcyEkNTJyqPuHE7ohx33KgAOc=s96-c",
  },
  comments: null,
};

export const defaultRecipePost: RecipePost = {
  postedBy: {
    _id: "1082939689",
    userName: "DOLLY CHAUHAN",
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxYj-6L8p-zaXRGFcyEkNTJyqPuHE7ohx33KgAOc=s96-c",
  },
  likes: [
    {
      _ref: "1082939689396",
      _key: "b4196f565176",
    },
  ],
  _id: "wZoAf7M",
  title: "",
  image: {
    asset: {
      url: "https://cdn.sanity.io/b7336d07c7-6000x4000.jpg",
    },
  },
  userId: "10829396",
  recipe: "",
  _createdAt: "2023-06-01T17:02:40Z",
};

export const defaultUserPost: UserPost = {
  postedBy: {
    _id: "1082939689",
    userName: "DOLLY CHAUHAN",
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxYj-6L8p-zaXRGFcyEkNTJyqPuHE7ohx33KgAOc=s96-c",
  },
  likes: [
    {
      _ref: "108293968939661655856",
      _key: "b4196f565176",
    },
  ],
  _id: "wZoAf7MljkZfSOmg3l8Uuz",
  title: "American-Style Hamburger",
  image: {
    asset: {
      url: "https://cdn.sanity.io/images/-6000x4000.jpg",
    },
  },
  userId: "10829396",
  _createdAt: "2023-06-01T17:02:40Z",
};

/*
Snacks
Vegetarian
Vegan
Gluten - free
Dairy - free
Low - carb
Keto
Paleo
Mediterranean
Asian
European
American
Latin American
*/
