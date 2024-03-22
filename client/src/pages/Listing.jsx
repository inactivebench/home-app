import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  faLocationDot,
  faBath,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios(
          `http://localhost:5000/api/property/listing/${params.listingId}`
        );
        const data = response.data;
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className='text-black'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing[0].property_title} - $ {listing[0].property_price}
              {/* {listing.type === "rent" && " / month"} */}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FontAwesomeIcon
                icon={faLocationDot}
                className='pr-2 text-green-700'
              />
              {listing[0].property_location}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing[0].type === "rent" ? "For Rent" : "For Sale"}
              </p>
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing[0].property_description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FontAwesomeIcon icon={faBed} className='pr-2' />
                {listing[0].no_of_beds > 1
                  ? `${listing[0].no_of_beds} beds `
                  : `${listing[0].no_of_beds} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FontAwesomeIcon icon={faBath} className='pr-2' />
                {listing[0].no_of_baths > 1
                  ? `${listing[0].no_of_baths} baths `
                  : `${listing[0].no_of_baths} bath `}
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
};
export default Listing;
