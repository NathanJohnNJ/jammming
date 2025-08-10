import { useState, useEffect } from "react";
import { getFeaturedArtists } from '../../../lib/playlists';

export default function ArtistsList(props){
  const { playlistId } = props;
  const [ artists, setArtists ] = useState([]);

  useEffect(()=>{
    async function getArtists(){
      const res = await getFeaturedArtists(playlistId);
      const artistArray = [];
      const artistNames = [];
      res.tracks.items.map((item) => {
        item.track.artists.map((artist)=> {
          if(!artistNames.includes(artist.name)){
            artistNames.push(artist.name);
            artistArray.push(artist);
          }
        })
      })
      setArtists(artistArray);
    }
    getArtists();
  }, [])

  return (
    <div className="m-4 p-2 rounded-3xl w-fit h-fit" id="artistsList">
      <ul className="bg-white rounded-2xl p-2 w-full h-full">
      <li className="text-black font-extrabold">Featured Artists:</li>
        { artists.map((artist, i) => {
          if(i<=4)
          return (
            <li className="text-zinc-600 hover:text-zinc-800" key={i}>
              <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer" className="no-underline font-semibold">
                {artist.name}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}