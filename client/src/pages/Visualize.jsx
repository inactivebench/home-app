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

function Visualize() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <main className='pb-6 h-dvh  bg-slate-100 flex flex-col md:flex-row'>
      <div className='sidebar'>
        ``
        <Sidebar />
      </div>
      <div className='flex flex-col items-center w-full'>
        <div className=' font-bold text-xl text-black'>
          <h3>DASHBOARD</h3>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 max-w-[100%] w-[80%] h-[80%] mb-8 '>
          {/* <div className=' rounded-lg border border-stroke bg-blue-700 p-4 shadow-default md:p-6 xl:p-7.5'> */}
          <div className='flex flex-col bg-blue-600 justify-around px-4 py-7 rounded-lg'>
            <div className='card-inner'>
              <h3>PRODUCTS</h3>
              <BsFillArchiveFill className='card_icon' />
            </div>
            <h1>300</h1>
          </div>
          <div className='flex flex-col bg-amber-600 justify-around px-4 py-7 rounded-lg'>
            <div className='card-inner'>
              <h3>CATEGORIES</h3>
              <BsFillGrid3X3GapFill className='card_icon' />
            </div>
            <h1>12</h1>
          </div>
          <div className='flex flex-col bg-emerald-600 justify-around px-4 py-7 rounded-lg'>
            <div className='card-inner'>
              <h3>CUSTOMERS</h3>
              <BsPeopleFill className='card_icon' />
            </div>
            <h1>33</h1>
          </div>
        </div>

        <div className=' '>
          <Chart />
          <Pie />
          <PropertyTable />
        </div>
      </div>
    </main>
  );
}

export default Visualize;
