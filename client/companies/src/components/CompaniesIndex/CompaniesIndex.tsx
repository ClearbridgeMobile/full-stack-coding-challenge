import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Company } from './../../common/Company';
import './CompaniesIndex.css';

function CompaniesIndex() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/companies`
        );

        setCompanies(response.data);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className='companies-container'>
        {companies.map((company: Company) => (
          <Link to={`/company/${company.id}`}>
            <div key={company.id} className='company-card'>
              <div className='title-section'>
                <h3>{company.name}</h3>
                <div>{`${company.city}, ${company.state}`}</div>
                <div>more...</div>
              </div>
              <p>{company.short_description}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link className='button-container' to='/create-company'>
        Add Company
      </Link>
    </>
  );
}

export default CompaniesIndex;
