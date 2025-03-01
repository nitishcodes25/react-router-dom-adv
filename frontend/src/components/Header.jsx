import React from 'react'
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom'
import Newsletter from './Newsletter.jsx';

export default function Header() {
  const token = useRouteLoaderData('root')
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
                {!token &&
                <li>
                    <NavLink to='auth?mode=login'style={({isActive})=>isActive?styles.active: undefined} end>Authentication</NavLink>
                </li>
                }
                {token && <li>
                    <Form method='post' action='/logout'>
                        <button>Logout</button>
                    </Form>
                </li>
                }
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
