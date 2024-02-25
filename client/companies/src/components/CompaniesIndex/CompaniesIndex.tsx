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
      {companies.map((company: Company) => (
        <Link to={`/company/${company.id}`}>
          <div key={company.id} className='company-card'>
            <h2>{company.name}</h2>
            <p>{`${company.city}, ${company.state}`}</p>
            <p>{company.short_description}</p>
            <p>Founded Date: {new Date(company.founded_date).toDateString()}</p>
            <h3>Founders:</h3>
            <ul>
              {company.founders.map((founder, index) => (
                <li key={index}>{founder}</li>
              ))}
            </ul>
            <button className='btn'>Learn More</button>
          </div>
        </Link>
      ))}
      <Link to='/create-company'>Add Company</Link>
    </>
  );
}

export default CompaniesIndex;
