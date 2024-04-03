import axios from "axios";
import { LuBadgePercent } from "react-icons/lu";
import { useEffect, useState } from "react";

const PercentageCard = () => {
  const [cardData, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/api/dashboard/card2`
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
    <div className='flex flex-col bg-amber-600 justify-around px-4 py-7 rounded-lg'>
      <div className='card-inner'>
        <h3 className='text-xl font-semibold'>Property Types Distribution</h3>
        <LuBadgePercent className='card_icon' />
      </div>
      <div className='flex justify-between'>
        {cardData.map((item) => {
          const { property_type, percentage, index } = item;
          return (
            <h1 className='text-white font-bold text-2xl' key={index}>
              {property_type}: {percentage}
            </h1>
          );
        })}
      </div>
    </div>
  );
};
export default PercentageCard;
