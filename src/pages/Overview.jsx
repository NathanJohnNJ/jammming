import Profile from '../components/Profile';
import MiniProfile from '../components/MiniProfile';
import Search from '../components/Search/QuickSearch';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import CompactPlaylist from '../components/Playlists/Overview/CompactPlaylist';

export default function Overview(){
  const [showProfile, setShowProfile] = useState(false);

  function revealProfile(){
    setShowProfile(!showProfile);
  }

  return (
     <section className="w-full h-full md:h-[98dvh] text-center mt-8" id="overview">
      
      <div className="flex w-full h-[90%] justify-start md:justify-between items-center flex-col md:flex-row md:-mt-8">
        <div className="hidden md:flex flex-col border-1 md:border-2 m-1 md:m-2 h-min md:h-[80dvh] md:w-[30%] w-[95%] bg-white/65 rounded-md items-center md:pb-8 md:mt-6 overflow-y-hidden">
          <h2 className="text-2xl font-black headers mt-1">PROFILE</h2>
          <div className="flex flex-col items-center h-min md:ml-4">
            <Profile />
          </div>
          <div className="hidden md:flex md:flex-col w-[98%]">
            <h2 className="font-black headers mt-0 -mb-6">SEARCH</h2>
            <Search />
          </div>
        </div>
        <div className="flex md:hidden flex-col border-1 m-1 pb-8 h-max w-[95%] bg-white/65 rounded-md items-center justify-around">
          <div className="w-full h-full cursor-pointer" onClick={revealProfile}>
            <h2 className="text-base font-black headers">PROFILE</h2>
          </div>
          <AnimatePresence>
            {
              showProfile &&
              <motion.div initial={{scaleX: 0, scaleY: 0, opacity: 0}} animate={{scaleX: 1, scaleY: 1, opacity: 1}} exit={{scaleX: 0, scaleY: 0, opacity: 0}} transition={{duration:0.5}}>
                <MiniProfile />
              </motion.div>
            }
          </AnimatePresence>
        </div>
        <div className="flex md:hidden flex-col border-1 m-1 h-min w-[95%] bg-white/65 rounded-md items-center justify-around transition-all duration-75">
          <h2 className="text-base md:text-2xl font-black headers -mt-1 md:mt-0">SEARCH</h2>
          <Search />
        </div>
        <div className="flex flex-col h-[95dvh] m-1 md:m-2 md:h-full w-[95%] md:w-[35%] p-1 md:p-2 border-1 md:border-2 bg-white/65 rounded-md">
          <h2 className="text-base md:text-2xl font-black headers z-10">PLAYLIST</h2>
          <CompactPlaylist />
        </div>
        
      </div>
    </section>
  )
}