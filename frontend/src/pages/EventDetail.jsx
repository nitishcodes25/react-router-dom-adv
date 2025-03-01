import React, { Suspense } from "react";
import {
    Await,
  Link,
  redirect,
  useLoaderData,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import EventsList from "../components/EventsList";
import { getAuthToken } from "../utils/storage.js";

export default function EventDetail() {
  const { event, events } = useRouteLoaderData("event-detail");
  const token = useRouteLoaderData('root')
  const submit = useSubmit();
  const deleteHandler = () => {
    const proceed = window.prompt("are you sure");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };
  return (
    <>
      <Suspense fallback={<p>loading event detail...</p>}>
        <Await resolve={event}>
          {(loadEvent) => (
            <div style={{ backgroundColor: "#ADD8E6" }}>
              <h2>{loadEvent.title}</h2>
              <img
                src={loadEvent.image}
                alt="event"
                style={{ height: 100, width: 100 }}
              />
              <time>{loadEvent.date}</time>
              <p>{loadEvent.description}</p>
              {token && 
              <>
              <button>
                <Link to="edit">Edit</Link>
              </button>
              <button onClick={deleteHandler}>Delete</button>
              </>}
            </div>
          )}
        </Await>
      </Suspense>
      <h1>Event details</h1>
      <Suspense fallback={<p>loading event details...</p>}>
        <Await resolve={events}>
          {(loadedEvents) =>
            loadedEvents.map((event) => (
              <EventsList key={event._id} {...event} />
            ))
          }
        </Await>
      </Suspense>
    </>
  );
}

export const loadEvents = async () => {
  const res = await fetch("http://localhost:3000/event/getAllEvents");

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    const data = await res.json();
    return data;
  }
};

export const loadEvent = async (id) => {
  const res = await fetch(`http://localhost:3000/event/${id}`);

  if (!res.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch event detail" }),
      { status: 500 }
    );
  } else {
    const data = await res.json()
    return data;
  }
};

export const loader = async ({ req, params }) => {
  const id = params.eventId;
  return {
    event: await loadEvent(id),
    events: loadEvents(),
  };
};

export const action = async ({ request, params }) => {
  const id = params.eventId;
  const token = getAuthToken()
  const res = await fetch(`http://localhost:3000/event/${id}/delete`, {
    method: request.method,
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  if (!res.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event!" }), {
      status: 500,
    });
  }
  return redirect("/event");
};
