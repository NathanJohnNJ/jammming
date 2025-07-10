import PlaylistItem from "./PlaylistItem";
import { getPlaylist, getPlaylists, populatePlaylist } from '../main';
import { useEffect, useState } from "react";

export default function CompactPlaylist() {
  const [ items, setItems ] = useState([]);
  const [ playlist, setPlaylist ] = useState('');
  useEffect(() => {
    async function getData(){
      const playlists = await getPlaylists();
      setPlaylist(playlists.items[0]);
      const thisPlaylist = await getPlaylist(playlists.items[0].id);
      populatePlaylist(thisPlaylist);
      // console.log(thisPlaylist.tracks.items);
      // setItems(thisPlaylist.tracks.items);
    }
    getData();
    // console.log(`Items: ${items}`);
  }, [])

  return (
    <div className="flex flex-col items-center self-center justify-center playlistBG h-[90%] w-[98%] rounded-xl  ">
      <div className="h-[96.5%] w-[95.5%] bg-white rounded-lg flex flex-col">
        {
        playlist.images &&
        <img src={playlist.images[0].url} alt="Playlist artwork" className="w-[33%] h-auto rounded-lg flex self-center justify-self-center" />
        }
        <h2 className="" id="playlistName"></h2>
        <ul id="playlistItems" className="text-black text-sm font-light overflow-y-scroll h-[98%] w-[100%] ml-2 -mr-4">

        </ul>
        {/* <div className="grid grid-cols-5 auto-rows-fr w-full h-full overflow-y-scroll">
          {
          thisPlaylist.tracks.items && 
          thisPlaylist.tracks.items.map((item, i) => {
            <PlaylistItem item={item} key={i} />
          })} */}
        {/* </div> */}
      </div>
    </div>
  )
}