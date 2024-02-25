/* eslint-disable no-undef */
import axios from "axios";
const url = process.env.REACT_APP_URL;

const getAllCompanies = async (setter) => {
  try {
    let response = await axios.get(`${url}/companies`);
    setter(response.data);
  } catch (e) {
    console.log(e);
  }
};

const getCompany = async (companyId, setter) => {
  try {
    let response = await axios.get(`${url}/companies/${companyId}`);
    setter(response.data[0]);
  } catch (e) {
    console.log(e);
  }
};

const addCompany = async ( postData) => {
  try {
    let response = await axios.post(`${url}/companies`, { ...postData });
     return response.data;
  } catch (e) {
    console.log(e);
  }
};
const updateCompany = async (postData) => {
  try {
   let response = await axios.put(`${url}/companies`, { ...postData });
   return response.data[0];
  } catch (e) {
    console.log(e);
  }
};

const deleteCompany = async (id) => {
  try {
   let response =  await axios.delete(`${url}/companies/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export const companiesService = {
  getAllCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany,
};
