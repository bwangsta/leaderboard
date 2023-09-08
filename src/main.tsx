import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/home/Home.tsx"
import PlayersPage from "./pages/players/PlayersPage.tsx"
import Error from "./pages/error/Error.tsx"
import Layout from "./components/Layout.tsx"
import MatchesPage from "./pages/matches/MatchesPage.tsx"
import GamePage from "./pages/games/GamePage.tsx"
import PlayerProfilePage from "./pages/players/PlayerProfilePage.tsx"
import "./index.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<Error />}>
      <Route path="/" index element={<Home />} />
      <Route path="/players" element={<PlayersPage />} />
      <Route path="/players/:playerId" element={<PlayerProfilePage />} />
      <Route path="/matches" element={<MatchesPage />} />
      <Route path="/games/:gameName" element={<GamePage />} />
    </Route>
  )
)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
