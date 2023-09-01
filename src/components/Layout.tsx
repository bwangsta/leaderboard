import { Outlet, ScrollRestoration } from "react-router-dom"
import Navbar from "./Navbar"

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <header>
        <Navbar />
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default Layout
