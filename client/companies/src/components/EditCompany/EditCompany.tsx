import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import formatDate from '../../common/utils';
import './EditCompany.css';

interface CompanyData {
  name: string;
  city: string;
  state: string;
  short_description: string;
  long_description: string;
  founded_date: string;
}

function EditCompany() {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    city: '',
    state: '',
    short_description: '',
    long_description: '',
    founded_date: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = (location.state as { id: string }).id;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/companies/${id}`,
        companyData
      );
      navigate(`/company/${id}`);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get<CompanyData>(
          `${import.meta.env.VITE_API_URL}/companies/${id}`
        );
        setCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, [id]);

  return (
    <>
      <h2>Edit Company</h2>
      <form onSubmit={handleUpdate}>
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
            value={formatDate(companyData.founded_date)}
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

export default EditCompany;
