import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const Listing = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (!isLoggedIn) {
        navigate("/signin");
      }
    }, 1000);
  }, []);
  return (
    <div>
      <h2 className='text-xl text-indigo-500'>buy a house</h2>
      <Navbar />
    </div>
  );
};
export default Listing;