import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Home, { loader as homeLoader } from "./pages/home/Home.tsx"
import PlayersPage, {
  loader as playersLoader,
} from "./pages/players/PlayersPage.tsx"
import Error from "./pages/error/Error.tsx"
import Layout from "./components/Layout.tsx"
import MatchesPage, {
  loader as matchesLoader,
} from "./pages/matches/MatchesPage.tsx"
import GamePage, { loader as gameLoader } from "./pages/games/GamePage.tsx"
import PlayerProfilePage, {
  loader as playersProfileLoader,
} from "./pages/players/PlayerProfilePage.tsx"
import "./index.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<Error />}>
      <Route path="/" index element={<Home />} loader={homeLoader} />
      <Route path="/players" element={<PlayersPage />} loader={playersLoader} />
      <Route
        path="/players/:playerId"
        element={<PlayerProfilePage />}
        loader={playersProfileLoader}
      />
      <Route path="/matches" element={<MatchesPage />} loader={matchesLoader} />
      <Route
        path="/games/:gameName"
        element={<GamePage />}
        loader={gameLoader}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
