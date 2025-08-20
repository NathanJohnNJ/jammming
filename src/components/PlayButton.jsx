import { FaPlay } from "react-icons/fa6";

export default function PlayButton(props){
  const { uri } = props;
  const embedController = localStorage.getItem("embedController");

  function onClickHandle(){
    embedController.loadUri(uri)
  }

  return(<FaPlay className="h-10 w-10 fill-lime-600 rounded-full p-1 pl-2 border-2 transition-all duration-100 hover:scale-115  hover:border-3 border-lime-600 hover:border-lime-600/30" onClick={onClickHandle} />
  )
}