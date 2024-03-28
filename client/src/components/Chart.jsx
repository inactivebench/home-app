import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";

const Chart = ({ data }) => {
  const [barData, setChartData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
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
    const fetchScatterData = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/api/dashboard/scatter`
        );
        const data = response.data;

        setScatterData(data);
      } catch (error) {
        throw error;
      }
    };
    fetchScatterData();
    fetchBarData();
  }, []);

  return (
    <div className='flex'>
      <div className='bg-white px-6 py-8 shadow-lg rounded-lg'>
        <h1 className='text-center mb-4'>title</h1>
        <BarChart
          width={600}
          height={400}
          data={barData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
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
      </div>
      <div className='bg-white px-6 py-8 shadow-lg rounded-lg'>
        <ScatterChart
          width={500}
          height={400}
          data={scatterData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type='number' dataKey='bedrooms' name='Number of Bedrooms' />
          <YAxis type='number' dataKey='property_price' name='Price' />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name='Properties' fill='#8884d8' />
        </ScatterChart>
        {/* </ResponsiveContainer> */}
      </div>
    </div>
  );
};
export default Chart;
