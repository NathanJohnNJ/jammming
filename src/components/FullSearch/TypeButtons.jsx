import { useState } from "react";
export default function TypeButtons(props){
  const { setTypes, types } = props;
  const [ artists, setArtists ] = useState(true);
  const [ albums, setAlbums] = useState(true);
  const [ tracks, setTracks ] = useState(true);
  const [ playlists, setPlaylists ] = useState(true);
  function onClickHandle(type){
    if (types.split(',').includes(type)){
      const result = types.split(',').filter((word)=> {
        word !== type
      })
      setTypes(result.join(','));
    } else {
      const result = types.split(',').push(type);
      setTypes(result.join(','));
    }
    
  }
  function artistHandler(){
    setArtists(!artists);
    onClickHandle('artists');
  }
  function trackHandler(){
    setTracks(!tracks);
    onClickHandle('tracks');
  }
  function albumHandler(){
    setAlbums(!albums);
    onClickHandle('albums');
  }
  function playlistHandler(){
    setPlaylists(!playlists);
    onClickHandle('playlists');
  }

  return (
    <div className="w-full h-full absolute left-[50%] -translate-x-[50%] top-25">
      <div className="flex flex-row items-center justify-center">
        <button className={artists?'btn opacity-100 font-bold rounded-lg px-1 py-2 animate-[backgroundAnimation_10s_linear_infinite]':'btn opacity-40 font-light rounded-lg px-1 py-2 animate-[backgroundAnimation_30s_linear_infinite]'} onClick={artistHandler} ><span className="w-fit h-fit bg-neutral-800 text-neutral-400 p-2 rounded-lg">Artists</span></button>
        <button className={tracks?'btn opacity-100 font-bold rounded-lg px-1 py-2 animate-[backgroundAnimation_10s_linear_infinite]':'btn opacity-40 font-light rounded-lg px-1 py-2 animate-[backgroundAnimation_30s_linear_infinite]'} onClick={trackHandler} ><span className="w-fit h-fit bg-neutral-800 text-neutral-400 p-2 rounded-lg">Tracks</span></button>
        <button className={albums?'btn opacity-100 font-bold rounded-lg px-1 py-2 animate-[backgroundAnimation_10s_linear_infinite]':'btn opacity-40 font-light rounded-lg px-1 py-2 animate-[backgroundAnimation_30s_linear_infinite]'} onClick={albumHandler} ><span className="w-fit h-fit bg-neutral-800 text-neutral-400 p-2 rounded-lg">Albums</span></button>
        <button className={playlists?'btn opacity-100 font-bold rounded-lg px-1 py-2 animate-[backgroundAnimation_10s_linear_infinite]':'btn opacity-40 font-light rounded-lg px-1 py-2 animate-[backgroundAnimation_30s_linear_infinite]'} onClick={playlistHandler} ><span className="w-fit h-fit bg-neutral-800 text-neutral-400 p-2 rounded-lg">Playlists</span></button>
        <button onClick={onClickHandle} className="hidden"/>
      </div>
    </div>
  )
}