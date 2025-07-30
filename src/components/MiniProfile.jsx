import { fetchProfile, populateMiniUI } from '../lib/profile';
import { useEffect } from "react";
export default function MiniProfile() {

  useEffect(() => {
    async function getProfile(){
      const profile = await fetchProfile();
      populateMiniUI(profile);
    }
    getProfile();
  }, []);

  return (
      <section id="profile" className="flex flex-col items-center h-max w-full -mb-8">
        <div className="flex items-center justify-evenly mt-0 group h-full">
          <span id="miniAvatar" className="rounded-full m-2"></span>
          <ul className="h-full -mt-4">
            <li>
              <h2 className="text-sm text-zinc-700">Logged in as <span className="font-black text-zinc-500" id="miniDisplayName"></span></h2>
            </li>
            <li className="text-xs text-zinc-700"><b>User ID:</b>  <span className="font-black text-zinc-500"  id="miniId"></span></li>
            <li className="text-xs text-zinc-700"><b>Email:</b> <span className="font-black text-zinc-500"  id="miniEmail"></span></li>
          </ul>
        </div>
      </section>
  )
}
