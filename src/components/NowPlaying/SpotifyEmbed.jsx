import { useEffect, useState } from "react";
import { loadPlayer } from "../../lib/player";
import { AnimatePresence, motion } from "motion/react";

export default function SpotifyEmbed(props){
  const { playerPosition } = props;
  const [playerLoaded, setPlayerLoaded] = useState(false);

    useEffect(()=>{
      async function load(){
        setTimeout(async ()=> {
          await loadPlayer();
          setPlayerLoaded(true);
        }, 2000);
      }
      load();
    }, []);


  const variants={
    inactive: {
      opacity: 0,
      scale: 0,
    },
    active: {
      opacity: 1,
      scale: 1
    }
  }

  return (
    <motion.div layout className="bg-white flex items-center justify-center p-1 rounded-2xl" style={{width: playerPosition ? '100%' : '100%', height: playerPosition ? '50%' : '100%'}}>
      <motion.div id="embedContainer" layout style={{width: playerLoaded ? '100%' : '0%', height: playerLoaded ? '100%' : '0%'}}>
        <motion.div id="embed-iframe"></motion.div>
      </motion.div>
      <AnimatePresence>
        {!playerLoaded && 
          <motion.p className="flex w-[50%] headers" initial={{scale:0}} animate={{scale:1.2}} exit={{scale:0}}>
            <AnimatePresence>
              {"Loading...".split('').map((char,i) => {
                return(
                  <motion.span key={i} variants={variants} initial="inactive" animate="active" exit="inactive" transition={{delay:0.1*i, ease: 'linear'}}>
                    {char}
                  </motion.span>
                )
              })}
            </AnimatePresence>
          </motion.p>
        }
      </AnimatePresence>
    </motion.div>
  )
}