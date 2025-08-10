import { createPlaylist } from "../../lib/playlists";
import { RiPlayListAddFill } from "react-icons/ri";


export default function NewPlaylist(props){
  const { setPlaylist } = props;
  async function clickHandler(){
    const newPlaylist = await createPlaylist();
    setPlaylist(newPlaylist);
  }
  return (
    <RiPlayListAddFill onClick={clickHandler} className="hover:scale-110 h-10 w-10 absolute right-10 top-10 text-green-700/50 hover:text-green-600/95" title="Create new playlist" />
  )
}