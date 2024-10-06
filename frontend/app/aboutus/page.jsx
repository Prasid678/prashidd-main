"use client";
import React from "react";
import "./aboutus.css";
import { IoGameControllerOutline } from "react-icons/io5";
import { SiRockstargames } from "react-icons/si";
import { IoMdBeer } from "react-icons/io";

const Page = () => {
  return (
    <>
      <div className="container">
        <section class="about-us ">
          <div class="mission-text">
            <h3>About Us</h3>
            <p>
              HubSpot’s company and culture are a lot like our product. They’re
              crafted, not cobbled, for a delightful experience.
            </p>
          </div>
          <img
            src="https://www.eventsair.com/wp-content/uploads/2024/03/In-Person-Event-Management-Software-with-EventsAir-1.png"
            alt="About Us Photo"
          />
        </section>

        <section class="mission">
          <img
            src="https://www.aeccglobal.com.np/images/2023/05/24/upcoming-events---mobile-banner-1.png"
            alt="Grow Better Photo"
          />
          <div class="mission-text">
            <h3>Our Mission: Helping Millions of Organizations Grow Better</h3>
            <p>
              We believe not just in growing bigger, but in growing better. And
              growing better means aligning the success of your own business
              with the success of your customers. Win-win!
            </p>
          </div>
        </section>

        <section class="our-story">
          <div class="mission-text">
            <h3>Our Story</h3>
            <p>
              In 2004, fellow MIT graduate students Brian Halligan and Dharmesh
              Shah noticed a major shift in the way people shop and purchase
              products...
            </p>
          </div>
          <img
            src="https://www.aeccglobal.com.np/images/easyblog_articles/259/b2ap3_thumbnail_We-just-hit-Refresh-e929e073836585b33b6ee96b533fb5a6.jpeg"
            alt="Our Story Photo"
          />
        </section>
        <section class="hubspot-by-numbers">
          <h2>HubSpot by Numbers</h2>
          <div class="stats">
            <div class="stat-item" style={{ backgroundColor: "#abc" }}>
              <SiRockstargames />

              <h4>Rockstar Mama</h4>
              <p>College moj garera ni top hanne hero.</p>
            </div>
            <div class="stat-item" style={{ backgroundColor: "#abc" }}>
              <IoGameControllerOutline />

              <h4>Gamer Sajjan</h4>
              <p>Fifa khelna sikaune guru.</p>
            </div>
            <div class="stat-item" style={{ backgroundColor: "#abc" }}>
              <IoMdBeer />

              <h4>Jadiya Birey</h4>
              <p>CR ko naam ma jadiya payo hamle.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
