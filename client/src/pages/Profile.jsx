import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import profile from "../assets/user.png";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const CONTACT_REGEX = /^\d{1,10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Profile = () => {
  const errRef = useRef();
  const successRef = useRef();

  const [pwd, setPwd] = useState("");

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${currentUser.result[0].customer_id}`,
        JSON.stringify(formData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess(true);
      setFormData("");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      console.log(currentUser.result[0].customer_id);
      const res = await axios.delete(
        `http://localhost:5000/api/users/delete/${currentUser.result[0].customer_id}`
      );
      dispatch(deleteUserSuccess(navigate("/")));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      dispatch(signOutUserSuccess());
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure());
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img
          src={profile}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        {formData === "" && pwd === "" ? (
          ""
        ) : (
          <>
            <p
              ref={errRef}
              className={
                error
                  ? "text-red-700 bg-red-400 font-bold p-2 mb-2"
                  : "offscreen"
              }
              aria-live='assertive'
            >
              {error}
            </p>
            <p
              ref={successRef}
              className={
                updateSuccess
                  ? "text-green-700 bg-green-400 font-bold p-2 mb-2 "
                  : "offscreen"
              }
              aria-live='assertive'
            >
              User is updated successfully!
            </p>
          </>
        )}
        {/* email  */}
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.customer_email}
          className='border p-3 rounded-lg text-black'
          onChange={handleChange}
        />

        {/* contact  */}

        <input
          type='contact'
          placeholder='contact'
          id='contact'
          defaultValue={currentUser.contact}
          className='border p-3 rounded-lg text-black'
          onChange={handleChange}
        />
        {/* new password  */}

        <input
          type='password'
          placeholder='New password'
          onChange={handleChange}
          id='password'
          className='border py-3 px-2 rounded-lg text-black'
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
    </div>
  );
};
export default Profile;
