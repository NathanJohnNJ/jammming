import NowPlaying from "./pages/NowPlaying";
import Playlists from "./pages/Playlists";
import Search from "./pages/Search";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import CallBack from "./components/CallBack"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { generateCodeVerifier, generateCodeChallenge } from "./lib/auth";
import "./App.css";

let verifier;
let codeChallenge;
if (!verifier){
   verifier = generateCodeVerifier(128);
   codeChallenge = await generateCodeChallenge(verifier);
}

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root /> }>
    <Route index element={ <Login challenge={codeChallenge} /> }/>
    <Route path="/callback" element={ <Overview verifier={verifier} />} />
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
