import { PiMusicNotesPlusBold } from "react-icons/pi";
import { addToPlaylist, getPlaylists } from "../lib/playlists";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

export default function AddButton(props){
  const { track } = props;
  const [ showPlaylists, setShowPlaylists] = useState(false);
  const [ playlists, setPlaylists] = useState([]); 

  function onClickHandle(playlistId){
    const playlistArray = playlists.split(',');
    if (playlistArray.includes(playlistId)){
      const result = playlistArray.filter((id)=> {
        return id !== playlistId
      })
      setPlaylists(result.join(','));
    } else {
      playlistArray.push(type);
      setPlaylists(playlistArray.join(','));
    }
    
  }

  useEffect(() => {
    async function loadPlaylists(){
      const usersPlaylists = await getPlaylists();
      setPlaylists(usersPlaylists.items);
    }
    loadPlaylists();
  }, [])

  return (
    <>
    {
      tracks &&
      <>
        <motion.button onClick={() => setShowPlaylists(!showPlaylists)}>
          <PiMusicNotesPlusBold className="button" />

          <AnimatePresence>
            {
              showPlaylists &&
              <motion.div className="" initial={{}} animate={{}} exit={{}} whileHover={{scale: 1.05}} whileTap={{scale: 0.9}}>
                {
                  playlists.map((playlist, i) => {
                    return (
                      <motion.div>
                        <p className="">{playlist.name}</p>
                        <img src={playlist.images[playlist.images.length-1].url} />
                      </motion.div>
                    )
                  })
                }
              </motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </>
    }
    </>
  )
}