
import React, { useState, useEffect } from 'react';
import { Modal, Select, MenuItem, Button } from '@mui/material';

function Filter({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLossBanding, setSelectedLossBanding] = useState('');
  const [selectedMLB1, setSelectedMLB1] = useState('');
  const [selectedMLB2, setSelectedMLB2] = useState('');
  const [years, setYears] = useState<string[]>([]);
  const [lossBandingValues, setLossBandingValues] = useState<string[]>([]);
  const [marshLineOfBusiness1, setMarshLineOfBusiness1] = useState<string[]>([]);
  const [marshLineOfBusiness2, setMarshLineOfBusiness2] = useState<string[]>([]);

  // Fetch all dropdown data when the filter pop-up is opened
  useEffect(() => {
    if (isOpen) {
      // Fetch years
      fetch('http://localhost:1337/dropdown/years')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setYears(data);
        })
        .catch((error) => {
          console.error('Error fetching years:', error);
        });

      // Fetch loss banding values
      fetch('http://localhost:1337/dropdown/loss_banding_values')
        .then((response) => {
          if (!response.ok) {
            throw Error('Network response was not ok')
          }
          return response.json();
        })
        .then((data) => {
          setLossBandingValues(data);
        })
        .catch((error) => {
          console.error('Error fetching loss banding values:', error);
        });

      // Fetch Marsh business line 1 values
      fetch('http://localhost:1337/dropdown/marsh_line_of_business_1')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setMarshLineOfBusiness1(data);
        })
        .catch((error) => {
          console.error('Error fetching Marsh business line 1:', error);
        });

      // Fetch Marsh business line 2 values
      fetch('http://localhost:1337/dropdown/marsh_line_of_business_2')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setMarshLineOfBusiness2(data);
        })
        .catch((error) => {
          console.error('Error fetching Marsh business line 2:', error);
        });
    }
  }, [isOpen]);

  const handleYearSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedYear(event.target.value as string);
  };

  const handleLossBandingSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedLossBanding(event.target.value as string);
  };

  const handleMLB1Select = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMLB1(event.target.value as string);
  };

  const handleMLB2Select = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMLB2(event.target.value as string);
  };

  const applyFilter = () => {
    // Implement your filtering logic here with the selected options
    console.log('Selected Year:', selectedYear);
    console.log('Selected Loss Banding:', selectedLossBanding);
    console.log('Selected Marsh Business Line 1:', selectedMLB1);
    console.log('Selected Marsh Business Line 2:', selectedMLB2);

    // Add your filtering code here, such as updating the state or sending a request to filter data.

    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ padding: '20px', backgroundColor: 'white' }}>
        <h2>Filter by Year</h2>
        <Select value={selectedYear} onChange={handleYearSelect}>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
        <h2>Filter by Loss Banding</h2>
        <Select value={selectedLossBanding} onChange={handleLossBandingSelect}>
          {lossBandingValues.map((lossBanding) => (
            <MenuItem key={lossBanding} value={lossBanding}>
              {lossBanding}
            </MenuItem>
          ))}
        </Select>
        <h2>Filter by Marsh Business Line 1</h2>
        <Select value={selectedMLB1} onChange={handleMLB1Select}>
          {marshLineOfBusiness1.map((mlb1) => (
            <MenuItem key={mlb1} value={mlb1}>
              {mlb1}
            </MenuItem>
          ))}
        </Select>
        <h2>Filter by Marsh Business Line 2</h2>
        <Select value={selectedMLB2} onChange={handleMLB2Select}>
          {marshLineOfBusiness2.map((mlb2) => (
            <MenuItem key={mlb2} value={mlb2}>
              {mlb2}
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
