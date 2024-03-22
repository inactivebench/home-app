import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import {
  faLocationDot,
  faBath,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import Card from "../components/Card";

const Search = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!isLoggedIn) {
        navigate("/signin");
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const minPriceFromUrl = urlParams.get("minPrice");
    const maxPriceFromUrl = urlParams.get("maxPrice");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      minPriceFromUrl ||
      maxPriceFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        minPrice: minPriceFromUrl || "",
        maxPrice: maxPriceFromUrl || "",

        //  parking: parkingFromUrl === "true" ? true : false,
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      try {
        const response = await axios(
          `http://localhost:5000/api/property/properties?${searchQuery}`
        );
        const data = response.data;

        // const res = await fetch(`/api/listing/get?${searchQuery}`);
        // const data = await res.json();
        if (data.length > 10) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === "minPrice") {
      setSidebardata({ ...sidebardata, minPrice: e.target.value });
    }
    if (e.target.id === "maxPrice") {
      setSidebardata({ ...sidebardata, maxPrice: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("minPrice", sidebardata.minPrice);
    urlParams.set("maxPrice", sidebardata.maxPrice);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const response = await axios(
      `http://localhost:5000/api/property/properties?${searchQuery}`
    );
    const data = response.data;
    // const res = await fetch(`/api/listing/get?${searchQuery}`);
    // const data = await res.json();
    if (data.length < 10) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-8 text-black'
        >
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Enter a Location'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Price:</label>
            <div className='flex gap-2'>
              <input
                type='text'
                id='minPrice'
                placeholder='Min. Price'
                className='border rounded-lg p-3 w-full'
                value={sidebardata.minPrice}
                onChange={handleChange}
              />
              <input
                type='text'
                id='maxPrice'
                placeholder='Max. Price'
                className='border rounded-lg p-3 w-full'
                value={sidebardata.maxPrice}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {/* {!loading &&
            listings &&
            listings.map((listing) => (
              <Card key={listing.property_id} listing={listing} />
            ))} */}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <Link to={`/listing/${listing.property_id}`}>
                <div className='mt-8 text-black w-full max-w-[28rem] mx-auto min-h-full  p-2 border rounded-lg border-black'>
                  <div
                    className='w-full max-w-[28rem] mx-auto min-h-full '
                    key={listing.property_id}
                  >
                    <div className='listing-header  mb-3 '>
                      <img
                        className='rounded-md'
                        src={listing.property_image_url}
                        alt='apartment image'
                      />
                    </div>
                    <div className='listing-info'>
                      <div className='listing-tag flex justify-between'>
                        {listing.property_category === "Apartment" ? (
                          <span className='capitalize rounded-md bg-sky-200 p-2 text-xs'>
                            apartment
                          </span>
                        ) : (
                          <span className='capitalize rounded-md bg-amber-300 p-2 text-xs'>
                            house
                          </span>
                        )}
                        {listing.property_type === "Rent" ? (
                          <span className='capitalize rounded-md bg-green-200 p-2 text-xs'>
                            for rent
                          </span>
                        ) : (
                          <span className='capitalize rounded-md bg-teal-300 p-2 text-xs'>
                            for sale
                          </span>
                        )}
                      </div>
                      <article className='listing-data my-2'>
                        <h1 className='font-bold capitalize text-2xl'>
                          {listing.property_title}
                        </h1>
                        <p className='text-sm'>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className='pr-2'
                          />
                          {listing.property_location}
                        </p>
                        <h2 className='capitalize text-slate-500'>
                          <span className='text-blue-700 text-2xl font-bold '>
                            Kshs {listing.property_price}
                          </span>
                          per month
                        </h2>
                      </article>
                      <hr className='h-px my-3 bg-gray-200 border dark:bg-gray-700'></hr>
                      <article className='more-listing-info'>
                        <ul className='flex justify-between'>
                          <li className='capitalize'>
                            <FontAwesomeIcon icon={faBed} className='pr-2' />
                            {listing.bedrooms > 1
                              ? `${listing.bedrooms} beds `
                              : `${listing.bedrooms} bed `}
                          </li>
                          <li className='capitalize'>
                            <FontAwesomeIcon icon={faBath} className='pr-2' />
                            {listing.no_of_baths > 1
                              ? `${listing.bathrooms} baths `
                              : `${listing.bathrooms} bath `}
                          </li>
                        </ul>
                      </article>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
