// AddFounderPage.tsx

import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddFounder() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [newFounderName, setNewFounderName] = useState('');
  const [newFounderTitle, setNewFounderTitle] = useState('');

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
      // Reset input fields after adding founder
      setNewFounderName('');
      setNewFounderTitle('');
      navigate(`/company/${id}`);
    } catch (error) {
      console.error('Failed to add founder:', error);
    }
  };

  return (
    <div>
      <h2>Add Founder</h2>
      <form onSubmit={handleAddFounder}>
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
        <button type='submit'>Add Founder</button>
      </form>
      {/* <button onClick={() => history.push('/company')}>Back to Company</button> */}
    </div>
  );
}

export default AddFounder;
