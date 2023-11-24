import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { Spinner } from "./";
import { TagsInput } from "react-tag-input-component";
import { MdDelete } from "react-icons/md";
import { categories } from "../assets/constant";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RecipeDetail } from "../types";
import { SanityImageAssetDocument } from "@sanity/client";
interface EditFormProps {
  post: RecipeDetail;
}
const EditPostForm = ({ post }: EditFormProps) => {
  const [title, setTitle] = useState<string>(post.title);
  const [recipe, setRecipe] = useState<string>(post.recipe);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageChange, setImageChange] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(post.category);
  const [ingredients, setIngredients] = useState<string[]>(
    post.ingredients || []
  );
  const [imageUrl, setImageUrl] = useState<string | null>(post.image.asset.url);
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(
    null
  );
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    if (target.files) {
      const file = target.files[0];
      const selectedFile = file;

      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/svg" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/gif" ||
        selectedFile.type === "image/tiff"
      ) {
        setWrongImageType(false);
        setLoading(true);
        setImageChange(true);
        client.assets
          .upload("image", selectedFile, {
            contentType: selectedFile.type,
            filename: selectedFile.name,
          })
          .then((document) => {
            setImageAsset(document);

            setLoading(false);
            if (imageAsset) {
              setImageUrl(imageAsset.url);
            }
          })
          .catch((error) => {
            setImageUrl(post.image.asset.url);
            setImageAsset(null);
            console.log("Upload failed", error.message);
          });
      } else {
        setLoading(false);
        setWrongImageType(true);
      }
    }
  };

  const updateRecipe = () => {
    if (title && recipe && category && !imageChange) {
      client
        .transaction([
          {
            patch: {
              id: post._id,
              set: {
                title: title,
                recipe: recipe,
                category: category,
                ingredients,
              },
            },
          },
        ])
        .commit()
        .then((updatedDoc) => {
          console.log("Hurray, the post is updated! New document:");
          navigate(`/user-profile/${post.postedBy._id}`);
        })
        .catch((err) => {
          console.error("Transaction failed: ", err.message);
        });
    } else if (title && recipe && category && imageChange && imageAsset?._id) {
      client
        .transaction([
          {
            patch: {
              id: post._id,
              set: {
                title: title,
                recipe: recipe,
                category: category,
                "image.asset._ref": imageAsset?._id,
              },
            },
          },
        ])
        .commit()
        .then((updatedDoc) => {
          console.log("Hurray, the post is updated with image! New document:");
          navigate(`/user-profile/${post.postedBy._id}`);
        });
    } else {
      alert("Please fill all fields accordingly...");
    }
  };

  const deleteRecipe = () => {
    if (window.confirm("Are you sure you want to delete this post ?")) {
      client
        .delete(post._id)
        .then(() => {
          console.log(`Recipe deleted havimg title - ${title}`);
        })
        .catch((err) => {
          console.error("Delete failed: ", err.message);
        });

      navigate(`/user-profile/${post.postedBy._id}`);
    }
  };

  return (
    <div className="px-2 py-3">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-6">
            <h1 className="text-xl font-semibold leading-7 text-gray-900">
              Your Post
            </h1>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 ">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="title"
                      />
                    </div>
                  </div>
                </div>

                <div className="pb-6">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <select
                          name="category"
                          onChange={(e) => setCategory(e.target.value)}
                          defaultValue={category}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option
                            value="others"
                            className="text-base border-0 outline-none capitalize bg-white text-black "
                          >
                            Others
                          </option>
                          {categories.map((item) => (
                            <option
                              className="text-base border-0 outline-none capitalize bg-white text-black "
                              value={item.name}
                              key={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Ingredients
                </label>
                <TagsInput
                  value={ingredients}
                  onChange={setIngredients}
                  name="ingredients"
                  placeHolder="Enter Ingredients.."
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Add Recipe
                </label>
                <div className="mt-2">
                  <textarea
                    value={recipe}
                    onChange={(e) => setRecipe(e.target.value)}
                    rows={10}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write Recipe Instructions.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Recipe Image
                </label>
                <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 w-full h-420">
                  {loading && <Spinner message="wait a moment...." />}
                  {wrongImageType && (
                    <p className="text-red-500 transition-all duration-150 ease-in">
                      It&apos;s wrong file type.
                    </p>
                  )}
                  {imageAsset === null && imageUrl === null ? (
                    // eslint-disable-next-line jsx-a11y/label-has-associated-control
                    <label>
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-bold text-2xl">
                            <AiOutlineCloudUpload />
                          </p>
                          <p className="text-lg">Click to upload</p>
                        </div>

                        <p className="mt-32 text-gray-400">
                          Recommendation: Use high-quality JPG, JPEG, SVG, PNG,
                          GIF or TIFF less than 20MB
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-image"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </label>
                  ) : (
                    <div className="relative h-full">
                      <img
                        src={
                          imageChange
                            ? (imageAsset?.url as string)
                            : (imageUrl as string)
                        }
                        alt="uploaded-pic"
                        className="h-full w-full"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() => {
                          setImageUrl(null);
                          setImageAsset(null);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={deleteRecipe}
        >
          Delete Recipe
        </button>
        <button
          type="button"
          className="rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900"
          onClick={updateRecipe}
        >
          Update Recipe
        </button>
      </div>
      <span className="text-sm text-slate-400 my-1 ">
        *Please allow a few minutes for changes to be visible on the post.
      </span>
    </div>
  );
};

export default EditPostForm;
