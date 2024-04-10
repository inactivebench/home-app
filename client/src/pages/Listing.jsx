import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  faLocationDot,
  faBath,
  faBed,
  faPhone,
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
              {listing[0].property_title} - Kshs{" "}
              {listing[0].property_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <img
              src={listing[0].property_image_url}
              alt='property image'
              className='rounded-md '
            />
            <div className='mt-6 flex justify-between'>
              <p className='flex items-center  gap-2 text-slate-700 capitalize text-base'>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className=' text-green-700'
                />
                {listing[0].property_location}
              </p>
              <p className='flex items-center  gap-2 text-slate-700  text-base'>
                <FontAwesomeIcon icon={faPhone} className=' text-green-700' />+
                {listing[0].property_owner_contact}
              </p>
            </div>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing[0].property_type === "Rent" ? "For Rent" : "For Sale"}
              </p>
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing[0].property_description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FontAwesomeIcon icon={faBed} className='' />
                {listing[0].bedrooms > 1
                  ? `${listing[0].bedrooms} beds `
                  : `${listing[0].bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FontAwesomeIcon icon={faBath} className='' />
                {listing[0].bathrooms > 1
                  ? `${listing[0].bathrooms} baths `
                  : `${listing[0].bathrooms} bath `}
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
};
export default Listing;
