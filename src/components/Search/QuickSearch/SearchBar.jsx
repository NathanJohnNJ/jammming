import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { quickSearch } from "../../../lib/search";
import TrackItem  from '../ResultsItems/Tracks';
import AlbumItem from "../ResultsItems/Albums";
import PlaylistItem  from '../ResultsItems/Playlists';
import ArtistItem from "../ResultsItems/QuickArtists";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";


export default function SearchBar(props){
  const { setResults } = props;
  const [ searchValue, setSearchValue ] = useState('');
  const [ partialResult, setPartialResult ] = useState('');

  async function submitHandler(e){
    e.preventDefault();
    const bar = document.getElementById("search");
    bar.classList.remove('bg-neutral-200');
    bar.classList.remove('text-neutral-700');
    bar.classList.add('bg-neutral-400');
    bar.classList.add('text-neutral-600');
    const finalResult = await quickSearch(searchValue);
    setPartialResult('');
    setResults(finalResult);
  }
  async function changeHandler(e){
    e.preventDefault();
    setSearchValue(e.target.value);
    if (e.target.value !== ''){
      const result = await quickSearch(e.target.value);
      setPartialResult(result);
    } else {
      setPartialResult('');
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
    <div className="w-full h-[57dvh] py-5 absolute left-[50%] -translate-x-[50%] -top-5 md:top-0">
      <form id="search" className="relative rounded-2xl opacity-80 bg-neutral-200 text-neutral-600 w-full h-[2.5dvh] flex flex-row items-center justify-between group p-0.5 -mt-0.5 transition-all duration-100" onSubmit={submitHandler}>
        <input type="text" className="flex self-start text-left text-xs group w-full h-full rounded-2xl opacity-35 group-active:opacity-90" name="search" value={searchValue} onChange={changeHandler} onClick={onClickHandler} placeholder="Search..." />
        <GoSearch className="absolute right-2 top-0 opacity-45 group group-active:opacity-90 cursor-pointer" onClick={submitHandler} />
      </form>
      <AnimatePresence>
        { partialResult &&
          <motion.div id="quickResultsContainer" className="h-fit mt-0 w-[98%] place-self-center rounded-b-2xl bg-linear-to-br from-lime-200/20 via-38% via-neutral-100/20 to-85% to-lime-100/30 overflow-y-scroll"
          initial={{ height: 0 }}
          animate={{ height: '80%' , transition: {duration: 0.075} }}
          exit={{ height: 0 }}
          >
            { partialResult.tracks &&
            <div className="flex flex-col h-fit" id="tracksQuickResultsContainer">
              <h3 className="bg-linear-to-br from-lime-200/80 to-70% to-neutral-500/80 text-base text-left sticky top-0 pl-4 w-full z-999"><span className="text-white opacity-100">Tracks:</span></h3>
              <ul className="w-full h-fit" id="tracksQuickResultsList">
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
                  <NavLink to="/search" className="w-full h-fit cursor-pointer text-sm font-bold hover:scale-[1.0001] hover:font-semibold transition-all duration-75" state={{url:partialResult.tracks.next}}>Show More Tracks...</NavLink>
                </li>
              </ul>
            </div>
            }
            { partialResult.albums &&
            <div className="flex flex-col h-fit" id="albumsQuickResultsContainer">
              <h3 className="bg-linear-to-br from-lime-200/80 to-70% to-neutral-500/80 text-base text-left sticky top-0 pl-4 w-full z-999"><span className="text-white opacity-100">Albums:</span></h3>
              <ul className="w-full h-fit" id="albumsQuickResultsList">
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
                  <NavLink to="/search" className="w-full h-fit cursor-pointer text-sm font-bold hover:scale-[1.0001] hover:font-semibold transition-all duration-75" state={{url:partialResult.albums.next}}>Show More Albums...</NavLink>
                </li>
              </ul>
            </div>
            }
            { partialResult.artists &&
            <div className="flex flex-col h-fit" id="artistsQuickResultsContainer">
              <h3 className="bg-linear-to-br from-lime-200/80 to-70% to-neutral-500/80 text-base text-left sticky top-0 pl-4 w-full z-999"><span className="text-white opacity-100">Artists:</span></h3>
              <ul className="w-full h-fit" id="artistsQuickResultsList">
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
                  <NavLink to="/search" className="w-full h-fit cursor-pointer text-sm font-bold hover:scale-[1.0001] hover:font-semibold transition-all duration-75" state={{url:partialResult.artists.next}}>Show More Artists...</NavLink>
                </li>
              </ul>
            </div>
            }
            { partialResult.playlists &&
            <div className="flex flex-col h-fit" id="playlistsQuickResultsContainer">
              <h3 className="bg-linear-to-br from-lime-200/80 to-70% to-neutral-500/80 text-base text-left sticky top-0 pl-4 w-full z-999"><span className="text-white opacity-100">Playlists:</span></h3>
              <ul className="w-full h-fit" id="playlistsQuickResultsList">
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
                  <NavLink to="/search" className="w-full h-fit cursor-pointer text-sm font-bold hover:scale-[1.0001] hover:font-semibold transition-all duration-75" state={{url:partialResult.playlists.next}}>Show More Playlists...</NavLink>
                </li>
              </ul>
            </div>
            }
            <NavLink to="/search" className="w-full h-fit font-bold hover:scale-[1.0001] hover:font-semibold transition-all duration-75" state={{url:searchValue}}>Show More Results...</NavLink>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}