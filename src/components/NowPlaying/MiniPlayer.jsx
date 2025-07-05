import { TfiControlShuffle, TfiControlSkipBackward, TfiControlSkipForward, TfiControlStop, TfiControlPlay, TfiControlForward, TfiControlBackward, TfiControlPause } from "react-icons/tfi";
import { RiRepeatFill, RiRepeatOneFill } from "react-icons/ri";
import { useState } from "react";

export default function MiniPlayer(){
  const [ isPlaying, setIsPlaying ] = useState(false);
  return (
    <div className="flex flex-col rounded-4xl -m-t-20 border-2 w-full h-full justify-evenly shadow-2xl">
      <div className="flex justify-around items-center">
        <div className="flex border-2 m-2 w-12 h-12"></div>
        <div className="flex border-2 m-2 w-24 h-24">
          {/* <img src={song.imgSrc} alt="Album artwork" class="miniAlbumArt" /> */}
        </div>
        <div className="flex border-2 m-2 w-12 h-12"></div>
      </div>

      <div className="w-full relative flex h-4 mb-1">
        <div className="flex m-0 w-4 h-4 rounded-full absolute top-0 right-8 cursor-pointer"><RiRepeatOneFill className="text-lg" /></div>
        <div className="flex m-0 w-4 h-4 rounded-full absolute top-0 right-2 cursor-pointer"><RiRepeatFill className="text-lg" /></div>
        <div className="flex m-0 w-4 h-4 rounded-full absolute top-0 left-2 cursor-pointer"><TfiControlShuffle className="text-lg" /></div>
      </div>
      <div className="w-full relative flex h-2">
        <div className="flex border-2 h-[0.5px] w-[85%] mx-4 absolute top-1 cursor-pointer"></div>
        <p className="flex w-[7.5%] absolute top-[12px] left-2 text-[8px]">00:00:00</p>
        <p className="flex w-[7.5%] absolute top-[12px] right-4 text-[8px]">00:00:00</p>        
      </div>
      <div className="flex justify-center items-end justify-self-end relative my-2">
        <div className="flex m-1 w-fit h-fit items-center justify-center cursor-pointer"><TfiControlSkipBackward className="text-xl"/></div>
        <div className="flex m-1 w-fit h-fit items-center justify-cente cursor-pointerr"><TfiControlBackward className="text-xl"/></div>
        {isPlaying
        ?
        <>
        <div className="flex m-1 w-fit h-fit items-center justify-center cursor-pointer" onClick={()=> setIsPlaying(!isPlaying)} ><TfiControlPause className="text-2xl" /></div>
        <div className="flex m-1 w-fit h-fit items-center justify-center cursor-pointer" onClick={()=> setIsPlaying(!isPlaying)} ><TfiControlStop className="text-2xl" /></div>
        </>
        :
        <div className="flex m-1 w-fit h-fit items-center justify-center cursor-pointer" onClick={()=> setIsPlaying(!isPlaying)} ><TfiControlPlay className="text-3xl" /></div>
        }
        <div className="flex m-1 w-fit h-fit items-center justify-center cursor-pointer"><TfiControlForward className="text-xl" /></div>
        <div className="flex m-1 w-fit h-fit items-center justify-center cursor-pointer"><TfiControlSkipForward className="text-xl" /></div>
      </div>
    </div>
  )
}