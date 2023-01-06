import axios from "axios";

const API_KEY = "AIzaSyBDSjx0yr_jfrvgo4r5QMM0AOPGeb1Clpo";

export const getPosts = async (query: string) => {
  const response = await axios.get(
    `https://www.googleapis.com/customsearch/v1`,
    {
      params: {
        q: query,
        key: API_KEY,
        cx: "51374a541ef1c4f3c",
      },
    }
  );

  return response;
};

export const postBookmark = (id: string) => {
  return axios.post(``);
};

export const deleteBookmark = (id: string) => {
  return axios.delete(``);
};
