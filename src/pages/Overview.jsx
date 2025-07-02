// import MiniPlayer from '../components/MiniPlayer';
import Profile from '../components/Profile';
import CompactPlaylist from '../components/CompactPlaylist';

export default function Overview(){
  
  return (
     <section className="w-full h-full text-center" id="overview">
      <div className="flex w-full h-full">
        <div className="flex flex-col border-2 m-2 h-[95%] w-[40%] bg-white/85 rounded-md items-center justify-around">
          <h2 className="text-2xl font-black headers">PROFILE</h2>
          <div className="flex flex-col items-center h-full">
            <Profile />       
          </div>
        </div>
        <div className="flex flex-col m-2 h-full w-[30%] p-2 border-2 bg-white/85 rounded-md">
          <h2 className="text-2xl font-black headers">NOW PLAYING</h2>
          {/* <MiniPlayer /> */}
        </div>
        <div className="flex flex-col m-2 h-full w-[25%] border-2 bg-white/85 rounded-md">
          <h2 className="text-2xl font-black headers">PLAYLIST</h2>
          <CompactPlaylist />
        </div>
      </div>
    </section>
  )
}