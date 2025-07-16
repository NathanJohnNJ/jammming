import { NavLink } from "react-router-dom";

export default function ArtistItem(props){
  const { artist } = props;
  const artistInfo = {
    name: artist.name,
    followers: artist.followers.total,
    genres: artist.genres,
    fullDetails: artist.href,
    popularity: artist.popularity,
    uri: artist.uri,
    image: artist.images[artist.images.length-1]
  };

  return (
    <div className="flex flex-row space-between w-[98%] rounded-md self-center justify-self-center relative hover:scale-[1.01] hover:shadow-2xl border-b-2 border-b-slate-600/40  bg-neutral-300 hover:bg-neutral-200" style={{height: artist.images[artist.images.length-1].height}}>
      <NavLink to="/info" state={artistInfo} className=" flex w-full justify-self-center rounded-md">
        <div className="w-full h-fit ml-3 mr-3 pl-4 py-0.5  text-neutral-800 font-light flex flex-col items-start justify-center text-xs rounded-md">
          <div className="flex flex-col items-centre justify-evenly w-[80%]">
            <p className="text-xl font-semibold text-left my-4">{artist.name}</p>
            <div className="flex flex-col items-start">
              <p className="text-[0.9em] font-semibold mr-4">Followers: <span className="font-extrabold">{artist.followers.total}</span></p>
              <p className="text-[0.9em] font-semibold">Popularity: <span className="font-extrabold">{artist.popularity}%</span></p>
            </div>
          </div>
          { artist.genres != [] &&
          <p className="overflow-x-scroll text-[0.8em] flex items-center"><span className="font-medium">Genres</span>:&nbsp;{artist.genres.map((genre,i) => {
            if (i === artist.genres.length-1){
              return <span key={i}>{genre.split('')[0].toUpperCase()}{genre.split('').toSpliced(0,1).join('')}</span>
            } else {
              return <span key={i}>{genre.split('')[0].toUpperCase()}{genre.split('').toSpliced(0,1).join('')},&nbsp;</span>
            }
          })}</p>
          }
        </div>
      </NavLink>
      <NavLink to="/info" state={artistInfo} className="absolute right-0 top-[50%] -translate-y-[50%] flex py-2" style={{height: artist.images[artist.images.length-1].height}}>
        <img className="rounded-md mr-3.75 hover:scale-[1.2]" src={artist.images[artist.images.length-1].url} alt={`Album artwork for ${artist.name}`} />
      </NavLink>
    </div>
  )
}