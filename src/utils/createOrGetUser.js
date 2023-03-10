//import axios from "axios"
import jwt_decode from "jwt-decode"
import { client } from "../client";

export const createOrGetUser = (response, addUser) => {

  const decoded = jwt_decode(response.credential);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture
  }



  client.createIfNotExists(user).then(() =>
    console.log("Login Success")
  );

  addUser(user);
  console.log(decoded);
}