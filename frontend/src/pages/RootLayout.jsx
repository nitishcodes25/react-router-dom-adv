import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function RootLayout() {
  const navigation = useNavigation()

  const isLoading = navigation.state === 'loading'
  return (
    <>
      <Header />
      {isLoading && <p>Loading...</p>}
      <main>
        <Outlet />
      </main>
    </>
  );
}
