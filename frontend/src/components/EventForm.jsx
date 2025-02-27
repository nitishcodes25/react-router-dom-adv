import React from 'react'
import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom';

export default function EventForm({method,data}) {
    const navigate = useNavigate()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    const cancelHandler = () => {
        navigate('..')
    }
    let formattedDate = ''
    if(data){
        const dateObject = new Date(data.date);
        formattedDate = dateObject.toISOString().split("T")[0];
    }
  return (
    <Form method={method}>
        <input type="text" name="title" defaultValue={data ? data.title : ''} required />
        <input type="url" name="image" defaultValue={data ? data.image :  ''}  required />
        <input type="date" name="date" defaultValue={data? formattedDate : ''}  required />
        <input type="text" name="description" defaultValue={data? data.description:  ''}  required />
        <button type="button" disabled={isSubmitting} onClick={cancelHandler}>Cancel</button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting": "Save"}</button>
    </Form>
  )
}

export const action = async({request,params}) => {
    const data  = await request.formData()
    const method= request.method
    const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description')
    }

    let url = 'http://localhost:3000/event/newevent'
    if(method === 'PATCH'){
        const id = params.eventId
        url = `http://localhost:3000/event/${id}/edit`
    }
    console.log('code reached here', url)
  
    const res = await fetch(url,{
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })

    console.log({res})
  
    if(!res.ok){
      throw new Response(JSON.stringify('Could not add new event'),{status: 500})
    }
    return redirect('/event')
  }
