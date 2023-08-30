import axios from "axios";
import React, { useState, useEffect } from "react";

export const ClaimsBox = () => {
  const [claims, setClaims] = useState(0);
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

  return (
    <>
      <h5>NUMBER OF CLAIMS </h5>
      <p>{claims}</p>
    </>
  );
};
