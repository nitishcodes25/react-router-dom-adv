import React from 'react'
import Header from '../components/Header.jsx'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const err = useRouteError()

  let title = "Something went wrong"
  let message = "Could not find resource or page"
  if(err.status === 500){
    message = JSON.parse(err.data).message
  }

  return (
    <>
    <Header/>
    <div>{title}</div>
    <p>{message}</p>
    </>
  )
}
