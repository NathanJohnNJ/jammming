import { NavLink } from "react-router-dom";

export default function TrackResultItem(props){
  const { result } = props;
  const albumInfo = {
    name: result.album.name,
    artists: result.album.artists,
    spotifyLink: result.album.external_urls.spotify,
    release_date: result.album.release_date,
    image: result.album.images[result.album.images.length-1]
  };
  const trackInfo = {
    name: result.name,
    artists: result.artists,
    album: result.album,
    spotifyLink: result.external_urls.spotify,
    popularity: result.popularity,
    release_date: result.release_date,
    image: result.album.images[result.album.images.length-1]
  };

  return (
    <div className="flex flex-row space-between w-[80%] h-fit rounded-md self-center justify-self-center relative">
      <NavLink to="/info" state={trackInfo} className=" flex w-full justify-self-center rounded-md">
        <div className="w-full h-fit ml-3 pl-4 py-0.5 bg-neutral-300 border-b-2 text-neutral-800 font-light border-b-slate-600/40 flex flex-col items-start justify-center text-xs rounded-md">
          <p className="text-sm font-semibold">{result.name}</p>
          <p>{result.album.name}</p>
          <p>{result.artists.map((artist,i) => {
            if (i === result.artists.length-1){
              return <span key={i}>{artist.name}</span>
            } else {
              return <span key={i}>{artist.name}, </span>
            }
          })}</p>
        </div>
      </NavLink>
      <NavLink to="/info" state={albumInfo} className="absolute right-0 flex">
        <img className="w-20% h-full rounded-md mt-0.75" src={result.album.images[result.album.images.length-1].url} alt={`Album artwork for ${result.album.name}`} />
      </NavLink>
    </div>
  )
}