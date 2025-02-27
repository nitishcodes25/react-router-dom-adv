import React from "react";

export default function EventsList({ title, image, date, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt="event" style={{ height: 100, width: 100 }} />
      <time>{date}</time>
      <p>{description}</p>
    </div>
  );
}
