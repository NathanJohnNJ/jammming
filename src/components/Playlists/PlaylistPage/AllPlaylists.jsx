import { getPlaylists } from "../../../lib/playlists";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Card from "./Card";
export default function AllPlaylists(props){
  const { setShowPlaylist, setChosenId } = props;
  const [ playlists, setPlaylists ] = useState([]);

  useEffect(()=> {
    async function loadPlaylists(){
      const thesePlaylists = await getPlaylists();
      setPlaylists(thesePlaylists.items);
    }
    loadPlaylists();
  }, [])
  
  return (
    <motion.div className="flex items-center justify-center w-[98%] rounded-xl m-4 self-center h-fit py-4 bg-linear-60 from-neutral-300 from-15% via-neutral-600 to-85% to-neutral-300 overflow-hidden">
    <motion.div className="flex items-center justify-center w-fit rounded-xl self-center h-fit">
      {
        playlists &&
        playlists.map((playlist, i) => {
          return (
            <Card playlist={playlist} i={i} key={i} setShowPlaylist={setShowPlaylist} setChosenId={setChosenId} />
          )
        })
      }
      </motion.div>
    </motion.div>
  )
}