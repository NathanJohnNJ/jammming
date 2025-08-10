import { useScroll, useTransform, motion, useSpring } from "motion/react";
import { getPlaylist, populatePlaylist, renamePlaylist, updatePlaylistDescription } from '../../../lib/playlists';
import { useEffect, useState, useRef } from "react";
import { extractColors } from "extract-colors";
import List from "./List";
import ArtistsList from "./ArtistsList";

export default function Playlist(props){
  const { playlistId, setShowPlaylist, setChosenId, containerRef } = props;
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ id, setId ] = useState('');
  const [ image, setImage ] = useState('');
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });

  const nameOpacity = useSpring(useTransform(scrollYProgress, [0.1,0.6], [1, 0.6]));
  const nameScale = useSpring(useTransform(scrollYProgress, [0.1,0.6], [1, 1.6]));
  const imageX = useTransform(scrollYProgress, [0, 0.5], ['175%', '0%']);
  const imageY = useTransform(scrollYProgress, [0, 0.5], ['50%', '10%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const descX = useTransform(scrollYProgress, [0, 0.5], [ '165%',  '5%']);
  const descY = useTransform(scrollYProgress, [0, 0.5], [ '-25%',  '15%']);
  const descWidth = useTransform(scrollYProgress, [0, 0.5], [ 300, 200]);
  const descHeight = useTransform(scrollYProgress, [0, 0.5], [150, 350])
  const descScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const listY = useTransform(scrollYProgress, [0, 0.8], ['0%', '0%']);
  const artistsX = useSpring(useTransform(scrollYProgress, [0.1,0.4], ['48%', '9%']));
  const artistsY = useSpring(useTransform(scrollYProgress, [0.1,0.4], ['30%', '55%']));
  const artistsScale = useSpring(useTransform(scrollYProgress, [0.1,0.4], [1, 0.75]));

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log("Page scroll: ", latest)
  // })

  function closeHandler(){
    setChosenId('');
    setShowPlaylist(false);
  }

   useEffect(() => {
     async function getData(){
      const thisPlaylist = await getPlaylist(playlistId);
      setName(thisPlaylist.name);
      setId(thisPlaylist.id);
      setDescription(thisPlaylist.description)
      setImage(thisPlaylist.images[0].url)
      populatePlaylist(thisPlaylist);
      await getColors(thisPlaylist.images[0].url);
     }
      async function getColors(image){
      let string = 'conic-gradient(from var(--bg-angle), ';
      let linearString = 'linear-gradient(var(--bg-angle), ';
      const options = { distance: 0.3 };
      try {
        const colors = await extractColors(image, options);
        colors.map((color) => {
          string += `${color.hex}, `;
          linearString += `${color.hex}, `;
        })
        string += `${colors[0].hex})`;
        linearString += `${colors[0].hex})`;
        const description = document.getElementById('playlistDescription');
        description.style.backgroundImage = string;
        description.style.animation = "backgroundAnimation 20s infinite linear running";
        const imageBorder = document.getElementById('imageBorder');
        imageBorder.style.backgroundImage = string;
        imageBorder.style.animation = "backgroundAnimation 20s infinite reverse running";
        const artistsList = document.getElementById(`artistsList`);
        artistsList.style.backgroundImage = string;
        artistsList.style.animation = "backgroundAnimation 20s infinite linear running";
        const playlistName = document.getElementById("playlistNameInput");
        playlistName.style.backgroundImage = linearString;
        playlistName.style.backgroundClip = "text";
        playlistName.style.animation = "backgroundAnimation 60s infinite alternate running";
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  async function submitName(){
    await renamePlaylist(id, name);
  }

  async function submitDescription(){
    await updatePlaylistDescription(id, description);
  }

  return (
    <div className="h-full w-full flex flex-col" id="chosenPlaylist">
      <motion.div id="nameDiv" className="fixed top-20 left-[50%] -translate-x-[50%] headers" style={{scale: nameScale, opacity: nameOpacity}}>
        <form id="playlistName" className="rounded-2xl w-full h-fit flex flex-row items-center p-0.5 group mt-0.5 transition-all duration-100" onSubmit={submitName}>
          <input type="text" id="playlistNameInput" className="flex text-center text-shadow-lg text-[4vw] font-extrabold group w-full h-full rounded-2xl opacity-55 group-active:opacity-90 group-focus-within:opacity-90" name="playlistName" value={name} onChange={e => setName(e.target.value)} placeholder="Name..." />
        </form>
      </motion.div>
      <h1 className="text-center text-shadow-lg font-black fixed right-15 top-20 cursor-pointer headers" onClick={closeHandler}>X</h1>
      {
      image &&
      <motion.div id="imageBorder" className="p-2 sticky rounded-xl top-0 w-[20%] h-auto" style={{x: imageX, y: imageY, scale: imageScale}}>
        <img src={image} alt="Playlist artwork" className="rounded-lg" />
      </motion.div>
      }

      <motion.div id="artistsListSection" className="sticky top-0" style={{x: artistsX, y: artistsY, scale: artistsScale}}>
        <ArtistsList playlistId={playlistId} />
      </motion.div>
      <motion.div id="descriptionSection" className="sticky top-0 group" style={{x: descX, y: descY, scale: descScale, height: descHeight, width: descWidth}}>
        <form id="playlistDescription" className="rounded-2xl opacity-65 bg-neutral-200 w-full h-full overflow-auto flex flex-row items-center group p-1 transition-all duration-100 group-active:opacity-90 group-focus-within:opacity-90 group-focus-within:scale-105" onSubmit={submitDescription}>
          <textarea className="text-base p-2 w-full h-full rounded-2xl bg-white text-zinc-700" name="playlistDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..." />
        </form>
      </motion.div>
      <motion.div id="mainPlaylistSection" className="flex w-full top-0 left-[50%] -translate-x-[50%]" ref={scrollRef} style={{translateY: 0}}>
        <List id={id} />
      </motion.div>
    </div>
  )
}