import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Company } from './../../common/Company';
import { useNavigate } from 'react-router-dom';

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
    <div>
      {company && (
        <div>
          <h2>{company.name}</h2>
          <p>{`${company.city}, ${company.state}`}</p>
          <p>
            <strong>Short Description:</strong> {company.short_description}
          </p>
          <p>
            <strong>Long Description:</strong> {company.long_description}
          </p>
          <p>
            <strong>Founded Date:</strong>{' '}
            {new Date(company.founded_date).toDateString()}
          </p>
          <h3>Founders:</h3>
          {company.founders.map((founder, index) => (
            <div key={index}>
              <p>
                <strong>Name:</strong> {founder.full_name}
              </p>
              <p>
                <strong>Title:</strong> {founder.title}
              </p>
            </div>
          ))}

          <button onClick={handleEdit}>Edit Company</button>
          <button onClick={handleDelete}>Delete Company</button>
          <Link to='/add-founder' state={{ id, company }}>
            Add Founder
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
