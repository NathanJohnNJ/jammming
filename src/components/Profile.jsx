import { fetchProfile, populateUI } from '../lib/profile';
import { useEffect, useState } from "react";
export default function Profile() {
  const [showLinks, setShowLionks] = useState(false)

  useEffect(() => {
    async function getProfile(){
      const profile = await fetchProfile();
      const user_id = profile.id;
      localStorage.setItem("user_id", user_id);
      populateUI(profile);
    }
    getProfile();
  }, []);

  function mouseEnter(){
    setShowLionks(true);
  }
  function mouseLeave(){
    setShowLionks(false);
  }

  return (
      <section id="profile" className="relative flex flex-col items-center h-max md:h-full w-full text-zinc-300">
        <div className="flex items-center justify-evenly mt-0 group">
          <span id="avatar" className="rounded-full m-2 ml-4 -mr-8 group-hover:ml-0 group-hover:mr-0 transition-all duration-100"></span>
          <ul className="text-base group">
            <li className="group">
              <h2 className="text-lg font-bold spotifyMix group">Logged in as<br></br> <span className="text-3xl font-black group" id="displayName"></span></h2>
            </li>
            <li className="opacity-0 group group-hover:opacity-100 transition-all duration-100"><b>User ID:</b>  <span id="id"></span></li>
            <li className="-mt-8 group-hover:mt-0 transition-all duration-100"><b>Email:</b> <span id="email"></span></li>
          </ul>
        </div>
        <div className="flex flex-col absolute bottom-0 translate-y-[10%] left-[50%] -translate-x-[50%] h-min w-min" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
          <h3 className="font-extrabold underline text-lg -ml-2 self-start text-left">Links:</h3>
          <ul className="text-left text-sm opacity-0 transition-all duration-100" style={{opacity: showLinks ? 1 : 0}}>
            <li><b>Spotify URI:</b>  <a id="uri" href="#" className="text-xs hover:font-medium hover:text-green-900" ></a></li>
            <li><b>Link:</b> <a id="url" href="#" className="text-xs hover:font-medium hover:text-green-900"></a></li>
            <li><b>Profile Image:</b> <span id="imgUrl" className="text-xs hover:font-medium hover:text-green-900"></span></li>
          </ul>
        </div>
      </section>
  )
}
