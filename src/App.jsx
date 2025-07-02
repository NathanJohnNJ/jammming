import NowPlaying from "./pages/NowPlaying";
import Playlists from "./pages/Playlists";
import Search from "./pages/Search";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { populateUI } from "./main";

function App(props) {
  const { profile } = props;
  useEffect(() => {
    console.log(profile); 
    populateUI(profile);
  }, [profile]);
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root /> }>
      <Route index element={ <Overview />} />
      <Route path="/profile" element={ <Profile />} />
      <Route path="/nowplaying" element={ <NowPlaying />} />
      <Route path="/playlists" element={ <Playlists />} />
      <Route path="/search" element={ <Search />} />
    </Route>
  )
)

  return (
    <RouterProvider router={router} />
  );
}

export default App;
