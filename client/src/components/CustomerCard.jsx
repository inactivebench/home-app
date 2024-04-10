import { useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import axios from "axios";

const CustomerCard = () => {
  const [cardData, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/api/dashboard/card3`
        );
        const data = response.data;

        setData(data);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);
  return (
    <div className='flex flex-col bg-emerald-600 justify-around px-4 py-7 rounded-lg'>
      <div className='card-inner'>
        <h3 className='text-xl font-semibold'>Customers</h3>
        <BsPeopleFill className='card_icon' />
      </div>
      {cardData.map((item) => {
        const { customers, index } = item;
        return (
          <h1 className='text-white font-bold text-2xl' key={index}>
            {customers}
          </h1>
        );
      })}
    </div>
  );
};
export default CustomerCard;
