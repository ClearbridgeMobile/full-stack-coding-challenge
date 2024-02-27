import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Company } from './../../common/Company';
import { useNavigate } from 'react-router-dom';
import './CompanyDetails.css';

const CompanyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/companies/${id}`
        );
        setCompany(response.data);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  const handleEdit = () => {
    navigate('/edit-company', { state: { id } });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/companies/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {company && (
        <div className='company-details'>
          <h2>{company.name}</h2>
          <div className='section-one'>
            <p>{new Date(company.founded_date).toDateString()}</p>
            <p>{`${company.city}, ${company.state}`}</p>
            <div>|</div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <p>{company.long_description}</p>
          <div className='founders'>
            <h3>Founders:</h3>
            {company.founders.map((founder, index) => (
              <div key={index}>
                <p>{`${founder.full_name} : ${founder.title} `}</p>
              </div>
            ))}
            <Link
              to='/add-founder'
              state={{ id, company }}
              className='add-founder-link'
            >
              Add Founder
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyDetails;
