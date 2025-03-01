import React from "react";
import { NavLink, Outlet, useRouteLoaderData } from "react-router-dom";

export default function EventLayout() {
  const token = useRouteLoaderData('root')
  return (
    <div>
      <NavLink
        to=""
        style={({ isActive }) => (isActive ? styles.active : undefined)}
        end
      >
        Events
      </NavLink>
      {token &&
      <NavLink
        to="newevent"
        style={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        New event
      </NavLink>
      }
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  active: {
    //   textDecoration: "underline",
    color: "green",
  },
};
