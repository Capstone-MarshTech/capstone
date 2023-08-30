import React, { useState, useEffect } from "react";
import { Modal, Select, MenuItem, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setSelectedYear,
  setSelectedMLB1,
  setSelectedMLB2,
} from "@/slicer/FilterSlicer";

export function Filter({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [localSelectedYear, setLocalSelectedYear] = useState("");
  const [localSelectedMLB1, setLocalSelectedMLB1] = useState("");
  const [localSelectedMLB2, setLocalSelectedMLB2] = useState("");

  const [years, setYears] = useState<string[]>([]);
  const [marshLineOfBusiness1, setMarshLineOfBusiness1] = useState<string[]>(
    []
  );
  const [marshLineOfBusiness2, setMarshLineOfBusiness2] = useState<string[]>(
    []
  );

  // Fetch all dropdown data when the filter pop-up is opened
  useEffect(() => {
    if (isOpen) {
      // Fetch years
      fetch("http://localhost:1337/dropdowns/years")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setYears(data);
        })
        .catch((error) => {
          console.error("Error fetching years:", error);
        });

      // Fetch Marsh business line 1 values
      fetch("http://localhost:1337/dropdowns/marsh_line_of_business_1")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setMarshLineOfBusiness1(data);
        })
        .catch((error) => {
          console.error("Error fetching Marsh business line 1:", error);
        });

      // Fetch Marsh business line 2 values
      fetch("http://localhost:1337/dropdowns/marsh_line_of_business_2")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setMarshLineOfBusiness2(data);
        })
        .catch((error) => {
          console.error("Error fetching Marsh business line 2:", error);
        });
    }
  }, [isOpen]);

  const dispatch = useDispatch();
  const handleYearSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocalSelectedYear(event.target.value as string);
  };

  const handleMLB1Select = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocalSelectedMLB1(event.target.value as string);
  };

  const handleMLB2Select = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocalSelectedMLB2(event.target.value as string);
  };

  const applyFilter = () => {
    // Implement your filtering logic here with the selected options
    dispatch(setSelectedYear(localSelectedYear));
    dispatch(setSelectedMLB1(localSelectedMLB1));
    dispatch(setSelectedMLB2(localSelectedMLB2));

    // Add your filtering code here, such as updating the state or sending a request to filter data.

    // Close the modal
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ padding: "20px", backgroundColor: "white" }}>
        <h2>Filter by Year</h2>
        <Select value={localSelectedYear} onChange={handleYearSelect}>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        <h2>Filter by Marsh Business Line 1</h2>
        <Select value={localSelectedMLB1} onChange={handleMLB1Select}>
          {marshLineOfBusiness1.map((mlb1) => (
            <MenuItem key={mlb1} value={mlb1}>
              {mlb1}
            </MenuItem>
          ))}
        </Select>
        <h2>Filter by Marsh Business Line 2</h2>
        <Select value={localSelectedMLB2} onChange={handleMLB2Select}>
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
