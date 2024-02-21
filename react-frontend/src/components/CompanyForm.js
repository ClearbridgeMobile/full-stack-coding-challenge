import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    foundedDate: '',
    description: '',
    ...initialValues,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...formData,
        ...initialValues,
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await onSubmit(formData);

      if (response.ok) {
        // For simplicity, navigating back to the company list
        navigate('/');
      } else {
        console.error('Error performing company operation');
      }
    } catch (error) {
      console.error('Error performing company operation:', error);
    }
  };

  return (
    <div>
      <h1>{initialValues ? 'Update Company' : 'Add New Company'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label>
        <br />
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Founded Date:
          <input type="date" name="foundedDate" value={formData.foundedDate} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">{initialValues ? 'Update Company' : 'Add Company'}</button>
      </form>
    </div>
  );
};

export default CompanyForm;
