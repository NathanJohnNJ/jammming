

export default function PlaylistItem(props){
  const { item, key } = props;
  console.log(`Item received: ${item}`);

  return(
    <div className="flex">
      <div className="col-start-1 col-end-2">
        {key+1}
      </div>
      <div className="col-start-2 cole-end-3 flex flex-col">
        <h3 className="font-semibold">{item.track.name}</h3>
        <h4 className="font-light flex justify-between">
          <span>
            {item.track.artists.map((artist, i) => {
              if (i === item.track.artists.length-1){
                  return <span key={i}>{artist.name}</span>
                } else {
                  return <span key={i}>{artist.name}, </span>
                }
            })}
          </span>
          <span>{item.track.album.name}</span>
        </h4>
      </div>
      <div className="col-start-3 cole-end-4">
        BLANK
      </div>
      <div className="col-start-4 cole-end-5">
        {item.track.duration_ms/1000}
      </div>
      
    </div>
  )
}