import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const TotalIncurredBox = () => {
  const [totalIncurred, setTotalIncurred] = useState(0);
  const [totalIncurredYear, setTotalIncurredYear] = useState(0);
  const [totalIncurredProductLine, setTotalIncurredProductLine] = useState(0);

  const selectedYear = useSelector((state) => state.filter.selectedYear);
  const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);

  useEffect(() => {
    const fetchTotalIncurred = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/metrics/total_incurred"
        );
        setTotalIncurred(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTotalIncurred();
  }, []);

  //based on year
  useEffect(() => {
    const fetchTotalIncurredYear = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/metrics/total_incurred/${selectedYear}`
        );
        setTotalIncurredYear(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedYear) {
      fetchTotalIncurredYear();
    }
  }, [selectedYear]);

  //based on product line
  useEffect(() => {
    const fetchTotalIncurredProductLine = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/metrics/total_incurred_by_line_of_business?marsh_line_of_business_1=${selectedMLB1}`
        );
        setTotalIncurredProductLine(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedMLB1) {
      fetchTotalIncurredProductLine();
    }
  }, [selectedMLB1]);

  return (
    <>
      <h6>
        TOTAL INCURRED{"  "}
        {selectedYear
          ? ` in ${selectedYear}`
          : selectedMLB1
          ? ` by ${selectedMLB1}`
          : " by All Years"}
      </h6>
      <h4>
        {selectedYear
          ? totalIncurredYear.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })
          : selectedMLB1
          ? totalIncurredProductLine.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })
          : totalIncurred.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
            })}
      </h4>
    </>
  );
};
