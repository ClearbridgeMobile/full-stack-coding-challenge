import React from 'react';
import { StyledButton } from '../styledComponents/StyledForm';

const AddCompanyButton = ({ navigate }) => {
  const AddCompanyHandler = () => {
    navigate(`/add-company`);
  };

  return (
    <StyledButton onClick={AddCompanyHandler}>
      Add Company
    </StyledButton>
  );
};

export default AddCompanyButton;
