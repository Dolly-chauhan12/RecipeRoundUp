import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { categories } from '../assets/constant';
import { client } from '../client';
import { Spinner } from './'

const CreatePost = ({ user }) => {



  const [title, setTitle] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();


  const uploadImage = (e) => {

    const selectedFile = e.target.files[0];

    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.filename })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed', error.message);
        });

    }
    else {
      setLoading(false);
      setWrongImageType(true);
    }
  }


  const savePin = () => {
    if (title && recipe && category && imageAsset?._id) {
      const doc = {
        _type: "post",
        title,
        recipe,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id
          }
        },
        category,
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        }

      };
      client.create(doc).then(() => {
        navigate('/');
      })
    } else {
      setFields(true);

      //document.querySelector('#pop_up').scrollIntoView();
      window.scrollTo({ top: 0, behavior: "smooth" })
      setTimeout(
        () => {
          setFields(false);
        }, 5000
      )

    };

  }



  return (
    <div className='flex flex-col pb-2'>
      <div className="flex flex-col  mt-5 lg:h-4/5 ">
        {fields && (
          //<p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
          <div className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert" id="pop_up">
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
            <p>Please add all fields</p>
          </div>
        )}
        <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3  w-full">
          <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
            <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading && (
                <Spinner />
              )}
              {
                wrongImageType && (
                  <p className='text-red-500 transition-all duration-150 ease-in'>It&apos;s wrong file type.</p>
                )
              }
              {!imageAsset ? (
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
                      Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
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
                    src={imageAsset?.url}
                    alt="uploaded-pic"
                    className="h-full w-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add your title"
              className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
            />
            {user && (
              <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full"
                  alt="user-profile"
                />
                <p className="font-bold">{user.userName}</p>
              </div>
            )}


            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Pin Category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-white">Select Category</option>
                {categories.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col " >
        <div className='flex flex-col gap-1' >
          <p className='font-semibold text:lg sm:text-xl'> Add recipe</p>
          <textarea rows="10" cols="30" value={recipe}
            onChange={(e) => setRecipe(e.target.value)} className='border-2 border-gray-400' />

        </div>
        <div className="flex justify-end items-end mt-5">
          <button
            type="button"
            onClick={savePin}
            className="bg-green-900 text-white font-bold p-2 rounded-full w-28 outline-none"
          >
            Save Recipe
          </button>
        </div>

      </div >

    </div>

  )
}

export default CreatePost

