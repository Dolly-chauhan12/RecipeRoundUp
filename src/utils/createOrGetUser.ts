import jwt_decode from "jwt-decode";
import { client } from "../client";
import { GoogleCredentialResponse } from "@react-oauth/google";

interface DecodedToken {
  sub: string;
  hd: string;
  email: string;
  name: string;
  picture: string;
}

export const createOrGetUser = (
  response: GoogleCredentialResponse,
  addUser: Function
) => {
  // type of credential is string | undefined so doing type guarding

  if (typeof response.credential === "string") {
    const decoded: DecodedToken = jwt_decode(response.credential);

    const { name, picture, sub } = decoded;

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(user).then(() => console.log("Login Success"));

    addUser(user);
  }
};
