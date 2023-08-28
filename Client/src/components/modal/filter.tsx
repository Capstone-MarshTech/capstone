import React, { useState, useEffect } from 'react';
import { Modal, Select, MenuItem, Button } from '@mui/material';

function Filter({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedValue, setSelectedValue] = useState('');
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  // Fetch the list of years when the filter pop-up is opened
  useEffect(() => {
    if (isOpen) {
      console.log('Fetching years...');
      // Make an HTTP request to your endpoint with the full URL
      fetch('http://localhost:9000/dropdown/years') // Replace with the correct full URL
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched years:', data);
          // Assuming the response is an array of year strings (e.g., ["2023", "2022"])
          setYearOptions(data);
        })
        .catch((error) => {
          console.error('Error fetching years:', error);
        });
    }
  }, [isOpen]);

  const handleYearSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
  };

  const applyFilter = () => {
    // Implement your filtering logic here with the selectedValue
    // For example, you can log the selected year to the console:
    console.log('Selected Year:', selectedValue);

    // Add your filtering code here, such as updating the state or sending a request to filter data.

    // Close the modal after applying the filter
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ padding: '20px', backgroundColor: 'white' }}>
        <h2>Filter by Year</h2>
        <Select value={selectedValue} onChange={handleYearSelect}>
          {yearOptions.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" onClick={applyFilter}>
          Apply Filter
        </Button>
      </div>
    </Modal>
  );
}

export default Filter;
