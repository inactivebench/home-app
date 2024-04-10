import React, { useEffect, useState } from "react";
import axios from "axios";
const PropertyTable = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/api/dashboard/table`
        );
        const data = response.data;

        setTableData(data);
      } catch (error) {
        throw error;
      }
    };
    fetchdata();
  }, []);
  return (
    <div className=' text-black  bg-white shadow-md bg-clip-border rounded-xl '>
      <h1 className='p-4 font-sans text-2xl text-center antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
        Property Counts by Rental and Sale Type
      </h1>
      <table className='w-full text-left table-auto min-w-max'>
        <thead>
          <tr>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className=' font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Location
              </p>
            </th>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className=' font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Rental Count
              </p>
            </th>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className=' font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Sale Count
              </p>
            </th>
            <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50'>
              <p className=' font-sans text-lg antialiased font-normal leading-none text-blue-gray-900 opacity-70'>
                Total Count
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className='even:bg-slate-200'>
              <td className='p-4 font-sans text-sm capitalize antialiased font-normal leading-normal text-blue-gray-900'>
                {item.property_location}
              </td>
              <td className='p-4 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                {item.rental_count}
              </td>
              <td className='p-4 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                {item.sale_count}
              </td>
              <td className='p-4 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                {item.property_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PropertyTable;
