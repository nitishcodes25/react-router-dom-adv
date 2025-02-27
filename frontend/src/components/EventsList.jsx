import React from "react";
import { Link } from "react-router-dom";

export default function EventsList({ title, image, date, description,_id }) {
  return (
    <Link to={`/event/${_id}`}>
      <div style={{ backgroundColor: "#ADD8E6" }}>
        <h2>{title}</h2>
        <img src={image} alt="event" style={{ height: 100, width: 100 }} />
        <time>{date}</time>
        <p>{description}</p>
      </div>
    </Link>
  );
}
