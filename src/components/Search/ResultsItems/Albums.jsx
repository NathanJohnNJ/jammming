import { NavLink } from "react-router-dom";

export default function AlbumResultItem(props){
  const { result } = props;
  const albumInfo = {
    name: result.name,
    artists: result.artists,
    spotifyLink: result.external_urls.spotify,
    release_date: result.release_date,
    image: result.images[result.images.length-1]
  };

  return (
    <div className="flex flex-row space-between w-[80%] h-fit rounded-md self-center justify-self-center relative">
      <NavLink to="/info" state={albumInfo} className=" flex w-full justify-self-center rounded-md">
        <div className="w-full h-fit ml-3 pl-4 py-0.5 bg-neutral-300 border-b-2 text-neutral-800 font-light border-b-slate-600/40 flex flex-col items-start justify-center text-xs rounded-md">
          <p className="text-sm font-semibold">{result.name}</p>
          <p>Released: {result.release_date}</p>
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
        <img className="w-20% h-full rounded-md mt-0.75" src={result.images[result.images.length-1].url} alt={`Album artwork for ${result.name}`} />
      </NavLink>
    </div>
  )
}