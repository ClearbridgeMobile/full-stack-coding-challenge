import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Company } from './../../common/Company';
import { useNavigate } from 'react-router-dom';

const CompanyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newFounderName, setNewFounderName] = useState('');
  const [newFounderTitle, setNewFounderTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/companies/${id}`
        );
        // console.log('response.data :>> ', response.data);
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

  const handleAddFounder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/companies/${id}/founders/`,
        {
          full_name: newFounderName,
          title: newFounderTitle,
          id,
        }
      );
      console.log(response.data.message); // Output success message

      // Update local state with the newly added founder
      setCompany((prevCompany) => ({
        ...prevCompany!,
        founders: [...prevCompany!.founders, response.data],
      }));

      // Reset input fields after adding founder
      setNewFounderName('');
      setNewFounderTitle('');
    } catch (error) {
      console.error('Failed to add founder:', error);
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

          <input
            type='text'
            placeholder='Enter Founder Name'
            value={newFounderName}
            onChange={(e) => setNewFounderName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Enter Founder Title'
            value={newFounderTitle}
            onChange={(e) => setNewFounderTitle(e.target.value)}
          />
          <button onClick={handleAddFounder}>Add Founder</button>
          <button onClick={handleEdit}>Edit Company</button>
          <button onClick={handleDelete}>Delete Company</button>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
