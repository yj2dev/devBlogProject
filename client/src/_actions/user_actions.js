import axios from "axios";
import { SIGNIN_USER, SIGNUP_USER, AUTH_USER } from "./types";

export function signinUser(onSubmitData) {
  const request = axios
    .post("/api/users/signin", onSubmitData)
    .then((res) => res.data);

  return {
    type: SIGNIN_USER,
    payload: request,
  };
}
export function signupUser(onSubmitData) {
  const request = axios
    .post("/api/users/signup", onSubmitData)
    .then((res) => res.data);

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/users/auth").then((res) => {
    console.log("auth res.data => ", res.data);
    return res.data;
  });

  return {
    type: AUTH_USER,
    payload: request,
  };
}
