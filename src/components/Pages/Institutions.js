import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Atomic/Atoms/Button';
import Input from '../Atomic/Atoms/Input';
import Modal from '../Atomic/Molecules/Modal';
import './style.scss'

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country: '',
    region: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    address: '',
    country: '',
    region: '',
  });

  useEffect(() => {
    // Fetch institutions data from the API
    axios.get('http://localhost:3000/institutions')
      .then(response => {
        setInstitutions(response.data);
        setIsLoading(false); // Data fetching is complete
      })
      .catch(error => {
        console.error('Error retrieving institutions:', error.message);
        setError('Failed to fetch institutions. Please try again later.');
        setIsLoading(false); // Data fetching is complete even if there's an error
      });
  }, []);

  // Function to handle form submission and insert the record into the database
  const handleSubmit = () => {
    // Check if any of the fields are empty
    if (!formData.name || !formData.address || !formData.country || !formData.region) {
      setErrorMessages({
        name: formData.name ? '' : 'Name is required',
        address: formData.address ? '' : 'Address is required',
        country: formData.country ? '' : 'Country is required',
        region: formData.region ? '' : 'Region is required',
      });
      return;
    }

    axios
      .post('http://localhost:3000/institutions', formData)
      .then(response => {
        setShowModal(false);
        setInstitutions([...institutions, response.data]);
        setSuccessMessage('Institution name successfully added!');

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);

        // Reset the formData state to empty after successful submission
        setFormData({
          name: '',
          address: '',
          country: '',
          region: '',
        });
        // Reset error messages after successful submission
        setErrorMessages({
          name: '',
          address: '',
          country: '',
          region: '',
        });
      })
      .catch(error => {
        console.error('Error adding institution:', error.message);
        // Handle the error if needed
      });
  };

  // Function to reset form data
  const resetFormData = () => {
    setFormData({
      name: '',
      address: '',
      country: '',
      region: '',
    });
    // Reset error messages
    setErrorMessages({
      name: '',
      address: '',
      country: '',
      region: '',
    });
  };

  const handleModalCancel = () => {
    setShowModal(false);
    resetFormData();
  };

  // Function to reset error messages when the user interacts with the input fields
const handleInputChange = (fieldName) => {
  setErrorMessages((prevErrorMessages) => ({
    ...prevErrorMessages,
    [fieldName]: '',
  }));
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="marker">Universities</h1>
      <h1>List of Institutions</h1>
      <div>
        <Button type= 'button' variant='inverted' onClick={() => setShowModal(true)}>Add Institution</Button>
      </div>
      <ul>
        {institutions.map(institution => (
          <li key={institution.id} className="Institution">
            <strong>Name:</strong> {institution.name}<br />
            <strong>Address:</strong> {institution.address}<br />
            <strong>Country:</strong> {institution.country}<br />
            <strong>Region:</strong> {institution.region}<br />
            <strong>ID:</strong> {institution.id}<br />
            <br />
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onCancel={handleModalCancel}>
        <div>
          <div> {/* Add your modal styles here */}
            <h2>Add Institution</h2>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  handleInputChange('name'); // Reset error message for 'name' field
                }}
                label="Name:"
              />
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  handleInputChange('address'); // Reset error message for 'address' field
                }}
                label="Address:"
              />
              <Input
                type="text"
                value={formData.country}
                onChange={(e) => {
                  setFormData({ ...formData, country: e.target.value });
                  handleInputChange('country'); // Reset error message for 'country' field
                }}
                label="Country:"
              />
              <Input
                type="text"
                value={formData.region}
                onChange={(e) => {
                  setFormData({ ...formData, region: e.target.value });
                  handleInputChange('region'); // Reset error message for 'country' field
                }}
                label="Region:"
              />
            {errorMessages.name && <div>{errorMessages.name}</div>}
            {errorMessages.address && <div>{errorMessages.address}</div>}
            {errorMessages.country && <div>{errorMessages.country}</div>}
            {errorMessages.region && <div>{errorMessages.region}</div>}
            <div>
            <Button type= 'submit' onClick={handleSubmit}>Submit</Button>
            {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}
          </div>
         
        </div>
        </div>
        </Modal>
        
      )}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default Institutions;