import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function EventLayout() {
  return (
    <div>
      <NavLink
        to=""
        style={({ isActive }) => (isActive ? styles.active : undefined)}
        end
      >
        Events
      </NavLink>
      <NavLink
        to="newevent"
        style={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        New event
      </NavLink>
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
