import axios from "axios";

export const getAPI = async (url, token) => {
  const res = await axios.get(`http://localhost:5000/api/${url}`, {
    headers: { Authorization: token || "" },
  });
  return res;
};

export const postAPI = async (url, data, token) => {
  const res = await axios.post(`http://localhost:5000/api/${url}`, data, {
    headers: { Authorization: token || "" },
  });
  return res;
};

export const patchAPI = async (url, data, token) => {
  const res = await axios.patch(`http://localhost:5000/api/${url}`, data, {
    headers: { Authorization: token || "" },
  });
  return res;
};

export const deleteAPI = async (url, data, token) => {
  const res = await axios.delete(`http://localhost:5000/api/${url}`, data, {
    headers: { Authorization: token || "" },
  });
  return res;
};
