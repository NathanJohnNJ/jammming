
import MiniPlayer from "./MiniPlayer";

export default function NowPlaying(){
  // const queue = usersQueue;

  return (
    <div className="">
      <MiniPlayer />
      {/* <div className="flex flex-col">
        <h3 className="">QUEUE:</h3>
         <ul className="">
          {
            queue.map((track, i) => {
              return (
                <li className="flex flex-row" key={i}>
                  <div className="flex flex-col w-[75%]">
                    <p className="font-semibold text-sm">{track.name}</p>
                    <p className="font-thin text-xs">
                      {
                        track.artists.map((artist, i) => {
                          if(i === track.artists.length-1){
                            return (
                              <span key={i}>{artist.name}</span>
                            )
                          } else {
                            return (
                              <span key={i}>{artist.name}, </span>
                            )
                          }
                          
                        })
                      }
                    </p>
                  </div>
                </li>
              )
            })
          }
        </ul> 
      </div> */}
    </div>
  )
}