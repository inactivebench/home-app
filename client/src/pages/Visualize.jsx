import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import Pie from "../components/Pie";
import { FaRegFileAlt } from "react-icons/fa";
import { CSVLink } from "react-csv";
import PropertyTable from "../components/PropertyTable";
import ScatterPlot from "../components/ScatterPlot";
import InfoCard from "../components/InfoCard";
import PercentageCard from "../components/PercentageCard";
import axios from "axios";
import CustomerCard from "../components/CustomerCard";

function Visualize() {
  const [propertyData, setPropertyData] = useState([]);

  const handleDownload = async () => {
    console.log("button clicked");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/dashboard/download`
      );
      setPropertyData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className='pb-6 bg-slate-100 flex flex-col md:flex-row'>
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className=' flex flex-col items-center w-full'>
        <div className='container w-full font-bold text-xl text-black flex items-center justify-between pt-4 '>
          <h3>DASHBOARD</h3>
          <CSVLink data={propertyData} filename={"property_data.csv"}>
            <button
              className='px-5 py-2 bg-blue-300 text-blue-950 flex items-center '
              onClick={handleDownload}
            >
              <FaRegFileAlt className='h-5 w-5' />
              <span className='text-lg font-bold'>Export To CSV</span>
            </button>
          </CSVLink>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 max-w-[100%] w-[80%] h-[80%] mb-8 '>
          <InfoCard />
          <PercentageCard />
          <CustomerCard />
        </div>

        <div className='container grid grid-cols-1 grid-rows-5 lg:grid-cols-5  lg:grid-rows-3  gap-x-7 gap-y-9 max-w-[100%] w-[90%]  '>
          <div className='lg:col-start-1 lg:col-span-3  '>
            <Chart />
          </div>
          <div className='row-start-2 lg:col-start-4 lg:row-start-1 lg:col-span-2'>
            <Pie />
          </div>
          <div className='row-start-3 lg:row-start-2 col-span-full  '>
            <PropertyTable />
          </div>

          <div className='row-start-4 lg:row-start-3 lg:col-span-3'>
            <ScatterPlot />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Visualize;
