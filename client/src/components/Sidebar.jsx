import React from "react";
import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsMenuButtonWideFill,
} from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { ImDownload } from "react-icons/im";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id='sidebar'
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <FaChartLine className='icon_header h-12 w-12' />
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsFillGrid3X3GapFill className='icon' /> Categories
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <BsMenuButtonWideFill className='icon' /> Reports
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href=''>
            <ImDownload className='icon' /> Download
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
