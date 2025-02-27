import React from 'react'
import { NavLink } from 'react-router-dom'
import Newsletter from './Newsletter.jsx';

export default function Header() {
  return (
    <header>
        <nav>
            <ul>
                <li>
                    <NavLink to='' style={({isActive})=>isActive?styles.active: undefined} end>Home</NavLink>
                </li>
                <li>
                    <NavLink to='event'style={({isActive})=>isActive?styles.active: undefined} end>Events</NavLink>
                </li>
                <li>
                    <NavLink to='newsletter'style={({isActive})=>isActive?styles.active: undefined} end>Newsletter</NavLink>
                </li>
            </ul>
        </nav>
        <Newsletter/>
    </header>
  )
}

const styles = {
    active: {
      textDecoration: "underline",
      color: "blue",
    },
  };
