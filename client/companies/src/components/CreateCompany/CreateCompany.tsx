import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../common/Company';

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
      console.log('Company created:', response.data);
      navigate(`/company/${response.data.company.id}`);
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        value={companyData.name}
        onChange={handleChange}
        placeholder='Company Name'
      />
      <input
        type='text'
        name='city'
        value={companyData.city}
        onChange={handleChange}
        placeholder='City'
      />
      <input
        type='text'
        name='state'
        value={companyData.state}
        onChange={handleChange}
        placeholder='State'
      />
      <textarea
        name='long_description'
        value={companyData.long_description}
        onChange={handleChange}
        placeholder='Long Description'
      ></textarea>
      <input
        type='date'
        name='founded_date'
        value={companyData.founded_date}
        onChange={handleChange}
      />
      <button type='submit'>Create Company</button>
    </form>
  );
}

export default CreateCompany;
