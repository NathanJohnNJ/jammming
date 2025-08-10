import { getPlaylist, getPlaylists, populatePlaylist, renamePlaylist, updatePlaylistDescription, checkBoxChecker } from '../../../lib/playlists';
import { useEffect, useState } from "react";
import RemoveTracks from '../RemoveTracks';
import NewPlaylist from '../NewPlaylist';

export default function CompactPlaylist() {
  const [ playlist, setPlaylist ] = useState(null);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ id, setId ] = useState('');
  const [ image, setImage ] = useState('');
  const show = localStorage.getItem("selection");

  useEffect(() => {
    async function getData(){
      const playlists = await getPlaylists();
      if(!playlist){
        const thisPlaylist = await getPlaylist(playlists.items[0].id);
        setName(thisPlaylist.name);
        setId(thisPlaylist.id);
        setDescription(thisPlaylist.description)
        setImage(thisPlaylist.images[0].url)
        populatePlaylist(thisPlaylist);
      } else {
        const thisPlaylist = await getPlaylist(playlist.id);
        setName(thisPlaylist.name);
        setId(thisPlaylist.id);
        setDescription(thisPlaylist.description)
        setImage(thisPlaylist.images[0].url)
        populatePlaylist(thisPlaylist, setTrackId);
      }
    }
    getData();
  }, []);

  async function submitName(){
    await renamePlaylist(id, name);
  }

  async function submitDescription(){
    await updatePlaylistDescription(id, description);
  }

  async function clickHandler(){
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
    await checkBoxChecker();
  }

  return (
    <div className="flex flex-col items-center self-center justify-center playlistBG h-[90%] w-[98%] rounded-xl  ">
      <div className="h-[98.5%] w-[98.5%] bg-white rounded-lg flex flex-col">
        <div className="flex justify-center w-full relative">
        {
        image &&
        <img src={image} alt="Playlist artwork" className="w-[33%] h-auto rounded-lg flex self-center justify-self-center mt-2" />
        }
        <NewPlaylist setPlaylist={setPlaylist} />
        </div>
        <form id="playlistName" className="relative rounded-2xl w-full h-[12.5%] flex flex-row items-center justify-between group p-0.5 -mt-0.5 transition-all duration-100" onSubmit={submitName}>
          <input type="text" className="flex self-start text-center text-zinc-800 text-shadow-lg text-[2vw] font-extrabold group w-full h-full rounded-2xl opacity-55 group-active:opacity-90 group-focus-within:opacity-90" name="playlistName" value={name} onChange={e => setName(e.target.value)} placeholder="Name..." />
        </form>
        <form id="playlistDescription" className="relative rounded-2xl opacity-80 bg-neutral-200 w-full h-[12.5%] flex flex-row items-center justify-between group p-0.5 -mt-0.5 transition-all duration-100" onSubmit={submitDescription}>
          <input type="text" className="flex self-start text-left text-sm ml-4 mr-4 p-2 w-full h-full rounded-2xl opacity-35 group-active:opacity-90 group-focus-within:opacity-90 group-focus-within:border-1" name="playlistDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..." />
        </form>
        <div className="w-[93%] h-min bg-neutral-100 sticky top-0 flex justify-self-center p-1 ml-2 justify-between">
          <input type="checkbox" id="allCheckbox" className="playlistCheck" onClick={clickHandler} />
          <RemoveTracks playlistId={id} show={show} />
        </div>
        <div id="playlistContainer" className="overflow-hidden">
        <ul id="playlistItems" className="text-black text-sm font-light overflow-y-scroll h-[98%] w-full">
        </ul>
        </div>
      </div>
    </div>
  )
}