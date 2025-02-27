import React from 'react'
import EventForm from '../components/EventForm.jsx'
import { useRouteLoaderData } from 'react-router-dom'

export default function EditEvent() {
    const data = useRouteLoaderData('event-detail')
  return (
    <EventForm data={data} method="patch"/>
  )
}
