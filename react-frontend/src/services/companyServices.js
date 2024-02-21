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

// Add a new company
export const saveCompany = async (formData) => {
  try {
    const url = `${BASE_URL}/companies/add`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const addedCompany = await response.json();
      return { ...formData, companyId: addedCompany.companyId };
    } else {
      console.error('Error adding company:', response.status);
      throw new Error(`Error adding company: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding company:', error);
    throw error;
  }
};

