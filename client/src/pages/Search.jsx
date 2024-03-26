import { useContext, useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import {
  faLocationDot,
  faBath,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../components/Pagination";
import axios from "axios";
// import Card from "../components/Card";

let PageSize = 12;

const Search = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    category: "all",
    minPrice: "",
    maxPrice: "",
    order: "DESC",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const { isLoggedIn } = useContext(LoginContext);
  const [currentPage, setCurrentPage] = useState(1);
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
    const categoryFromUrl = urlParams.get("category");
    const minPriceFromUrl = urlParams.get("minPrice");
    const maxPriceFromUrl = urlParams.get("maxPrice");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      categoryFromUrl ||
      minPriceFromUrl ||
      maxPriceFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        category: categoryFromUrl || "all",
        minPrice: minPriceFromUrl || "",
        maxPrice: maxPriceFromUrl || "",
        order: orderFromUrl || "DESC",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const response = await axios(
          `http://localhost:5000/api/property/properties?${searchQuery}`
        );
        const data = response.data;

        setListings(data);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "type") {
      setSidebardata({ ...sidebardata, type: e.target.value });
    }
    if (e.target.id === "category") {
      setSidebardata({ ...sidebardata, category: e.target.value });
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
    if (e.target.id === "order") {
      setSidebardata({ ...sidebardata, type: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("category", sidebardata.category);
    urlParams.set("minPrice", sidebardata.minPrice);
    urlParams.set("maxPrice", sidebardata.maxPrice);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const propertyData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return listings.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
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
            <select
              id='type'
              className='px-2 py-1 border rounded'
              onChange={handleChange}
            >
              <option value='all'>Rent & Sale</option>
              <option value='rent'>Rent</option>
              <option value='sale'>Sale</option>
            </select>

            <select
              id='category'
              className='px-2 py-1 border rounded'
              onChange={handleChange}
            >
              <option value='all'>All</option>
              <option value='apartment'>Apartment</option>
              <option value='house'>House</option>
            </select>

            {/* <div className='flex gap-2'>
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
            </div> */}
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
          <select
            onChange={handleChange}
            id='order'
            className='border rounded-lg p-3'
          >
            <option value='DESC'>Price high to low</option>
            <option value='ASC'>Price low to hight</option>
          </select>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4 justify-center'>
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
            propertyData.map((listing) => (
              // ------------card------------
              <Link to={`/listing/${listing.property_id}`}>
                <div
                  className='mt-8 w-full max-w-[24rem] md:w-[24rem] mx-auto min-h-full text-black shadow-lg '
                  key={listing.property_id}
                >
                  <div className='w-full   mb-3 '>
                    <img
                      className='h-[400px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-md'
                      src={listing.property_image_url}
                      alt='apartment image'
                    />
                  </div>
                  <div className='listing-info px-4'>
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
                          className='text-green-600 pr-2 '
                        />
                        {listing.property_location}
                      </p>
                      {listing.property_type === "Rent" ? (
                        <h2 className='capitalize text-slate-500'>
                          <span className='text-blue-500 text-2xl font-bold mr-2 '>
                            Kshs{" "}
                            {listing.property_price.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                          </span>
                          / month
                        </h2>
                      ) : (
                        <h2 className='capitalize text-slate-500'>
                          <span className='text-blue-500 text-2xl font-bold mr-2 '>
                            Kshs{" "}
                            {listing.property_price.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                          </span>
                        </h2>
                      )}
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
              </Link>
            ))}

          <Pagination
            className='w-full flex justify-center mt-8'
            currentPage={currentPage}
            totalCount={listings.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
export default Search;
