import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";
import axios from "axios";

const ScatterPlot = () => {
  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
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
  }, []);
  return (
    <div className='bg-white px-6 py-8 shadow-lg rounded-lg'>
      <h1 className='capitalize'>scatter data</h1>
      <ResponsiveContainer width='100%' height={400}>
        <ScatterChart
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
      </ResponsiveContainer>
    </div>
  );
};
export default ScatterPlot;
