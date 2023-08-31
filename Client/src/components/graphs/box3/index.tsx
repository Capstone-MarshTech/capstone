
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DashboardBox from '@/components/DashboardBox';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from 'recharts';

const GraphsBox3 = () => {
  const [lossBandingData, setLossBandingData] = useState([]);
  const [lossBandingDataYear, setLossBandingDataYear] = useState([]);
  const [dataWithMetrics, setDataWithMetrics] = useState([]);
  const [dataWithMetricsYear, setDataWithMetricsYear] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const selectedYear = useSelector((state) => state.filter.selectedYear);
  const selectedMLB1 = useSelector((state) => state.filter.selectedMLB1);
  const selectedMLB2 = useSelector((state) => state.filter.selectedMLB2);

  const showTitle = !selectedYear && !selectedMLB1 && !selectedMLB2
    ? 'Number of Claim Against Total Cost per Claim by Loss Band by All Years'
    : `Number of Claim Against Total Cost per Claim by Loss Band ${
      selectedYear ? `(${selectedYear})` : ''
    } ${selectedMLB1 ? `${selectedMLB1}` : ''} ${
      selectedMLB2 ? `and ${selectedMLB2})` : ''
    }`;

  useEffect(() => {
    const fetchLossBandingData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/dropdowns/loss_banding_values`
        );
        setLossBandingData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLossBandingData();
  }, [baseUrl]);

  useEffect(() => {
    if (selectedYear) {
      const fetchLossBandingDataByYear = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/statistics/loss_banding_values_by/${selectedYear}`
          );
          setLossBandingDataYear(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchLossBandingDataByYear();
    }
  }, [baseUrl, selectedYear]);

  useEffect(() => {
    if (lossBandingData.length > 0) {
      const fetchData = async () => {
        try {
          const totalIncurredPromises = lossBandingData.map(async (eachBanding) => {
            const response = await axios.get(
              `${baseUrl}/statistics/total_incurred_by?loss_banding=${eachBanding}`
            );
            return {
              'Loss Banding': eachBanding,
              'Total Incurred': response.data, // Assuming this endpoint returns total incurred data
            };
          });

          const numberOfClaimsPromises = lossBandingData.map(async (eachBanding) => {
            const response = await axios.get(
              `${baseUrl}/statistics/number_of_claims_by?loss_banding=${eachBanding}`
            );
            return {
              'Loss Banding': eachBanding,
              'Number of Claims': response.data, // Assuming this endpoint returns number of claims data
            };
          });

          const totalIncurredData = await Promise.all(totalIncurredPromises);
          const numberOfClaimsData = await Promise.all(numberOfClaimsPromises);

          // Merge the data based on 'Loss Banding'
          const mergedData = totalIncurredData.map((item) => ({
            ...item,
            ...numberOfClaimsData.find((entry) => entry['Loss Banding'] === item['Loss Banding']),
          }));

          setDataWithMetrics(mergedData);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, [baseUrl, lossBandingData]);

  useEffect(() => {
    if (lossBandingDataYear.length > 0 && selectedYear) {
      const fetchDataByYear = async () => {
        try {
          const numberOfClaimsPromises = lossBandingDataYear.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/number_of_claims_by/${selectedYear}?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const totalIncurredPromises = lossBandingDataYear.map(
            async (eachBanding) => {
              const response = await axios.get(
                `${baseUrl}/statistics/total_incurred_by/${selectedYear}?loss_banding=${eachBanding}`
              );
              return response.data;
            }
          );

          const numberOfClaims = await Promise.all(numberOfClaimsPromises);
          const totalIncurred = await Promise.all(totalIncurredPromises);

          const newData = lossBandingDataYear.map((eachBanding, index) => ({
            'Loss Banding': eachBanding,
            'Total Incurred': totalIncurred[index].toFixed(2),
            'Number of Claims': numberOfClaims[index].toFixed(2),
          }));

          setDataWithMetricsYear(newData);
        } catch (err) {
          console.error(err);
        }
      };

      fetchDataByYear();
    }
  }, [baseUrl, lossBandingDataYear, selectedYear]);

  return (
    <>
      <DashboardBox bgcolor='#fff' gridArea='b3'>
        <h3>{showTitle}</h3>
        <ResponsiveContainer width='100%' height={400}>
          {selectedYear ? (
            <ComposedChart
              width={800}
              height={400}
              data={dataWithMetricsYear}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis dataKey='Loss Banding' />
              <YAxis yAxisId='left' orientation='left' label={{ value: 'Total Incurred', angle: -90, position: 'insideLeft', offset: -15 }} />
              <YAxis yAxisId='right' orientation='right' label={{ value: 'Number of Claims', angle: 90, position: 'insideRight' }} />

              <Tooltip />
              <Legend />
              <Bar dataKey='Total Incurred' stackId='a' fill='#002c77' yAxisId='left' />
              <Line
                type='monotone'
                dataKey='Number of Claims'
                strokeWidth={2.5}
                stroke='#65cdff'
                yAxisId='right'
              />
            </ComposedChart>
          ) : (
            <ComposedChart
              width={800}
              height={400}
              data={dataWithMetrics}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis dataKey='Loss Banding' />
              <YAxis yAxisId='left' orientation='left' label={{ value: 'Total Incurred', angle: -90, position: 'insideLeft', offset: -15 }} />
              <YAxis yAxisId='right' orientation='right' label={{ value: 'Number of Claims', angle: 90, position: 'insideRight' }} />

              <Tooltip />
              <Legend />
              <Bar dataKey='Total Incurred' stackId='a' fill='#002c77' yAxisId='left' />
              <Line
                type='monotone'
                dataKey='Number of Claims'
                strokeWidth={2.5}
                stroke='#65cdff'
                yAxisId='right'
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default GraphsBox3;
