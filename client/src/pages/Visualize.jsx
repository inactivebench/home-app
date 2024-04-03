import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chart from "../components/Chart";
import Pie from "../components/Pie";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
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
  LineChart,
  Line,
} from "recharts";
import PropertyTable from "../components/PropertyTable";
import ScatterPlot from "../components/ScatterPlot";
import InfoCard from "../components/InfoCard";
import PercentageCard from "../components/PercentageCard";

function Visualize() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <main className='pb-6 bg-slate-100 flex flex-col md:flex-row'>
      <div className='sidebar'>
        ``
        <Sidebar />
      </div>
      <div className=' flex flex-col items-center w-full'>
        <div className=' font-bold text-xl text-black'>
          <h3>DASHBOARD</h3>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 max-w-[100%] w-[80%] h-[80%] mb-8 '>
          <InfoCard />
          <PercentageCard />
          <div className='flex flex-col bg-emerald-600 justify-around px-4 py-7 rounded-lg'>
            <div className='card-inner'>
              <h3>CUSTOMERS</h3>
              <BsPeopleFill className='card_icon' />
            </div>
            <h1>33</h1>
          </div>
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

          <div className='row-start-4 lg:row-start-3 lg:col-span-2'>
            <ScatterPlot />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Visualize;
