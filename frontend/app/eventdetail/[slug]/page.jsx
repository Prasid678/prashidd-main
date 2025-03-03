"use client";
import React from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMap,
  FaRegUserCircle,
} from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiEmotionUnhappyLine } from "react-icons/ri";
import { RiEmotionHappyLine } from "react-icons/ri";
import { BiParty } from "react-icons/bi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { contextAPI } from "@/context/ContextPro";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const page = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [eventData, setEventData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const { userData } = useContext(contextAPI);

  const [eventsData, setEventsData] = useState([]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const getevents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getevents");

      console.log(response.data);
      setEventsData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSingleEvent = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/getevent/${slug}`);
      setEventData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    const toastId = toast.loading("Adding Comment...");
    try {
      await axios.post(
        `http://localhost:5000/addcomment/${slug}`,
        {
          comment: commentData,
        },
        {
          withCredentials: true,
        }
      );
      getSingleEvent();
      setCommentData("");
      toast.success("Comment added successfully");
      toast.dismiss(toastId);
    } catch (error) {
      toast.success("Error while adding comment");
      toast.dismiss(toastId);
    }
  };

  const registerForEvent = async (eventId) => {
    if (!userData) {
      toast.error("Please Sign In First!", {
        duration: 1000,
      });
      return;
    }
    const toastId = toast.loading("Updating profile...");
    try {
      const resp = await axios.get(
        `http://localhost:5000/applyforevent/${eventId}`,
        {
          withCredentials: true,
        }
      );

      if (resp.data.status === "applied") {
        toast.error(
          resp.data.message ? resp.data.message : "Error registering!"
        );
        toast.dismiss(toastId);
      } else {
        toast.success(
          resp.data.message ? resp.data.message : "Registered on the event!"
        );
        toast.dismiss(toastId);
      }
    } catch (error) {
      toast.error("Server Error!");
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (slug) {
      getSingleEvent();
    }
    getevents();
  }, []);

  return (
    <>
      {console.log(eventData)}
      <div className="container">
        <div>
          <div className="row" style={{ marginTop: "-15px" }}>
            <div className="col-lg-8 mt-4">
              <div className="card p-2">
                <img
                  src={eventData?.image}
                  alt=""
                  className="img-fuild"
                  style={{
                    height: "500px",
                    width: "100%",
                    position: "center",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <p className="fs-1">{eventData?.eventName}</p>
                  <p>
                    <FaClock /> {eventData?.time}
                  </p>
                  <p>
                    <FaCalendarAlt /> {formatDate(eventData?.date)}
                  </p>
                  <p className="fs-5 fw-bold">
                    <FaMapMarkerAlt /> {eventData?.location}
                  </p>
                  <p className="fs-6">{eventData?.description}</p>
                  <a
                    className="btn text-white"
                    style={{ backgroundColor: "#2f2771" }}
                    onClick={() => {
                      registerForEvent(slug);
                    }}
                  >
                    Register Here
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-5">
              <h3 className="" style={{ marginTop: "-270px" }}>
                More Events
              </h3>
              {/* <h3>you may like</h3> */}
              <div
                className="mt-2 mb-2"
                style={{ height: "3px", backgroundColor: "#2F2771" }}
              ></div>
              {eventsData.slice(0, 4).map((event, index) => (
                <div key={index} className="card mb-2">
                  <div className="card-body">
                    <h3>{event?.eventName}</h3>
                    <p>
                      <FaCalendarAlt /> {event?.date}
                    </p>
                    <p>
                      <FaMapMarkerAlt /> {event?.location}
                    </p>
                    <a
                      className="btn text-white"
                      style={{ backgroundColor: "#2f2771" }}
                      onClick={() => {
                        router.push(`/eventdetail/${event._id}`);
                      }}
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div>
                <div
                  className="mt-2 mb-2"
                  style={{ height: "3px", backgroundColor: "#2F2771" }}
                ></div>

                <h2>Comments/ Reviews</h2>
                <form
                  method="POST"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addComment();
                  }}
                >
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1" className="mb-2">
                      Leave a Comment
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Write your comment here"
                      name="comment"
                      onChange={(e) => setCommentData(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    style={{ backgroundColor: "#2F2771" }}
                  >
                    Submit
                  </button>
                </form>
                {console.log(eventData.comments)}
                {eventData.comments && eventData.comments.length > 0 ? (
                  eventData.comments.slice(0, 5).map((comment, index) => (
                    <div
                      className="card mt-2 d-flex flex-row justify-content-around align-item-center "
                      key={index}
                    >
                      <div className="card-body">
                        <p className="fw-bolder">{comment?.by?.name}</p>
                        <p className="">{comment?.comment}</p>
                      </div>
                      <div>
                        {" "}
                        <p className="fs-3 p-3">
                          {comment.sentiment === "negative" ? (
                            <RiEmotionUnhappyLine className="text-danger" />
                          ) : comment.sentiment == "neutral" ? (
                            <HiOutlineEmojiHappy />
                          ) : comment.sentiment == "positive" ? (
                            <RiEmotionHappyLine className="text-success" />
                          ) : null}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No comments available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
