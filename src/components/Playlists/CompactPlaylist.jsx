import { getPlaylist, getPlaylists, populatePlaylist } from '../../lib/playlists';
import { useEffect, useState } from "react";
import RemoveTracks from './RemoveTracks';

export default function CompactPlaylist() {
  const [ items, setItems ] = useState([]);
  const [ playlist, setPlaylist ] = useState('');
  const [ name, setName ] = useState('');
  const [ id, setId ] = useState('');
  useEffect(() => {
    async function getData(){
      const playlists = await getPlaylists();
      setPlaylist(playlists.items[0]);
      const thisPlaylist = await getPlaylist(playlists.items[0].id);
      setName(playlists.items[0].name);
      setId(playlists.items[0].id);
      populatePlaylist(thisPlaylist);
    }
    getData();
  }, []);

  function clickHandler(){
    const allCheck = document.getElementById("allCheckbox");
    const checkboxes = document.getElementsByName('playlistSelector');
    if (!allCheck.checked){
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
      }
    }
  }

  return (
    <div className="flex flex-col items-center self-center justify-center playlistBG h-[90%] w-[98%] rounded-xl  ">
      <div className="h-[98.5%] w-[98.5%] bg-white rounded-lg flex flex-col">
        {
        playlist.images &&
        <img src={playlist.images[0].url} alt="Playlist artwork" className="w-[33%] h-auto rounded-lg flex self-center justify-self-center mt-2" />
        }
        <h2 className="text-zinc-800 text-shadow-lg text-[2vw] font-extrabold" id="playlistName">{name}</h2>
        <div className="w-[93%] h-min bg-neutral-100 sticky top-0 flex justify-self-center p-1 ml-2 justify-between">
          <input type="checkbox" id="allCheckbox" className="playlistCheck" onClick={clickHandler} />
          <RemoveTracks playlistId={id} />
        </div>
        <div id="playlistContainer" className="overflow-hidden">
        <ul id="playlistItems" className="text-black text-sm font-light overflow-y-scroll h-[98%] w-full">
        </ul>
        </div>
      </div>
    </div>
  )
}