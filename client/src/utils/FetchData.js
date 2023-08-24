import axios from "axios";

export const getAPI = async (url, token) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/${url}`, {
      headers: { Authorization: token || "" },
    });

    return res;
  } catch (err) {
    console.log({ smg: err });
  }
};

export const postAPI = async (url, data, token) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/${url}`, data, {
      headers: { Authorization: token || "" },
    });

    return res;
  } catch (err) {
    console.log({ smg: err });
  }
};

export const patchAPI = async (url, data, token) => {
  try {
    const res = await axios.patch(`http://localhost:5000/api/${url}`, data, {
      headers: { Authorization: token || "" },
    });
    return res;
  } catch (err) {
    console.log({ smg: err });
  }
};

export const deleteAPI = async (url, data, token) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/${url}`, data, {
      headers: { Authorization: token || "" },
    });
    return res;
  } catch (err) {
    console.log({ smg: err });
  }
};
