import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProximityScaleElement from "../../ProximityScaleElement";
import { getFeaturedArtists } from '../../../lib/playlists';
import { extractColors } from "extract-colors";

export default function Card(props){
  const {playlist, i, setShowPlaylist, setChosenId} = props;
  const [ showOverlay, setShowOverlay ] = useState(false);
  const [ artists, setArtists ] = useState([]);
  const src = playlist.images[0].url;

  useEffect(()=>{
    async function getArtists(){
      const res = await getFeaturedArtists(playlist.id);
      const artistArray = [];
      res.tracks.items.map((item) => {
        item.track.artists.map((artist)=> {
          if(!artistArray.includes(artist.name)){
            artistArray.push(artist.name);
          }
        })
      })
      setArtists(artistArray);
    }
    async function getColors(){
      let string = 'conic-gradient(from var(--bg-angle), '
      const options = { distance: 0.3 };
      try {
        const colors = await extractColors(src, options);
        colors.map((color, i) => {
          string += `${color.hex}, `
        })
        string += `${colors[0].hex})`
        const thisCard = document.getElementById(`card${i}`)
        thisCard.style.backgroundImage = string;
        thisCard.style.animation = "backgroundAnimation 20s infinite linear running;"
      } catch (error) {
        console.log(error);
      }
    }
    getArtists();
    getColors();
  }, [])

  function clickHandler(){
    setShowPlaylist(false);
    setChosenId(playlist.id);
    setShowPlaylist(true);
  }
  

  return (
    <ProximityScaleElement
      minScale={0.75}
      maxScale={1.25}
      maxDistance={800}
      transitionDuration="0.5s"
      id={`card${i}`}
      className="cardBG rounded-4xl m-4"
    >
    <motion.div className="m-2 h-max w-max relative flex items-center justify-center rounded-3xl"
      onHoverStart={()=>setShowOverlay(true)}
      onHoverEnd={()=>setShowOverlay(false)}
      >
      <AnimatePresence>
        { showOverlay &&
          <motion.div className="bg-black/60 absolute z-10 flex flex-col items-center justify-center h-full w-full rounded-3xl"
          initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}>
            <motion.p className="bg-white rounded-4xl h-fit -w-fit px-2 text-zinc-700 hover:cursor-pointer"
            initial={{y:10}}
            animate={{y:0}}
            exit={{y:10}}
            onClick={clickHandler}>View Playlist</motion.p>
          </motion.div>
        }
      </AnimatePresence>
      <motion.div className="h-full w-full bg-white rounded-3xl p-2">
        <motion.h1 className="headers font-extrabold">{playlist.name}</motion.h1>
        <div className="flex">
        <ul className="m-4">
        <li className="text-black font-extrabold">Featured Artists:</li>
          { artists.map((artist, i) => {
            if(i<=4)
            return (
              <li className="text-black" key={i}>{artist}</li>
            )
          })}
        </ul>
        { playlist.images &&  
          <motion.img src={playlist.images[0].url} alt={playlist.name} className="rounded h-40 w-40 self-center justify-self-center m-4" /> 
        }
        </div>
      </motion.div>
    </motion.div>
    </ProximityScaleElement>
  )
}