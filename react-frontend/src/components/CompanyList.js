import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanies } from '../actions/companyActions';
import { useNavigate } from 'react-router-dom';
import { fetchCompanies } from '../services/companyServices';
import AddCompanyButton from './AddCompanyButton';
import CompanyPanel from './CompanyPanel';
import '../styles/CompanyList.css';
import { StyledTitle } from '../styledComponents/StyledForm';

const CompanyList = () => {
  const dispatch = useDispatch();
  const companiesList = useSelector((state) => state.companies.companiesList);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch companies only if the list is empty
    if (companiesList.length === 0) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await fetchCompanies();
          dispatch(setCompanies(data));
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [dispatch, companiesList]);

  const handleItemClick = (id) => {
    navigate(`/company-details/${id}`);
  };

  return (
    <>
      <StyledTitle>Companies</StyledTitle>
      <div className="company-list-container">
        {loading ? (
          <p>Loading...</p>
        ) : companiesList.length > 0 ? (
          <div>
            {companiesList.map((company) => (
              <div key={company.companyId} onClick={() => handleItemClick(company.companyId)}>
                <CompanyPanel company={company} />
              </div>
            ))}
            <AddCompanyButton navigate={navigate} />
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>

  );
};

export default CompanyList;
