import { NavLink } from "react-router-dom";
import { IoPeopleSharp } from "react-icons/io5";

export default function TrackItem(props){
  const { track } = props;
  const albumInfo = {
    name: track.album.name,
    artists: track.album.artists,
    spotifyLink: track.album.external_urls.spotify,
    release_date: track.album.release_date,
    image: track.album.images[0]
  };

  return (
    <div className="flex flex-row space-between w-full h-fit rounded-md self-center justify-self-center relative">
      <NavLink to="/info" state={track} className="flex w-full justify-self-center rounded-md">
        <div className="w-full h-fit ml-3 mr-3 pl-4 py-0.5 bg-neutral-300 hover:bg-neutral-200 hover:scale-[1.01] hover:shadow-2xl border-b-2 text-neutral-800 font-light border-b-slate-600/40 flex flex-col items-start justify-center text-xs rounded-md">
          <p className="text-sm font-semibold">{track.name}</p>
          <p>{track.album.name}</p>

          <p>
            <IoPeopleSharp className="inline" /> {track.artists.map((artist,i) => {
            if (i === track.artists.length-1){
              return <span key={i}>{artist.name}</span>
            } else {
              return <span key={i}>{artist.name},&nbsp;</span>
            }
          })}</p>
        </div>
      </NavLink>
      <NavLink to="/info" state={albumInfo} className="absolute right-0 flex" style={{height: track.album.images[track.album.images.length-1].height}}>
        <img className={`h-[${track.album.images[track.album.images.length-1].height}px] w-[${track.album.images[track.album.images.length-1].width}px] rounded-md mt-0.75 mr-3.75 hover:scale-[1.2]`} src={track.album.images[0].url} alt={`Album artwork for ${track.album.name}`} />
      </NavLink>
    </div>
  )
}