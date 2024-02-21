const BASE_URL = process.env.REACT_APP_BASE_URL;

// For fetching founders based on companyId
export const fetchFounders = async (companyId) => {
  const response = await fetch(`${BASE_URL}/companies/founders/${companyId}`);
  if (!response.ok) {
    throw new Error(`Error fetching founders: ${response.status}`);
  }
  return response.json();
};

// Adding Founder for the company based on companyId
export const addFounder = async (companyId, founderData) => {
  try {
    const response = await fetch(`${BASE_URL}/companies/add-founders/${companyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(founderData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      const errorResult = await response.json();
      return { success: false, error: errorResult.error || 'Error adding founder' };
    }
  } catch (error) {
    return { success: false, error: 'Unexpected error adding founder' };
  }
};