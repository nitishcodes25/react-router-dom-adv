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
import AuthenticationPage,{action as authAction} from "./pages/AuthenticationPage.jsx";
import {action as logoutAction} from './pages/Logout.jsx'
import { checkAuthLoader, tokenLoader } from "./utils/storage.js";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, element: <Home /> },
        {path:"newsletter", element: <NewsletterPage /> , action: newsletterAction},
        {path:"auth", element: <AuthenticationPage />, action: authAction},
        {path:"logout", action: logoutAction},
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
                { path: "edit", element: <EditEvent /> ,action : addEventAction, loader: checkAuthLoader},
              ],
            },
            { path: "newevent", element: <NewEvent /> , action: addEventAction, loader:  checkAuthLoader},
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
