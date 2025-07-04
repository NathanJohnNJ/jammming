import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { fullSearch } from "../../main";


export default function SearchBar(){
  const [ searchValue, setSearchValue ] = useState('');
  const [ result, setResult ] = useState(null);

  async function submitHandler(e){
    e.preventDefault();
    const bar = document.getElementById("search");
    bar.style.width = "15vw";
    bar.classList.remove('bg-neutral-200');
    bar.classList.remove('text-neutral-700');
    bar.classList.add('bg-neutral-400');
    bar.classList.add('text-neutral-600');
    const finalResult = await fullSearch(searchValue);
    console.log(finalResult);
    setResult(finalResult);
  }
  async function changeHandler(e){
    e.preventDefault();
    setSearchValue(e.target.value);
  }
  function onClickHandler(){
    const bar = document.getElementById("search");
    bar.style.width = "60vw";
    bar.classList.remove('bg-neutral-400');
    bar.classList.remove('text-neutral-600');
    bar.classList.add('bg-neutral-200');
    bar.classList.add('text-neutral-700');
  }
  return (
    <div className="w-full h-full relative">
        <form id="search" className="absolute left-[50%] -translate-x-[50%] top-2 rounded-2xl opacity-80 bg-neutral-200 text-neutral-600 w-full h-[10%] flex flex-row items-center justify-between group transition-all duration-100" onSubmit={submitHandler}>
          <input type="text" className="relative flex self-start text-left group w-full h-full rounded-2xl  opacity-35 group-active:opacity-90" name="search" value={searchValue} onChange={changeHandler} onClick={onClickHandler} placeholder="Search..." />
            <GoSearch className="absolute right-2 top-1 opacity-45 group group-active:opacity-90" onClick={submitHandler} />
        </form>
      {
        result &&
        <div className="bg-neutral-200/55 rounded-md">
          <ul className="rounded-md">
            { result.tracks.items.map((track, i) => {
              return (
                <li className="flex flex-row w-full" key={i}>
                  <div className="flex flex-col h-full w-[75%]">
                    <p className="font-semibold text-sm">{track.name}</p>
                    <p className="font-thin text-xs">
                      {
                        track.artists.map((artist, i) => {
                          return i === track.artists.length -1 ? <span key={i}>{artist.name}</span> : <span key={i}>{artist.name}, </span>
                        })
                      }
                    </p>
                  </div>
                  <div className="h-full w-[25%]">
                    <img src={track.album.images[2]?track.album.images[2]:track.album.images[1]?track.album.images[1]:track.album.images[0]} alt={`Album artwork for ${track.album.name}`} className="w-full h-auto rounded-full" />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      }
    </div>
  )
}