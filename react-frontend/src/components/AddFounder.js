import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addFounder } from '../services/founderServices';
import { StyledForm, StyledLabel, StyledInput, FormContainer, StyledTitle, StyledButton } from '../styledComponents/StyledForm';

const AddFounder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialFormData = {
    founderName: '',
    title: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    // Clear the error message when the user starts typing in founder name
    if (e.target.name === 'founderName') {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addFounder(id, formData);

    if (result.success) {
      // For simplicity, navigating back to the company details page
      navigate(`/company-details/${id}`);
    } else {
      // Handle the error case and set the error message
      const { error } = result;
      setErrorMessage(error);
    }
  };

  const cancelHandler = () => {
    navigate(`/company-details/${id}`);
  };

  return (
    <div>
      <StyledTitle>Add New Founder</StyledTitle>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          {Object.keys(initialFormData).map((fieldName) => (
            <StyledLabel key={fieldName}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
              <StyledInput
                type="text"
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleChange}
                required
              />
            </StyledLabel>
          ))}
          <br />
          <StyledButton type="submit">Add Founder</StyledButton>
          <StyledButton onClick={cancelHandler}>Cancel</StyledButton>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </StyledForm>
      </FormContainer>
    </div>
  );
};

export default AddFounder;
