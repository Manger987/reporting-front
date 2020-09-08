import { logginUser } from "./usuario";
import { Redirect } from "react-router-dom";
import React from "react";

const login = async (username: string, password: string) => {
  const login = await logginUser({
    username, password
  });
  if (login.code === 200) {
    localStorage.setItem("user", JSON.stringify(login.data));
  }
  return login;
}

const removeLogin = () => {
  localStorage.removeItem("user");
};

const isAuthUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
}

export { login, removeLogin, isAuthUser };