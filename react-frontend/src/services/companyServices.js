const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetch companies
export const fetchCompanies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/companies`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};
