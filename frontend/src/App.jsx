import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Events, { loader as addEventLoader } from "./pages/Events.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import EventLayout from "./pages/EventLayout.jsx";
import NewEvent from "./pages/NewEvent.jsx";
import EventDetail, {
  loader as eventDetailLoader,
  action as deleteActionEvent
} from "./pages/EventDetail.jsx";
import EditEvent from "./pages/EditEvent.jsx";
import {action as addEventAction} from './components/EventForm.jsx'
import NewsletterPage,{action as newsletterAction} from "./pages/NewsletterPage.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {path:"newsletter", element: <NewsletterPage /> , action: newsletterAction},
        {
          path: "event",
          element: <EventLayout />,
          children: [
            { index: true, element: <Events />, loader: addEventLoader },
            {
              path: ":eventId",
              id: 'event-detail',
              loader: eventDetailLoader,
              children: [
                { index: true, element: <EventDetail /> , action: deleteActionEvent},
                { path: "edit", element: <EditEvent /> ,action : addEventAction},
              ],
            },
            { path: "newevent", element: <NewEvent /> , action: addEventAction},
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
