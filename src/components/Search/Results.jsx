import ResultItem from './ResultItem';
import { NavLink } from 'react-router-dom';

export default function Results(props){
  const { results } = props;
  const tracks = results.tracks;
  
  return(
    <div className="h-full w-full flex flex-col items-start justify-start">
      <ul className="w-full h-fit flex flex-col">
        {tracks&&
          <ul className="">
            {
              tracks.items.map((track, i) => {
                return (
                  <ResultItem result={track} key={i} />
                )
              })
            }
            <li className="">
              <NavLink to="/search" className="" state={{url:tracks.next}}>Show More Tracks...</NavLink>
            </li>
          </ul>
        }
      </ul>
    </div>
  )
}