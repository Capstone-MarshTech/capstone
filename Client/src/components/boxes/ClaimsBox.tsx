import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const ClaimsBox = () => {
  const [claims, setClaims] = useState(0);
  const [claimsYear, setClaimsYear] = useState(0);
  const [claimsProductLine, setClaimsProductLine] = useState(0);

  const selectedYear = useSelector((state) => state.filter.selectedYear);
  const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);

  console.log(selectedYear, selectedMLB1);
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/counts/distinct_claims_count"
        );
        setClaims(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClaims();
  }, []);

  //based on the year
  useEffect(() => {
    const fetchClaimsYear = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/counts/distinct_claims_count/${selectedYear}`
        );
        setClaimsYear(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedYear) {
      fetchClaimsYear();
    }
  }, [selectedYear]);

  //based on the product line
  useEffect(() => {
    const fetchClaimsProductLine = async () => {
      try {
        const response = await axios.get(
          `  http://localhost:1337/counts/distinct_claims_count_by_line_of_business?marsh_line_of_business_1=${selectedMLB1}`
        );
        setClaimsProductLine(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedMLB1) {
      fetchClaimsProductLine();
    }
  }, [selectedMLB1]);

  return (
    <>
      <h6>
        NUMBER OF CLAIMS{" "}
        {selectedYear
          ? ` in ${selectedYear}`
          : selectedMLB1
          ? ` by ${selectedMLB1}`
          : " by All Years"}
      </h6>
      <h4>
        {selectedYear ? claimsYear : selectedMLB1 ? claimsProductLine : claims}
      </h4>
    </>
  );
};
