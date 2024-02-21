export const setCompanies = (companies) => ({
    type: 'SET_COMPANIES',
    payload: companies,
});

export const addCompany = (company) => ({
    type: 'ADD_COMPANY',
    payload: company,
});

export const deleteCompany = (companyId) => ({
    type: 'DELETE_COMPANY',
    payload: companyId,
});

export const updateCompany = (company) => ({
    type: 'UPDATE_COMPANY',
    payload: company,
});

