import React, { useState } from "react";
import axios from "axios";
import "../Stylepages/contact.css";
import FadeImage from "../customise/FadeImage";
import contact from "/assets/contactdown.webp";
import { buildApiUrl, API_CONFIG } from "../../utils/api";

export default function ContactUs({ goToContact }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const [showGif, setShowGif] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const apiUrl = buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER);
      const response = await axios.post(apiUrl, formData);

      if (response.status === 201) {
        setMessage("Thank you for registering!");
        setModalMessage("User registered successfully!");
        setModalType("success");
        setShowGif(true);
        // Clear the form inputs after successful submission
        setFormData({
          name: "",
          email: "",
          location: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form: ", error.response?.data || error.message);
      if (error.response && error.response.data) {
        setModalMessage(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        setModalMessage("Something went wrong.");
      }
      setModalType("error");
    }

    setIsLoading(false);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 5000);
  };

  // Function to go back to home page
  const goToHome = () => {
    // Dispatch custom event to notify App.jsx to go to home
    window.dispatchEvent(new CustomEvent('goToHome'));
  };

  return (
    <section
      id="#contact"
      className="relative min-h-screen min-w-screen max-h-screen min-w-max flex flex-col"
    >
      <header className="p-4 flex justify-between items-center  z-1 ">
        <h2 
          onClick={goToHome}
          style={{
            backgroundImage: "linear-gradient(179.571deg, rgb(255, 135, 60) 0%, rgb(13, 13, 13) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
          className="text-2xl font-bold cursor-pointer" 
        >
          THEBITCOIN.COM
        </h2>
        <button 
          onClick={goToContact} 
          className="hidden sm:inline-block text-white cursor-pointer bg-transparent border-none"
        >
          Contact Us
        </button>
        <button 
          onClick={goToContact} 
          className="sm:hidden z-1 bg-transparent border-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6  z-1  text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </header>

      <div className="flex-grow absolute z-3 contact flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 text-center justify-center w-full select-none">
        <div className="text-base sm:text-lg lg:text-xl max-w-xl sm:max-w-1xl mb-8 sm:mb-12  ">
          <p className="years text-white pt-2 mt-5">2025</p>
          <FadeImage
            text={
              <h3 className="ok mt-5 ">
                THE<a className="tails">BITCOIN</a>.COM
              </h3>
            }
            direction="up"
          />
          <FadeImage
            text={
              <p className="mb-4  text-sm  uppercase">
                Coming soon to your city
              </p>
            }
            direction="up"
          />

          <FadeImage
            component={
              <form onSubmit={handleSubmit}>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Name"
                    className="w-full px-4 py-2 bg-transparent text-white placeholder-grey-700 border-1 rounded-1 focus:outline-none"
                  />
                </div>
                <div className="relative mt-6 flex items-center">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 bg-transparent text-white placeholder-grey-700 border-0.01 rounded-1 focus:outline-none"
                  />
                </div>
                <div className="relative mt-6 flex items-center">
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Location"
                    className="w-full px-4 py-2 bg-transparent text-white placeholder-grey-700 border-0.01 rounded-1 focus:outline-none"
                  />
                </div>
                <div
                  className="flex justify-center mt-8"
                  style={{ fontSize: "16px" }}
                >
                  <button
                    type="submit"
                    className="w-full py-2 bg-black text-white  font-semibold uppercase rounded-1 hover:bg-blue-700 focus:outline-none"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
                <a
                  id="contact"
                  href="/"
                  className="go text-sm text-orange-500 hover:text-blue-400 ml-1"
                >
                  Back to Home
                </a>
              </form>
            }
            direction="up"
          />
        </div>
      </div>

      <div
        className="down"
        style={{
          position: "absolute",
          height: "auto",
          width: "auto",
          bottom: 0,
          zIndex: 2,
          opacity: 0.6,
        }}
      >
        <FadeImage
          src={contact}
          className="img-fluid"
          alt="Responsive image"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          direction="up"
        />
      </div>

      {/* Modal/Notification */}
      {showModal && (
        <div
          className={`fixed top-10 right-2 m-4 p-6 rounded-sm shadow-lg transition-all duration-500 ease-in-out ${
            modalType === "success" ? " " : " "
          }`}
          style={{ zIndex: 9999 }}
        >
          <p className="text-white text-sm font-semibold">{modalMessage}</p>
        </div>
      )}
    </section>
  );
}
