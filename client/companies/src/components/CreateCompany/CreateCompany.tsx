import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../common/Company';
import './CreateCompany.css';

interface CompanyData {
  name: string;
  city: string;
  state: string;
  short_description: string;
  long_description: string;
  founded_date: string;
  company?: Company;
}

function CreateCompany() {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    city: '',
    state: '',
    short_description: '',
    long_description: '',
    founded_date: '',
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<CompanyData>(
        `${import.meta.env.VITE_API_URL}/companies`,
        companyData
      );
      const companyId = response.data.company?.id;
      if (companyId) {
        navigate(`/company/${companyId}`);
      } else {
        console.error('Company ID is undefined');
      }
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  return (
    <>
      <h2>Create A New Company</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Company Name:</label>
          <input
            type='text'
            name='name'
            value={companyData.name}
            onChange={handleChange}
          />
        </div>
        <div className='inline-labels'>
          <label htmlFor='city'>City:</label>
          <label htmlFor='state'>State:</label>
          <label htmlFor='founded_date'>Founded Date:</label>
        </div>
        <div className='inline-inputs'>
          <input
            type='text'
            name='city'
            value={companyData.city}
            onChange={handleChange}
          />
          <input
            type='text'
            name='state'
            value={companyData.state}
            onChange={handleChange}
          />
          <input
            type='date'
            name='founded_date'
            value={companyData.founded_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='long_description'>Description:</label>
          <textarea
            name='long_description'
            value={companyData.long_description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className='button-container' type='submit'>
          Save
        </button>
      </form>
    </>
  );
}

export default CreateCompany;
