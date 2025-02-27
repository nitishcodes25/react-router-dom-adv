import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout.jsx'
import Home from './pages/Home.jsx'
import Events,{loader as addEventLoader} from './pages/Events.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {index: true, element: <Home/>},
        {path: 'events', element: <Events/>,loader: addEventLoader}
      ]
    }
  ])
  return (
    <RouterProvider router={router} /> 
  )
}
