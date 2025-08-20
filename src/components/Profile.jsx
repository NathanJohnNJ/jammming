import { fetchProfile, populateUI } from '../lib/profile';
import { useEffect } from "react";
export default function Profile() {

  useEffect(() => {
    async function getProfile(){
      const profile = await fetchProfile();
      const user_id = profile.id;
      localStorage.setItem("user_id", user_id);
      populateUI(profile);
    }
    getProfile();
  }, []);

  return (
      <section id="profile" className="relative flex flex-col items-center h-fit md:h-full w-full text-zinc-300">
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
        {/* <div className="flex group flex-col w-min h-[10%] group-hover:h-fit transition-all duration-100">
          <h3 className="font-extrabold underline text-lg -ml-2 self-start text-left transition-all duration-100">Links:</h3>
          <ul className="text-left text-sm opacity-0 group-hover:opacity-100 transition-all duration-100 w-full h-[0%] group-hover:h-full scale-0 group-hover:scale-100 -ml-4">
            <li className="transition-all duration-100 group-hover:opacity-100"><b>Spotify URI:</b>  <a id="uri" href="#" className="text-xs hover:text-green-900" ></a></li>
            <li className="transition-all duration-100 group-hover:opacity-100"><b>Link:</b> <a id="url" href="#" className="text-xs hover:text-green-900 transition-all duration-100"></a></li>
            <li className="transition-all duration-100 group-hover:opacity-100"><b>Profile Image:</b> <span id="imgUrl" className="text-xs hover:text-green-900 transition-all duration-100"></span></li>
          </ul>
        </div> */}
      </section>
  )
}
