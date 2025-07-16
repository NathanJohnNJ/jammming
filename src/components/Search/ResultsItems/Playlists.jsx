import { NavLink } from "react-router-dom";

export default function PlaylistItem(props){
  const { playlist } = props;
  
  const playlistInfo = {
    name: playlist.name,
    owner: playlist.owner.display_name,
    description: playlist.description,
    id: playlist.id,
    tracksTotal: playlist.tracks.total,
    image: playlist.images[playlist.images.length-1]
  };

  return (
    <NavLink to="/info" state={playlistInfo} className="w-[98%] h-fit ml-3 mr-3 pl-4 py-0.5 text-neutral-800 font-light flex flex-col items-start justify-center text-xs rounded-md relative hover:scale-[1.01] hover:shadow-2xl border-b-2 border-b-slate-600/40  bg-neutral-300 hover:bg-neutral-200">
      <p className="text-sm font-semibold">{playlist.name}</p>
      <p>{playlist.owner.display_name}</p>
      <p className="text-sm font-regular">Tracks: <span className="font-bold">{playlist.tracks.total}</span></p>
      <img className="h-[90%] absolute right-0 rounded-md my-0.75 mr-1 hover:scale-[1.2]" src={playlist.images[playlist.images.length-1].url} alt={`Artwork for ${playlist.name}`} />
    </NavLink>
  )
}