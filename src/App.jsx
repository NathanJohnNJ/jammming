import NowPlaying from "./pages/NowPlaying";
import Playlists from "./pages/Playlists";
import Search from "./pages/Search";
import Overview from "./pages/Overview";
import Profile from "./pages/Profile";
import Root from "./pages/Root";
import Login from "./pages/Login";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import { generateCodeVerifier, generateCodeChallenge, getAccessToken } from "./lib/auth";
import "./App.css";

let verifier;
let codeChallenge;
let token;
if (!verifier){
   verifier = generateCodeVerifier(128);
   codeChallenge = await generateCodeChallenge(verifier);
}
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
if(code){
  token = await getAccessToken(code, verifier); 
}

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route path="/" element={ <Root /> }>
        <Route index element={ <Login challenge={codeChallenge} /> }/>
        <Route path="/callback" element={ <Overview token={token} />} />
        <Route path="/profile" element={ <Profile token={token}/>} />
        <Route path="/nowplaying" element={ <NowPlaying token={token} />} />
        <Route path="/playlists" element={ <Playlists token={token}/>} />
        <Route path="/search" element={ <Search token={token} />} />
      </Route>
  )
)

  return (
    <RouterProvider router={router} />
  );
}

export default App;
