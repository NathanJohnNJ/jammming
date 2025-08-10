import { NavLink } from "react-router-dom";
import { useDateFormatter } from "../../../lib/utils";

export default function AlbumItem(props){
  const { album } = props;
  const albumInfo = {
    name: album.name,
    artists: album.artists,
    spotifyLink: album.external_urls.spotify,
    release_date: album.release_date,
    image: album.images[album.images.length-1]
  };

  const formatDate = useDateFormatter;

  return (
    <div className="flex flex-row space-between w-full h-fit rounded-md self-center justify-self-center relative">
      <NavLink to="/info" state={album} className="flex w-full justify-self-center rounded-md">
        <div className="w-full h-fit ml-3 mr-3 pl-4 py-0.5 bg-neutral-300 hover:bg-neutral-200 hover:scale-[1.01] hover:shadow-2xl border-b-2 text-neutral-800 font-light border-b-slate-600/40 flex flex-col items-start justify-center text-xs rounded-md">
          <p className="text-sm font-semibold">{album.name}</p>
          <p>Released: {formatDate(album.release_date)}</p>
          <p>{album.artists.map((artist,i) => {
            if (i === album.artists.length-1){
              return <span key={i}>{artist.name}</span>
            } else {
              return <span key={i}>{artist.name},&nbsp;</span>
            }
          })}</p>
        </div>
      </NavLink>
      <NavLink to="/info" state={album} className="absolute right-0 flex">
        <img className="h-full rounded-md mt-0.75 mr-3.75 hover:scale-[1.2]" src={album.images[album.images.length-1].url} alt={`Artwork for ${album.name}`} />
      </NavLink>
    </div>
  )
}