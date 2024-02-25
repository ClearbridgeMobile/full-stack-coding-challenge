/* eslint-disable no-undef */
import axios from "axios";
const url = `${process.env.REACT_APP_URL}/founders`;
const getFounders = async (companyId, setter) => {
  try {
    let response = await axios.get(`${url}/founder/${companyId}`);
    setter(response.data);
  } catch (e) {
    console.log(e);
  }
};

const addFounders = async (postParams, setter) => {
  try {
    let response = await axios.post(url, { ...postParams });
    if (response.status === 200) setter(response.data);
  } catch (e) {
    console.log(e);
  }
};

const validateFounder = async (postParams) => {
  try {
    let response = await axios.post(`${url}/validate`, {
      ...postParams,
    });
    if (response.data.present === "YES") {
      return false;
    } else return true;
  } catch (e) {
    console.log(e);
  }
};
export const foundersService = { getFounders, addFounders, validateFounder };
