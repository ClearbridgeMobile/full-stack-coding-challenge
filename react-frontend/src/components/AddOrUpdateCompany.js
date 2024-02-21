import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, updateCompany } from '../actions/companyActions';
import { saveCompany } from '../services/companyServices';
import { formatDate } from '../utils/commonUtils';
import { StyledForm, StyledLabel, StyledInput, StyledButton, StyledTextarea, FormContainer, StyledTitle } from '../styledComponents/StyledForm';

const AddOrUpdateCompany = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const companiesList = useSelector((state) => state.companies.companiesList);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    foundedDate: '',
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const existingCompany = companiesList.find((company) => company.companyId == id);

      if (existingCompany) {
        setFormData({
          name: existingCompany.name,
          city: existingCompany.city,
          state: existingCompany.state,
          foundedDate: existingCompany.foundedDate,
          description: existingCompany.description,
        });
      } else {
        console.error(`Company with ID ${id} not found in companiesList.`);
      }
    }
  }, [id, companiesList]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedCompany = await saveCompany(formData, id);
      id ? dispatch(updateCompany(updatedCompany)) : dispatch(addCompany(updatedCompany));
      id ? navigate(`/company-details/${id}`) : navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const cancelHandler = () => {
    id ? navigate(`/company-details/${id}`) : navigate("/");
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
        <StyledInput type="date" name="foundedDate" value={formData.foundedDate ? formatDate(formData.foundedDate) : ""} onChange={handleChange} />
      </StyledLabel>
      <StyledLabel>
        Description:
        <StyledTextarea name="description" value={formData.description} onChange={handleChange} required />
      </StyledLabel>
    </>
  );

  return (
    <div>
      <StyledTitle>{id ? 'Edit' : 'Add'} Company</StyledTitle>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          {renderFormFields()}
          <StyledButton type="submit">{id ? 'Update' : 'Add'} Company</StyledButton>
          <StyledButton onClick={cancelHandler}>Cancel</StyledButton>
        </StyledForm>
      </FormContainer>
    </div>
  );
};

export default AddOrUpdateCompany;
