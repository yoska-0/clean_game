import axios from "axios";

const getGame = async (name) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/games?name=${name.toLowerCase()}`,
  );
  return res.data.data;
};

const getSearchGames = async (name, limit) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/games/search?name=${name.toLowerCase()}&limit=${limit}`,
  );
  return res.data.data;
};

const signUp = async (information) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/auth/signup`,
    information,
  );
  return res.data;
};

const confirmEmail = async (information) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/auth/confirmEmail`,
    information,
  );
  return res.data;
};

const logIn = async (information) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/auth/login`,
    information,
  );
  return res.data;
};

const forgetPassword = async (email) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/auth/forgotPassword`,
    { email },
  );
  return res.data;
};

const verifyResetCode = async (code) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/auth/verifyResetCode`,
    { resetCode: code },
  );
  return res.data;
};

const resetPassword = async (information) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/auth/resetPassword`,
    information,
  );
  return res.data;
};

const getLoggedUser = async () => {
  const token = localStorage.getItem("token");

  let headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/users/me`,
    {
      headers,
    },
  );
  return res.data;
};

const bringComments = async (id, limit) => {
  const res = await axios.get(
    `
    ${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/games/${id}/reviews?limit=${limit}`,
  );
  return res.data;
};

const createRivew = async (information) => {
  const token = localStorage.getItem("token");
  let headers = {};
  console.log("fhdjkfhjkdshfjkdshfjkdshfjkds", localStorage.getItem("token"));
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/api/v1/reviews`,
    information,
    {
      headers,
    },
  );
  return res.data;
};

export default {
  getGame,
  getSearchGames,
  signUp,
  logIn,
  forgetPassword,
  verifyResetCode,
  resetPassword,
  bringComments,
  getLoggedUser,
  createRivew,
  confirmEmail,
};
