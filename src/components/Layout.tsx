import { Outlet } from "react-router-dom"
function Layout() {
  return (
    <>
      <header>Header</header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default Layout
