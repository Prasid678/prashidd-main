"use client";
import React from "react";
import { Pacifico } from "next/font/google";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import "./event.css";
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const page = () => {
  const [eventdata, setEventData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6; // Define how many events per page
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Set selected category when clicked
    setCurrentPage(1); // Reset to first page when category changes
  };
  const filteredEvents = eventdata.filter(
    (event) =>
      event.eventName.toLowerCase().includes(searchQuery) ||
      (event.location.toLowerCase().includes(searchQuery) &&
        (selectedCategory === "" || event.category === selectedCategory))
  );
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const getevents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getevents");

      console.log(response.data);
      setEventData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getevents();
  }, []);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Handle pagination buttons
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    // <Navbar/>
    <>
      <div className={pacifico.className}>
        <h2
          className="text-center  display-2 fs-1 mt-4"
          style={{ color: "#2F2771" }}
        >
          Events
        </h2>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between pt-3">
          <div className="btn-group dropend" style={{ background: "#2F2771" }}>
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => handleCategoryChange("")}
              style={{ backgroundColor: "rgb(47, 39, 113)" }}
            >
              Category
            </button>
            <ul
              className="dropdown-menu categoryListText"
              style={{ background: "#2F2771" }}
            >
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleCategoryChange("Category A")}
                >
                  Category A
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleCategoryChange("Category B")}
                >
                  Category B
                </a>
              </li>
              {/* <hr className="dropdown-divider" /> */}
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => handleCategoryChange("Category C")}
                >
                  Category C
                </a>
              </li>
            </ul>
          </div>

          <div>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2 searchBar"
                type="search"
                placeholder="Search events"
                aria-label="Search"
              />
              <button className="btn searchBox" type="submit">
                Search
              </button>
            </form> */}
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="form-control me-2 searchBar"
                type="search"
                placeholder="Search events"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearch} // Update input value
              />
              <button className="btn searchBox" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row gx-5 gy-5 mt-3">
          {currentEvents.map((event) => (
            <div key={event._id} className="col-12 col-lg-4">
              <Card event={event} />
            </div>
          ))}
        </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePreviousPage}>
              Previous
            </button>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default page;
