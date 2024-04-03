import { useEffect, useState } from "react";
import { GiFamilyHouse } from "react-icons/gi";
import axios from "axios";
const InfoCard = () => {
  const [cardData, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/api/dashboard/card1`
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
    <div className='flex flex-col bg-blue-600 justify-around px-4 py-7 rounded-lg'>
      <div className='card-inner'>
        <h3 className='text-xl font-semibold'>Total Number of Property</h3>
        <GiFamilyHouse className='card_icon' />
      </div>
      {cardData.map((item) => {
        const { total_properties, index } = item;
        return (
          <h1 className='text-white font-bold text-2xl' key={index}>
            {total_properties}
          </h1>
        );
      })}
    </div>
  );
};
export default InfoCard;
