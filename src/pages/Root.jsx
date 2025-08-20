import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SpotifyEmbed from "../components/NowPlaying/SpotifyEmbed";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
export default function Root() {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(false);

  function revealPlayer(){
    setShowPlayer(!showPlayer);
  }

  return (
    <main className="flex flex-col items-center justify-center backGround w-screen relative">
      <div className="hidden md:flex w-full md:mb-16">
        <NavBar setPlayerPosition={setPlayerPosition} />
      </div>
      <h1 className="text-6xl font-black text-white/80">Jammming</h1>
      <h2 className="text-xl font-semibold text-white/80 flex place-self-center w-fit mt-4 ml-26">powered by <img src="/spotifyLogo/full/Full_Logo_White_CMYK.svg" alt="Spotify logo" className="w-[40%] m-2 -mt-1.5" /></h2>
      <div className="w-[50%] h-full">
        <motion.div layout style={{height: playerPosition ? '21dvh' : '76dvh', width: playerPosition ? "35%" : "32%", left: playerPosition ? '0dvw' : '31dvw', top: playerPosition ? 0 : "18%", overflowY: playerPosition ? "hidden" : "scroll" }} className={playerPosition ? "hidden md:flex flex-col md:m-2 h-fit md:p-2 border-1 md:border-2 bg-white/45 rounded-md md:absolute" : "hidden md:flex flex-col md:m-2 h-fit md:p-2 border-1 md:border-2 bg-white/65 rounded-md md:absolute"}>
          <h2 className="text-base md:text-2xl font-black headers">NOW PLAYING</h2>
          <SpotifyEmbed playerPosition={playerPosition} />
        </motion.div>


        <div className="md:hidden flex flex-col m-1 md:m-2 h-fit md:h-full w-[95%] md:w-[28%] p-1 md:p-2 border-1 md:border-2 bg-white/65 rounded-md md:overflow-y-scroll">
          
          <div className="w-full cursor-pointer" onClick={revealPlayer}>
            <h2 className="text-base font-black headers">NOW PLAYING</h2>
          </div>
          
          <AnimatePresence>
            {
              showPlayer && 
              <motion.div initial={{scaleX: 0, scaleY: 0, opacity: 0}} animate={{scaleX: 1, scaleY: 1, opacity: 1}} exit={{scaleX: 0, scaleY: 0, opacity: 0}} transition={{duration:0.25}}>
                <SpotifyEmbed />
              </motion.div>
            }
          </AnimatePresence>
        
        </div>

      </div>
      <Outlet className="flex w-full h-fit overflow-hidden relative sm:flex-col" />
    </main>
  )
}