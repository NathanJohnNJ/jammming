import { AnimatePresence, motion } from "motion/react";
import AllPlaylists from "../components/Playlists/PlaylistPage/AllPlaylists";
import Playlist from "../components/Playlists/PlaylistPage/Playlist";
import { useState, useRef } from "react";

export default function Playlists() {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [chosenId, setChosenId] = useState('');
  const containerRef = useRef(null);

  return (
    <div id="playlistsPage" className="flex self-center items-center justify-center playlistBG h-[300vh] w-[98%] p-2 rounded-xl" style={{height: '300vh'}}>
      <motion.div className="h-full w-full bg-white rounded-lg flex flex-col p-4 overflow-y-scroll relative" ref={containerRef}>
        <AnimatePresence>
        { !showPlaylist &&
          <motion.div
          initial={{opacity: 0, y: '-50vh'}}
          animate={{opacity:1, y: 0}}
          exit={{opacity: 0, y:'-50vh', scale: 0}}>
            <AllPlaylists setShowPlaylist={setShowPlaylist} setChosenId={setChosenId} />
          </motion.div>
        }
        </AnimatePresence>
        <AnimatePresence>
        { showPlaylist &&
          <motion.div className="w-full h-full"
          initial={{opacity: 0, y: '50vh'}}
          animate={{opacity:1, y: 0}}
          exit={{opacity: 0, y:'3-50vh', scale: 0}}>
            <Playlist playlistId={chosenId} setShowPlaylist={setShowPlaylist} setChosenId={setChosenId} />
          </motion.div>
        }
        </AnimatePresence>
      </motion.div>
    </div>
  );
}