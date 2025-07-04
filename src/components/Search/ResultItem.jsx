

export default function ResultItem(props){
  const { result } = props;

  return (
    <div className="w-full h-fit bg-zinc-400 border-b-2 border-b-slate-700/40 flex flex-col items-start justify-center">
      <p>{result.name}</p>
      <p>{result.album.name}</p>
      <p>{result.artists.map((artist,i) => {
        if (i === result.artists.length-1){
          return <span key={i}>{artist.name}</span>
        } else {
          return <span key={i}>{artist.name}, </span>
        }
      })}</p>
    </div>
  )
}