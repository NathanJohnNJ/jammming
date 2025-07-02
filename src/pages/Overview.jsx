// import MiniPlayer from '../components/MiniPlayer';
import Profile from '../components/Profile';
import CompactPlaylist from '../components/CompactPlaylist';

export default function Overview(){
  
  return (
     <main className="w-[90%] h-[90%] text-center">
      <div className="flex w-full h-[95%]">
        <div className="flex flex-col border-2 m-4 h-[95%] w-[30%] bg-white items-center">
          <h2 className="text-2xl">PROFILE</h2>
          <div className="flex flex-col items-center">
            <div>
              <Profile />
            </div>            
          </div>
        </div>
        <div className="flex flex-col m-4 h-[95%] w-[30%] p-2 border-2 bg-white">
          <h2 className="text-2xl bg-white rounded-4xl -m-b-20 h-fit">NOW PLAYING</h2>
          {/* <MiniPlayer /> */}
        </div>
        <div className="flex flex-col m-4 h-[95%] w-[30%] border-2 bg-white">
          <h2 className="text-2xl">PLAYLIST</h2>
          <CompactPlaylist />
        </div>
      </div>
    </main>
  )
}