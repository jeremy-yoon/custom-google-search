import axios from "axios";

const API_KEY = "secret_7DnicfdZeu9ZWcaOdm34gq68Xe1xyJwGGraRBNtHuiK";
const API_VERSION = "2021-05-13";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const getPosts = async (databaseId: string) => {
  const response = await axios.get(
    `https://api.notion.com/v1/databases/4b044676bc69414bbe5bcf569c4a7e9b`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Notion-Version": API_VERSION,
      },
    }
  );

  return response.data;
};
export const postBookmark = (id: string) => {
  return axios.post(``);
};

export const deleteBookmark = (id: string) => {
  return axios.delete(``);
};
