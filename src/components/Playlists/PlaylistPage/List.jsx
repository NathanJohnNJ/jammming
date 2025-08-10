import RemoveTracks from "../RemoveTracks";

export default function List(props){
  const { id } = props;

  function clickHandler(){
    const allCheck = document.getElementById("allCheckbox");
    const checkboxes = document.getElementsByName('playlistSelector');
    if (!allCheck.checked){
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
      }
    }
  }

  return(
    <div className="flex flex-col w-[600px] self-center relative">
      <div className=" h-fit w-full flex flex-col self-center">
        <div className="w-[93%] h-min bg-neutral-400/75 sticky top-0 flex justify-self-center p-1 justify-between mb-0.5 rounded-lg self-center">
          <input type="checkbox" id="allCheckbox" className="playlistCheck" onClick={clickHandler} />
          <RemoveTracks playlistId={id} />
        </div>
      </div>
      <div id="playlistContainer" className="overflow-hidden">
        <ul id="playlistItems" className="text-black text-sm font-light overflow-y-scroll h-[98%] w-full"></ul>
      </div>
    </div>
  )
}