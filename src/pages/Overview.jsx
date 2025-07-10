import NowPlaying from '../components/NowPlaying';
import Profile from '../components/Profile';
import CompactPlaylist from '../components/CompactPlaylist';
import Search from '../components/Search';

export default function Overview(props){
  const { playlists } = props;

  return (
     <section className="w-full h-[90vh] text-center mt-10" id="overview">
      <div className="flex w-full h-[98%] justify-center">
        <div className="flex flex-col border-2 m-2 h-full p-2 w-[35%] bg-white/65 rounded-md items-center justify-around">
          <h2 className="text-2xl font-black headers">PROFILE</h2>
          <div className="flex flex-col items-center h-full">
            <Profile />       
          </div>
          <h2 className="text-2xl font-black headers">NOW PLAYING</h2>
          <NowPlaying />
        </div>
        <div className="flex flex-col m-2 h-full w-[25%] p-2 border-2 bg-white/65 rounded-md overflow-y-scroll">
          <h2 className="text-2xl font-black headers">SEARCH</h2>
          <Search />
        </div>
        <div className="flex flex-col m-2 h-full w-[25%] p-2 border-2 bg-white/65 rounded-md">
          <h2 className="text-2xl font-black headers">PLAYLIST</h2>
          <CompactPlaylist playlists={playlists}/>
        </div>
      </div>
    </section>
  )
}