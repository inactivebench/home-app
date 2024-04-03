import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";

const Chart = ({ data }) => {
  const [barData, setChartData] = useState([]);
  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/api/dashboard/barchart`
        );
        const data = response.data;

        setChartData(data);
      } catch (error) {
        throw error;
      }
    };

    fetchBarData();
  }, []);

  return (
    <div className='bg-white px-6 py-8 shadow-lg rounded-lg'>
      <h1 className='text-center mb-4'>title</h1>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          data={barData}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='price_range' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='no_of_property' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
