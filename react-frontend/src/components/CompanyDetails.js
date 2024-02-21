import React, { useEffect, useState } from 'react';
import DeleteCompany from './DeleteCompany';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCompanyDetails } from '../services/companyServices';
import { fetchFounders } from '../services/founderServices';
import { formatDate } from '../utils/commonUtils';
import { StyledTitle, StyledButton } from '../styledComponents/StyledForm';
import '../styles/CompanyDetails.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [foundersList, setFoundersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchCompanyDetails(id);
        const founders = await fetchFounders(id);

        setCompanyDetails(details);
        setFoundersList(founders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addFounderHandler = () => {
    navigate(`/add-founder/${id}`);
  };

  const updateCompanyHandler = () => {
    navigate(`/add-update-company/${id}`);
  };

  const goToHomeHandler = () => {
    navigate('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!companyDetails) {
    return <p>Error fetching company details</p>;
  }

  return (
    <div>
      <StyledTitle>Company Details</StyledTitle>
      <div className="details-box">
        <p><strong>Company ID:</strong> {id}</p>
        <p><strong>Name:</strong> {companyDetails.name}</p>
        <p><strong>City:</strong> {companyDetails.city}</p>
        <p><strong>State:</strong> {companyDetails.state}</p>
        <p><strong>Description:</strong> {companyDetails.description}</p>
        {companyDetails.foundedDate !== '0000-00-00' && (
          <p><strong>Founded Date:</strong> {formatDate(companyDetails.foundedDate)}</p>
        )}
        <div className="flex-container">
          <DeleteCompany companyId={id} />
          <StyledButton onClick={updateCompanyHandler}>Edit Company</StyledButton>
          <StyledButton onClick={goToHomeHandler}>Go Back To Home</StyledButton>
        </div>
      </div>
      <div>
        <StyledTitle>Founders</StyledTitle>
        <div className="details-box">
          {foundersList.length > 0 ? (
            <ul>
              {foundersList.map((founder) => (
                <li key={founder.founderId}>
                  <strong>{founder.founderName}</strong> - {founder.titles}
                </li>
              ))}
            </ul>
          ) : (
            <p>No founders found for this company.</p>
          )}
          <StyledButton onClick={addFounderHandler}>Add Founder</StyledButton>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
