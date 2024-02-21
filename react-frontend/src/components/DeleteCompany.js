import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCompany } from '../actions/companyActions';
import { useNavigate } from 'react-router-dom';
import { deleteCompanyRequest } from '../services/companyServices';
import { StyledButton } from '../styledComponents/StyledForm';

const DeleteCompany = ({ companyId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const isSuccess = await deleteCompanyRequest(companyId);

      if (isSuccess) {
        console.log('Company deleted successfully!');
        dispatch(deleteCompany(companyId));
        navigate('/');
      } else {
        console.error('Error deleting company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <StyledButton onClick={handleDelete}>Delete Company</StyledButton>
      )}
    </div>
  );
};

export default DeleteCompany;
