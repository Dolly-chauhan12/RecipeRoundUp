import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { RecipePost } from "../types";
import { Card, CardHeader, CardFooter, Image, Avatar } from "@nextui-org/react";

interface RecipeCardProps {
  post: RecipePost;
  searchPage?: boolean;
}
const colors = [
  "bg-orange-100",
  "bg-lime-100",
  "bg-amber-100",
  "bg-slate-100",
  "bg-green-100",
  "bg-indigo-100",
  "bg-red-100",
  "bg-cyan-100",
  "bg-violet-100",
  "bg-fuchsia-100",
];

const RecipeCard = ({ post }: RecipeCardProps) => {
  const { postedBy, image, _id, title, likes } = post;

  const random = Math.floor(Math.random() * colors.length);

  const cardClass = `w-full h-[40vh] md:h-[400px] lg:h-[372px] duration-500 hover:-translate-y-2 hover:shadow-2xl ${colors[random]}`;

  return (
    <Link to={`/home/post-detail/${_id}`}>
      <Card isFooterBlurred className={cardClass}>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="rounded-xl object-cover w-11/12 h-3/5 z-0 mx-auto my-2 border-3 border-white"
          src={image.asset.url}
        ></Image>
        <CardHeader>
          <h4 className="text-black font-medium text-lg md:text-2xl font-poppins line-clamp-1">
            {title}
          </h4>
        </CardHeader>
        <Link to={`/home/user-profile/${postedBy?._id}`}>
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-3 items-center text-white">
              <Avatar
                isBordered
                src={postedBy?.image}
                name={postedBy?.userName}
              />
              <p className="font-lexend text-lg">{postedBy?.userName}</p>
            </div>

            <div className="flex gap-2 text-red-500 items-center">
              <div>
                <FaHeart className="text-lg md:text-4xl" />
              </div>

              <p className="text-lg text-white">
                {likes?.length ? likes?.length : 0}
              </p>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </Link>
  );
};

export default RecipeCard;
