import React, { Suspense } from 'react'
import EventsList from '../components/EventsList.jsx'
import { Await, useLoaderData } from 'react-router-dom'

export default function Events() {
    const {events} = useLoaderData()
  return (
    <Suspense fallback={<p>loading event details....</p>}>
    <Await resolve={events}>
      {(loadedEvents) => 
          loadedEvents.map((event) => <EventsList key={event._id} {...event} />)
        }
    </Await>
    </Suspense>
  )
}

export const loadEvents = async() => {
  const res = await fetch('http://localhost:3000/event/getAllEvents')
  
  if(!res.ok){
    throw new Response(JSON.stringify({message:"Could not fetch events"}), {status : 500})
  }
  else{
      const data = await res.json()
      return data
  }
}

export const loader = () => {
  return {
    events: loadEvents()
  }
}
