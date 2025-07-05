

export default function PlaylistItem(props){
  const { song } = props;

  return(
    <div className="">
      {song.url}
    </div>
  )
}