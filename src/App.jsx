import Playlists from "./pages/Playlists";
import Search from "./pages/Search";
import Overview from "./pages/Overview";
import Root from "./pages/Root";
import Info from "./pages/Info";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { populateUI } from "./lib/profile";


function App(props) {
  const { profile, playlists } = props;
  useEffect(() => {
    populateUI(profile);
  }, [profile]);
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root /> }>
      <Route index element={ <Overview playlists={playlists} profile={profile} />} />
      <Route path="/playlists" element={ <Playlists playlists={playlists} />} />
      <Route path="/search" element={ <Search />} />
      <Route path="/info" element={ <Info />} />
    </Route>
  )
)

  return (
    <RouterProvider router={router} />
  );
}

export default App;
