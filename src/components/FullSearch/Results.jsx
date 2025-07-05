import TrackResultItem from '../Search/ResultsItems/Tracks';
import AlbumResultItem from '../Search/ResultsItems/Albums';
import { NavLink } from 'react-router-dom';

export default function Results(props){
  const { results } = props;
  const tracks = results.tracks;
  
  return(
    <div className="h-full w-full flex flex-col items-start justify-start">
      <ul className="w-full h-fit flex flex-col">
        {tracks&&
          <div className="flex flex-col bg-neutral-300">
            <h3 className="text-2xl">Tracks</h3>
            <ul className="">
              {
                tracks.items.map((track, i) => {
                  return (
                    <TrackResultItem result={track} key={i} />
                  )
                })
              }
              <li className="">
                <NavLink to="/search" className="w-full h-fit" state={{url:tracks.next}}>Show More Tracks...</NavLink>
              </li>
            </ul>
          </div>
        }
      </ul>
    </div>
  )
}