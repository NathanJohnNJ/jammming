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
    container: containerRef,
    target: scrollRef,
    offset: ["start end", "end end"]
  });

  const nameOpacity = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [1, 1, 1, 1, 0.9, 0.9, 0.8]));
  const nameScale = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [0.7, 0.7, 0.8, 0.8, 0.9, 0.9, 1]));
  const nameRowStart = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [2, 2, 1, 1, 1, 0, 0]));
  const nameRowEnd = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [3, 3, 3, 3, 4, 4, 4]));
  const nameColStart = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [3, 3, 3, 2, 2, 1, 1]));
  const nameColEnd = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [6, 6, 6, 7, 7, 8, 8]));

  const imageRowStart = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [2, 2, 2, 2, 3, 3, 3]);
  const imageRowEnd = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [4, 4, 4, 4, 5, 5, 5]);
  const imageColStart = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [2, 2, 1, 1, 1, 0, 0]);
  const imageColEnd = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [4, 4, 3, 3, 3, 2, 2]);
  const imageScale = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [1, 1, 1, 1, 0.9, 0.8, 0.7]);

  const descRowStart = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [3, 3, 3, 3, 3, 4, 4]);
  const descRowEnd = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [4, 4, 5, 5, 6, 7, 7]);
  const descColStart = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [7, 7, 8, 8, 8, 9, 9]);
  const descColEnd = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [10, 10, 10, 10, 9, 8, 8]);
  const descWidth = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [360, 360, 240, 120, 120, 120, 130]);
  const descHeight = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [120, 120, 240, 240, 360, 360, 360]);

  const artistsRowStart = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [3, 3, 4, 4, 5, 5, 6]));
  const artistsRowEnd = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [5, 5, 6, 6, 7, 7, 8]));
  const artistsColStart = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [5, 5, 4, 4, 3, 2, 1]));
  const artistsColEnd = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [7, 7, 6, 6, 5, 4, 3]));
  const artistsScale = useSpring(useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1]));

  const listRowStart = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],[8, 8, 8, 7, 6, 5, 2]);
  const listColStart = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],[3, 3, 3, 3, 2, 2, 2]);
  const listColEnd = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],[7, 7, 7, 7, 8, 8, 8]);


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
    <div className="h-full w-full sticky  top-100 grid grid-cols-10 grid-rows-10" id="chosenPlaylist">
      <motion.div id="nameDiv" className="headers" style={{scale: nameScale, opacity: nameOpacity, gridArea: `${nameRowStart} / ${nameColStart} / ${nameRowEnd} / ${nameColEnd}`}}>
        <form id="playlistName" className="rounded-2xl w-full h-fit flex flex-row items-center p-0.5 group mt-0.5 transition-all duration-100" onSubmit={submitName}>
          <input type="text" id="playlistNameInput" className="flex text-center text-shadow-lg text-[4vw] font-extrabold group w-full h-full rounded-2xl opacity-55 group-active:opacity-90 group-focus-within:opacity-90" name="playlistName" value={name} onChange={e => setName(e.target.value)} placeholder="Name..." />
        </form>
      </motion.div>
      <h1 className="text-center text-shadow-lg font-black fixed right-15 top-20 cursor-pointer headers" onClick={closeHandler}>X</h1>
      {
      image &&
      <motion.div id="imageBorder" className="p-2 rounded-xl w-[20%] h-auto" style={{gridArea: `${imageRowStart} / ${imageColStart} / ${imageRowEnd} / ${imageColEnd}`, scale: imageScale}}>
        <img src={image} alt="Playlist artwork" className="rounded-lg" />
      </motion.div>
      }

      <motion.div id="artistsListSection" className="" style={{gridArea: `${artistsRowStart} / ${artistsColStart} / ${artistsRowEnd} / ${artistsColEnd}`, scale: artistsScale}}>
        <ArtistsList playlistId={playlistId} />
      </motion.div>
      <motion.div id="descriptionSection" className="group" style={{gridArea: `${descRowStart} / ${descColStart} / ${descRowEnd} / ${descColEnd}`, height: descHeight, width: descWidth}}>
        <form id="playlistDescription" className="rounded-2xl opacity-65 bg-neutral-200 w-full h-full overflow-auto flex flex-row items-center group p-1 transition-all duration-100 group-active:opacity-90 group-focus-within:opacity-90 group-focus-within:scale-105" onSubmit={submitDescription}>
          <textarea className="text-base p-2 w-full h-full rounded-2xl bg-white text-zinc-700" name="playlistDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..." />
        </form>
      </motion.div>
      <motion.div id="mainPlaylistSection" className="flex w-full" style={{gridArea: `${listRowStart} / ${listColStart} / 10 / ${listColEnd}`}}>
        <List scrollRef={scrollRef} id={id} />
      </motion.div>
    </div>
  )
}