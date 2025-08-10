import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { IoPeopleCircleOutline } from "react-icons/io5";
import { TbChartBarPopular } from "react-icons/tb";
import { extractColors } from "extract-colors";
import { getArtistAlbums, getArtistTopTracks } from "../lib/info";

export default function Info(){
  const [type, setType] = useState('');
  const [albumList, setAlbumList] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  
  const location = useLocation();
  const info = location.state;
 
  useEffect(()=>{
    async function load(type){
      await getColors(type);
      await getExtras(type);
    }
    if(info.spotifyLink){
      setType('track');
      load('track');
    }else{
      const url = info.external_urls.spotify;
      const array = url.split('/');
      const thisType = array[3];
      setType(thisType);
      load(thisType);
    }
  }, []);

  async function getColors(type){
    let image;
    if(type==='track'){
      image = info.album.images[0].url
    } else if(type==='artist'){
      image = info.images[0].url
    }
    let string = 'conic-gradient(from var(--bg-angle), ';
    const options = { distance: 0.15 };
    try {
      const colors = await extractColors(image, options);
      colors.map((color) => {
        string += `${color.hex}AA, `;
      })
      colors.reverse().map((color, i) => {
        if(i === colors.length-1){
          string += `${color.hex}AA)`;
        }else {
          string += `${color.hex}AA, `;
        }
      })
      console.log(string);
      // string += `${colors[0].hex}AA)`;
      const infoSection = document.getElementById('infoSection');
      infoSection.style.backgroundImage = string;
      infoSection.style.animation = "backgroundAnimation 60s infinite linear running";
    } catch (error) {
      console.log(error);
    }
  }
  async function getExtras(type){
    if(type === 'artist'){
      const albums = await getArtistAlbums(info.id);
      const tracks = await getArtistTopTracks(info.id);
      setAlbumList(albums);
      setTopTracks(tracks);
    }
  }
  return (
    <div className="flex self-center items-center justify-center playlistBG h-[90%] mt-[5%] w-[98%] py-1.5 px-0 rounded-xl">
      <div className="h-[98.5%] w-[98.5%] bg-white rounded-lg flex flex-col items-center justify-center">
        <AnimatePresence>
        { type === 'track' &&
          <motion.div id="infoSection" className="flex items-center justify-evenly rounded-3xl bg-lime-300/35 w-[60%] h-[80%]"
          initial={{scaleX: 0}}
          animate={{scaleX: 1}}
          transition={{dur:0.4, bounce: 0.3}}>
            <div className="flex flex-col">
              <motion.h1 className="text-black headers font-black" style={{fontSize: '5rem'}} whileHover={{scale: 1.2, transition: { duration: 0.75 }}}>{info.name}</motion.h1>
              <motion.h2 className="text-black font-semibold" whileHover={{scale: 1.5, transition: { duration: 0.75 }}}>{info.album.name}</motion.h2>
              <motion.h3 className="text-black font-extrabold" whileHover={{scale: 1.5, transition: { duration: 0.75 }}}>
                {info.artists.map((artist,i) => {
                  if (i === info.artists.length-1){
                    return <motion.span key={i}
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{dur:0.2, bounce: 0.3, delay: i*0.1}}>{artist.name}</motion.span>
                  } else {
                    return <motion.span key={i}
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{dur:0.2, bounce: 0.3, delay: i*0.1}}>{artist.name},&nbsp;</motion.span>
                  }
                })}
              </motion.h3>
            </div>
            <motion.img src={info.album.images[0].url} alt={`Album artwork for ${info.album.name}`} className="rounded-xl w-[30%] h-auto"
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{dur:0.4, bounce: 0.3, delay: 0.2}} whileHover={{scale: 1.5, transition: { duration: 0.75 }}} />
          </motion.div>    
        }
        </AnimatePresence>
        <AnimatePresence>
        { type === 'artist' &&
          <motion.div id="infoSection" className="flex items-center justify-evenly rounded-3xl w-[60%] h-[80%]"
          initial={{scaleX: 0}}
          animate={{scaleX: 1}}
          transition={{dur:0.4, bounce: 0.3}}>
            <div className="flex flex-col">
              <motion.h1 className="text-black headers font-black" style={{fontSize: '7rem'}}>{info.name}</motion.h1>
              <div className="flex">
                <div className="flex flex-col rounded-xl bg-white/75 border-2 shadow-xl w-fit h-fit p-2 text-zinc-700">
                  <h2 className="font-bold text-[1.2rem] underline underline-offset-3 -mt-1">Stats</h2>
                  <h3 title="Followers" className="text-black font-semibold flex"><IoPeopleCircleOutline className="text-[1.5rem] mx-1" /> {info.followers.total}</h3>
                  <h3 title="Popularity" className="text-black font-semibold flex"><TbChartBarPopular className="text-[1.5rem] mx-1" /> {info.popularity}%</h3>
                </div>
                <div className="flex flex-col w-fit m-4 bg-white/75 px-2 rounded-xl border-2 shadow-xl text-zinc-700">
                  <h3 className="font-bold text-[1.2rem] underline underline-offset-3">Genres</h3>
                  <ul className="flex flex-col text-left w-fit list-disc list-inside">
                    {info.genres.map((genre,i) => {
                      const final = [];
                      genre.split(' ').map((word, i) => {
                        const finalWord = [];
                        word.split('').map((letter, i) => {
                          if(i === 0){
                            finalWord.push(letter.toUpperCase());
                          } else{
                            finalWord.push(letter);
                          }
                        })
                      final.push(finalWord.join(''));
                      })
                      return <motion.li key={i}
                      initial={{scaleX: 0}}
                      animate={{scaleX: 1}}
                      transition={{dur:0.2, bounce: 0.3, delay: i*0.1}}>{final.join(' ')}</motion.li>
                    })}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col w-fit m-4 bg-white/75 p-2 rounded-xl border-2 shadow-xl text-zinc-700">
                <h3 className="font-bold text-[1.2rem] underline underline-offset-3">Albums</h3>
                <ul className="flex flex-col text-left w-fit list-disc list-inside">
                {albumList.map((album,i) => {
                    return <motion.li key={i}
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{dur:0.2, bounce: 0.3, delay: i*0.1}}>{album.name}</motion.li>
                  })}
                </ul>
              </div>
              <div className="flex flex-col w-fit m-4 bg-white/75 p-2 rounded-xl border-2 shadow-xl text-zinc-700">
                <h3 className="font-bold text-[1.2rem] underline underline-offset-3">Top Tracks</h3>
                <ol className="flex flex-col text-left w-fit list-disc list-inside">
                {topTracks.map((track,i) => {
                    return <motion.li key={i}
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{dur:0.2, bounce: 0.3, delay: i*0.1}}>{track.name}</motion.li>
                  })}
                </ol>
              </div>
            </div>
            <motion.img src={info.images[0].url} alt={`Image of ${info.name}`} className="rounded-2xl w-[30%] h-auto my-4"
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{dur:0.4, bounce: 0.3, delay: 0.2}} whileHover={{scale: 1.5, transition: { duration: 0.75 }}} />
          </motion.div>    
        }
        </AnimatePresence>
      </div>
    </div>
  )
}


// Playlists - external_urls.spotify - https://open.spotify.com/playlist
// Albums - external_urls.spotify - https://open.spotify.com/album
// Artists - external_urls.spotify - https://open.spotify.com/artist
// Tracks - spotifyLink - https://open.spotify.com/track