import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Home, { loader as homeLoader } from "./pages/home/Home.tsx"
import Players, { loader as playersLoader } from "./pages/players/Players.tsx"
import Error from "./pages/error/Error.tsx"
import Layout from "./components/Layout.tsx"
import Matches, { loader as matchesLoader } from "./pages/matches/Matches.tsx"
import "./index.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<Error />}>
      <Route path="/" index element={<Home />} loader={homeLoader} />
      <Route path="/players" element={<Players />} loader={playersLoader} />
      <Route path="/matches" element={<Matches />} loader={matchesLoader} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
