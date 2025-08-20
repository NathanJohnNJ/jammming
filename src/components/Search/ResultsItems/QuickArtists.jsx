import { NavLink } from "react-router-dom";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { TbChartBarPopular } from "react-icons/tb";
import { getArtistAlbums } from '../../../lib/info';
import { useState } from "react";

export default function ArtistItem(props){
  const { artist } = props;
  const artistAlbums = getArtistAlbums();
  const albumsNum = artistAlbums.length;
  const [ hovered, setHovered ] = useState(false);

  return (
    <div className="flex flex-row space-between w-[98%] rounded-2xl self-center justify-self-center relative hover:scale-[1.01] hover:shadow-2xl border-b-2 border-b-slate-600/40 bg-neutral-300 hover:bg-neutral-200 transition-all duration-75" style={{height: hovered? artist.images[artist.images.length-1].height : artist.images[artist.images.length-1].height / 2}} onMouseOver={()=>setHovered(true)} onMouseOut={()=>setHovered(false)}>
      <NavLink to="/info" state={artist} className="flex w-full mt-2">
        <div className="w-full h-fit ml-3 pl-2 text-neutral-800 font-light flex flex-col items-start justify-center text-xs rounded-md">
          <div className="flex flex-col items-centre justify-evenly w-[80%]">
            <p className="text-lg font-bold text-left">{artist.name}</p>
            <div className="flex flex-col items-start">
              <p className="text-[0.9em] font-semibold mr-4 flex"><IoPeopleCircleOutline className="text-[1.1rem] mb-1 mx-1" /> Followers: <span className="font-bold mt-[0.4px] ml-1">{artist.followers.total}</span></p>
              <p className="text-[0.9em] font-semibold flex transition-all duration-75" style={{ opacity: hovered? 1 : 0 }}><TbChartBarPopular className="text-[1.1rem] mx-1 mb-1" /> Popularity: <span className="font-bold mt-[0.4px] ml-1">{artist.popularity}%</span></p>
            </div>
          </div>
          { artist.genres != [] &&
          <p className="overflow-x-scroll text-[0.9em] flex items-center transition-all duration-75" style={{ opacity: hovered? 1 : 0 }}><span className="font-medium">Genres</span>:&nbsp;{artist.genres.map((genre,i) => {
            if (i === artist.genres.length-1){
              return <span key={i}>{genre.split('')[0].toUpperCase()}{genre.split('').toSpliced(0,1).join('')}</span>
            } else {
              return <span key={i}>{genre.split('')[0].toUpperCase()}{genre.split('').toSpliced(0,1).join('')},&nbsp;</span>
            }
          })}</p>
          }
        </div>
      </NavLink>
      <NavLink to="/info" state={artist} className="absolute right-0 top-[50%] -translate-y-[50%] flex py-2 transition-all duration-75" style={{height: hovered? artist.images[artist.images.length-1].height : artist.images[artist.images.length-1].height / 2}}>
        <img className="rounded-md mr-3.75 hover:scale-[1.2]" src={artist.images[artist.images.length-1].url} alt={`Album artwork for ${artist.name}`} />
      </NavLink>
    </div>
  )
}