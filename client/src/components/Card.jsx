import React from "react";
import {
  faLocationDot,
  faBath,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../assets/mika-baumeister-PshCtT16gJo-unsplash.jpg";

const Card = ({ listing }) => {
  return (
    <div>card</div>
    // <div className='mt-8 text-black w-full max-w-[28rem] mx-auto min-h-full  p-2 border rounded-lg border-black'>
    //   <div
    //     className='w-full max-w-[28rem] mx-auto min-h-full '
    //     key={listing.property_id}
    //   >
    //     <div className='listing-header  mb-3 '>
    //       <img
    //         className='rounded-md'
    //         src={listing.property_image_url}
    //         alt='apartment image'
    //       />
    //     </div>
    //     <div className='listing-info'>
    //       <div className='listing-tag flex justify-between'>
    //         <span className='capitalize rounded-md bg-sky-200 p-2 text-xs'>
    //           apartment
    //         </span>
    //         <span className='capitalize rounded-md bg-green-200 p-2 text-xs'>
    //           for rent
    //         </span>
    //       </div>
    //       <article className='listing-data my-2'>
    //         <h1 className='font-bold capitalize text-2xl'>
    //           {listing.property_title}
    //         </h1>
    //         <p className='text-sm'>
    //           <FontAwesomeIcon icon={faLocationDot} className='pr-2' />
    //           123 Maple Street, Willowbrook {listing.property_location}
    //         </p>
    //         <h2 className='capitalize text-slate-500'>
    //           <span className='text-blue-700 text-2xl font-bold '>
    //             Kshs {listing.property_price}
    //           </span>
    //           per month
    //         </h2>
    //       </article>
    //       <hr className='h-px my-3 bg-gray-200 border dark:bg-gray-700'></hr>
    //       <article className='more-listing-info'>
    //         <ul className='flex justify-between'>
    //           <li className='capitalize'>
    //             <FontAwesomeIcon icon={faBed} className='pr-2' />
    //             {listing.no_of_beds > 1
    //               ? `${listing.bedrooms} beds `
    //               : `${listing.bedrooms} bed `}
    //           </li>
    //           <li className='capitalize'>
    //             <FontAwesomeIcon icon={faBath} className='pr-2' />
    //             {listing.no_of_baths > 1
    //               ? `${listing.bathrooms} baths `
    //               : `${listing.bathrooms} bath `}
    //           </li>
    //         </ul>
    //       </article>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
