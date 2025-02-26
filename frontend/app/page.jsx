"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { useContext } from "react";
import { contextAPI } from "@/context/ContextPro";

import { useEffect, useState } from "react";
export default function Home() {
  const [eventdata, setEventData] = useState([]);
  const { verifyUser } = useContext(contextAPI);

  const getevents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getevents");

      // console.log(response.data);
      setEventData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getevents();
    verifyUser();
  }, []);

  return (
    <>
      <Hero />
      <div className="container">
        <div className="row mt-5 gx-5 gy-5">
          {eventdata.slice(0, 3).map((event) => (
            <div key={event._id} className="col-12 col-lg-4">
              <Card event={event} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
