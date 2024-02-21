import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCompany } from '../actions/companyActions';
import { saveCompany } from '../services/companyServices';
import { StyledForm, StyledLabel, StyledInput, StyledButton, StyledTextarea, FormContainer, StyledTitle } from '../styledComponents/StyledForm';

const AddOrUpdateCompany = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    foundedDate: '',
    description: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addedCompany = await saveCompany(formData);
      dispatch(addCompany(addedCompany));
      console.log('Company added successfully!');
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  const cancelHandler = () => {
    navigate('/');
  };

  const renderFormFields = () => (
    <>
      <StyledLabel>
        Company Name:
        <StyledInput type="text" name="name" value={formData.name} onChange={handleChange} required />
      </StyledLabel>
      <StyledLabel>
        City:
        <StyledInput type="text" name="city" value={formData.city} onChange={handleChange} required />
      </StyledLabel>
      <StyledLabel>
        State:
        <StyledInput type="text" name="state" value={formData.state} onChange={handleChange} required />
      </StyledLabel>
      <StyledLabel>
        Founded Date:
        <StyledInput type="date" name="foundedDate" value={formData.foundedDate} onChange={handleChange} />
      </StyledLabel>
      <StyledLabel>
        Description:
        <StyledTextarea name="description" value={formData.description} onChange={handleChange} required />
      </StyledLabel>
    </>
  );

  return (
    <div>
      <StyledTitle>Add Company</StyledTitle>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          {renderFormFields()}
          <StyledButton type="submit">Add Company</StyledButton>
          <StyledButton onClick={cancelHandler}>Cancel</StyledButton>
        </StyledForm>
      </FormContainer>
    </div>
  );
};

export default AddOrUpdateCompany;
