import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { fullSearch } from "../../main";
import TrackResultItem from "../Search/ResultsItems/Tracks";
import AlbumResultItem from "../Search/ResultsItems/Albums";
import { NavLink } from "react-router-dom";
export default function SearchBar(props){
  const { setResults, types } = props;
  const [ searchValue, setSearchValue ] = useState('');
  const [ partialResult, setPartialResult ] = useState(null);

  async function submitHandler(e){
    e.preventDefault();
    const bar = document.getElementById("search");
    bar.classList.remove('bg-neutral-200');
    bar.classList.remove('text-neutral-700');
    bar.classList.add('bg-neutral-400');
    bar.classList.add('text-neutral-600');
    const finalResult = await fullSearch(searchValue, types);
    setPartialResult(null);
    setResults(finalResult);
  }
  async function changeHandler(e){
    e.preventDefault();
    setSearchValue(e.target.value);
    if (e.target.value !== ''){
      const result = await fullSearch(e.target.value, types);
    // console.log('Artists:');
    // console.log(result.artists);
    // console.log('Playlists:');
    // console.log(result.playlists);
      setPartialResult(result)
    } else {
      setPartialResult(null);
    }
  }
  function onClickHandler(){
    const bar = document.getElementById("search");
    bar.classList.remove('bg-neutral-400');
    bar.classList.remove('text-neutral-600');
    bar.classList.add('bg-neutral-200');
    bar.classList.add('text-neutral-700');
  }
  return (
    <div className="w-full h-fit absolute left-[50%] -translate-x-[50%] top-15">
        <form id="search" className="relative left-[50%] -translate-x-[50%] top-2 rounded-2xl opacity-80 bg-neutral-200 text-neutral-600 w-full h-[15%] flex flex-row items-center justify-between group transition-all duration-100" onSubmit={submitHandler}>
          <input type="text" className="flex self-start text-left group w-full h-full rounded-2xl  opacity-35 group-active:opacity-90" name="search" value={searchValue} onChange={changeHandler} onClick={onClickHandler} placeholder="Search..." />
            <GoSearch className="absolute right-2 top-0 opacity-45 group group-active:opacity-90 cursor-pointer" onClick={submitHandler} />
        </form>
      {
        partialResult &&
        <>
          <div className="flex flex-col">
            <h3 className="text-2xl text-left  bg-neutral-400 text-neutral-800">Tracks:</h3>
            <ul className="bq-neutral-300 w-[98%] h-fit">
              {
                partialResult.tracks.items.map((track, i) => {
                  return (
                    <TrackResultItem result={track} key={i} />
                  )
                })
              }
              <li className="">
                <NavLink to="/search" className="w-full h-fit" state={{url:partialResult.tracks.next}}>Show More Tracks...</NavLink>
              </li>
            </ul>
          </div>
            <div className="flex flex-col">
            <h3 className="text-2xl text-left  bg-neutral-400 text-neutral-800">Albums:</h3>
            <ul className="bq-neutral-300 w-[98%] h-fit">
              {
                partialResult.albums.items.map((album, i) => {
                  return (
                    <AlbumResultItem result={album} key={i} />
                  )
                })
              }
              <li className="">
                <NavLink to="/search" className="w-full h-fit" state={{url:partialResult.albums.next}}>Show More Albums...</NavLink>
              </li>
            </ul>
          </div>
          {/*<div className="flex flex-col">
            <h3 className="text-2xl text-left  bg-neutral-400 text-neutral-800">Artists:</h3>
            <ul className="bq-neutral-300 w-[98%] h-fit">
              {
                partialResult.artists.items.map((artist, i) => {
                  return (
                    <ResultItem result={artist} key={i} />
                  )
                })
              }
              <li className="">
                <NavLink to="/search" className="w-full h-fit" state={{url:partialResult.artists.next}}>Show More Artists...</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-2xl text-left  bg-neutral-400 text-neutral-800">Playlists:</h3>
            <ul className="bq-neutral-300 w-[98%] h-fit">
              {
                partialResult.playlists.items.map((playlist, i) => {
                  return (
                    <ResultItem result={playlist} key={i} />
                  )
                })
              }
              <li className="">
                <NavLink to="/search" className="w-full h-fit" state={{url:partialResult.playlists.next}}>Show More Playlists...</NavLink>
              </li>
            </ul>
          </div> */}
          <NavLink to="/search" className="w-full h-fit" state={{url:searchValue}}>Show More Results...</NavLink>
        </>
      }
    </div>
  )
}