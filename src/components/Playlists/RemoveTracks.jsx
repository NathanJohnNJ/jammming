import { removeFromPlaylist } from "../../lib/playlists";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function RemoveTracks(props){
  const { playlistId } = props;

  function getChecked(){
    const checkboxes = document.getElementsByName('playlistSelector');
    let result = '';
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          result = result + checkboxes[i].value + " ";
        }
      }
    return result;
  }

  async function clickHandler(){
    const tracks = getChecked();
    const tracksArray = tracks.split(' ');
    await removeFromPlaylist(playlistId, tracksArray);
  }

  return(
    <RiDeleteBin6Line className="w-6 h-6 p-1 text-red-700/50 hover:text-red-700-90 rounded-full bg-gray-600/30 hover:scale-[1.05]" onClick={clickHandler} /> 
  )
}