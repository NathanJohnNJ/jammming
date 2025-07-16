import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { fullSearch } from "../../../lib/search";
import TrackItem from "../ResultsItems/Tracks";
import AlbumItem from "../ResultsItems/Albums";
import ArtistItem from "../ResultsItems/Artists";
import PlaylistItem from "../ResultsItems/Playlists";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
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

  useEffect(()=>{
    async function search(){
      if (searchValue !== ''){
        const result = await fullSearch(searchValue, types);
        setPartialResult(result)
      } else {
        setPartialResult(null);
      }
    }
    search();
  }, [types])
  return (
    <div className="w-full h-fit max-h-[90%] absolute left-[50%] -translate-x-[50%] top-25">
        <form id="search" className="relative left-[50%] -translate-x-[50%] top-2 rounded-2xl opacity-80 bg-neutral-200 text-neutral-600 w-[90%] h-[15%] flex flex-row items-center justify-between group transition-all duration-100" onSubmit={submitHandler}>
          <input type="text" className="flex self-start text-left group w-full h-full rounded-2xl  opacity-35 group-active:opacity-90 pl-2 p-1 pt-0" name="search" value={searchValue} onChange={changeHandler} onClick={onClickHandler} placeholder="Search..." />
            <GoSearch className="absolute right-2 top-1 opacity-45 group group-active:opacity-90 hover:scale-[1.2] cursor-pointer" onClick={submitHandler} />
        </form>
      {
        <AnimatePresence>
          {
        partialResult &&
        <motion.div className="relative h-[80vh] mt-2 w-[88%] place-self-center overflow-y-scroll rounded-b-2xl bg-linear-to-br from-neutral-500 to-40% to-neutral-400"
        initial={{ height: 0 }}
        animate={{ height: '80vh' , transition: {duration: 0.075} }}
        exit={{ height: 0 }}
        >
      {
        partialResult.tracks &&
          <div className="flex flex-col h-min w-full place-self-center rounded-b-2xl">
            <h3 className="text-xl text-left text-neutral-100 sticky top-2 mb-2 ml-4">Tracks:</h3>
            <ul className="bq-neutral-300 w-full h-fit sticky top-50">
              {
                partialResult.tracks.items.map((track, i) => {
                  return (
                    <AnimatePresence key={i}>
                      { track &&
                        <motion.div 
                        initial={{ height: 0, sacle: 0 }}
                        animate={{ height: 'fit-content', scale: 1, transition: {delay: i*0.05, duration: 0.075} }}
                        exit={{ height: 0, scale: 0 }}
                        >
                          <TrackItem track={track} key={i} />
                        </motion.div>
                      }
                    </AnimatePresence>
                  )
                })
              }
              <li className="hover:scale-[1.15]">
                <NavLink to="/search" className="w-full h-fit cursor-pointer" state={{url:partialResult.tracks.next}}>Show More Tracks...</NavLink>
              </li>
            </ul>
          </div>
        }
        {
        partialResult.albums &&
          <div className="flex flex-col h-min w-full place-self-center rounded-b-2xl">
            <h3 className="text-xl text-left text-neutral-100 sticky top-2 mb-2 ml-4">Albums:</h3>
            <ul className="bq-neutral-300 w-full h-fit sticky top-50">
              {
                partialResult.albums.items.map((album, i) => {
                  return (
                    <AnimatePresence key={i}>
                      { album &&
                        <motion.div 
                        initial={{ height: 0, sacle: 0 }}
                        animate={{ height: 'fit-content', scale: 1, transition: {delay: i*0.05, duration: 0.075} }}
                        exit={{ height: 0, scale: 0 }}
                        >
                          <AlbumItem album={album} key={i} />
                        </motion.div>
                      }
                    </AnimatePresence>
                  )
                })
              }
              <li className="hover:scale-[1.15]">
                <NavLink to="/search" className="w-full h-fit cursor-pointer" state={{url:partialResult.albums.next}}>Show More Albums...</NavLink>
              </li>
            </ul>
          </div>
        }
        {
        partialResult.artists &&
          <div className="flex flex-col h-min w-full place-self-center rounded-b-2xl">
            <h3 className="text-xl text-left text-neutral-100 sticky top-2 mb-2 ml-4">Artists:</h3>
            <ul className="bq-neutral-300 w-full h-fit sticky top-50">
              {
                partialResult.artists.items.map((artist, i) => {
                  return (
                    <AnimatePresence key={i}>
                      { artist &&
                        <motion.div 
                        initial={{ height: 0, sacle: 0 }}
                        animate={{ height: 'fit-content', scale: 1, transition: {delay: i*0.05, duration: 0.075} }}
                        exit={{ height: 0, scale: 0 }}
                        >
                          <ArtistItem artist={artist} key={i} />
                        </motion.div>
                      }
                    </AnimatePresence>
                  )
                })
              }
              <li className="hover:scale-[1.15]">
                <NavLink to="/search" className="w-full h-fit cursor-pointer" state={{url:partialResult.artists.next}}>Show More Artists...</NavLink>
              </li>
            </ul>
          </div>
        }
        {
        partialResult.playlists &&
          <div className="flex flex-col h-min w-full place-self-center rounded-b-2xl">
            <h3 className="text-xl text-left text-neutral-100 sticky top-2 mb-2 ml-4">Playlists:</h3>
            <ul className="bq-neutral-300 w-full h-fit sticky top-50">
              {
                partialResult.playlists.items.map((playlist, i) => {
                  return (
                    <AnimatePresence key={i}>
                      { playlist &&
                        <motion.div 
                        initial={{ height: 0, sacle: 0 }}
                        animate={{ height: 'fit-content', scale: 1, transition: {delay: i*0.05, duration: 0.075} }}
                        exit={{ height: 0, scale: 0 }}
                        >
                          <PlaylistItem playlist={playlist} key={i} />
                        </motion.div>
                      }
                    </AnimatePresence>
                  )
                })
              }
              <li className="hover:scale-[1.15]">
                <NavLink to="/search" className="w-full h-fit cursor-pointer" state={{url:partialResult.playlists.next}}>Show More Playlists...</NavLink>
              </li>
            </ul>
          </div>
        }
        <div className="hover:scale-[1.15]">
          <NavLink to="/search" className="w-full h-fit cursor-pointer" state={{url:searchValue}}>Show More Results...</NavLink>
        </div>
        </motion.div>
          }
        </AnimatePresence>
      }
    </div>
  )
}