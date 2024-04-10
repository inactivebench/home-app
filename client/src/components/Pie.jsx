import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const PieCategory = () => {
  const [pieData, setPieData] = useState([]);
  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await axios(`http://localhost:5000/api/dashboard/pie`);
        const data = response.data;

        setPieData(data);
      } catch (error) {
        throw error;
      }
    };
    fetchPieData();
  }, []);
  return (
    <div className='bg-white px-6 py-8 shadow-lg rounded-lg  '>
      <h1 className=' mb-4 font-sans text-2xl text-center antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
        Distribution of Property Categories
      </h1>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          dataKey='category_count'
          nameKey='property_category'
          cx='50%'
          cy='50%'
          outerRadius={150}
          fill='#8884d8'
          label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </Pie>
        <Tooltip nameKey='property_category' />
        <Legend nameKey='property_category' />
      </PieChart>
    </div>
  );
};
export default PieCategory;
