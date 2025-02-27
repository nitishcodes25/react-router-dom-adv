import React from 'react'
import EventsList from '../components/EventsList.jsx'
import { useLoaderData } from 'react-router-dom'

export default function Events() {
    const data = useLoaderData()
    console.log(data)
  return (
    <>
     {data.map((event)=> <EventsList key={event._id} {...event}/>)}
    </>
  )
}

export const loader =  async() =>{
    const res = await fetch('http://localhost:3000/event/getAllEvents')

    if(!res.ok){

    }
    else{
        return res
    }
}
