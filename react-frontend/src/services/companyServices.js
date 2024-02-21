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

// Fetch company details by ID
export const fetchCompanyDetails = async (companyId) => {
  try {
    const response = await fetch(`${BASE_URL}/companies/${companyId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching company details for ID ${companyId}:`, error);
    throw error;
  }
};

// Delete company by ID
export const deleteCompanyRequest = async (companyId) => {
    try {
      const response = await fetch(`${BASE_URL}/companies/delete/${companyId}`, {
        method: 'DELETE',
      });
  
      return response.ok;
    } catch (error) {
      console.error('Error in deleteCompanyRequest:', error);
      return false;
    }
  };
  

// Save or update a company
export const saveCompany = async (formData, id) => {
  try {
    const url = id ? `${BASE_URL}/companies/update/${id}` : `${BASE_URL}/companies/add`;
    const method = id ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedCompany = await response.json();
      return id ? { ...formData, companyId: id } : { ...formData, companyId: updatedCompany.companyId };
    } else {
      console.error(`Error ${id ? 'updating' : 'adding'} company:`, response.status);
      throw new Error(`Error ${id ? 'updating' : 'adding'} company: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error ${id ? 'updating' : 'adding'} company:`, error);
    throw error;
  }
};
