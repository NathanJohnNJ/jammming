import { useEffect } from "react";
import { loadPlayer } from "../../lib/player";

export default function SpotifyEmbed(props){
    useEffect(()=>{
        async function load(){
            await loadPlayer();
        }
        load();
    }, [])

    return (
        // <div className="w-full flex items-center justify-center self-center place-self-center justify-self-center pt-4" id="playerDiv">
        // {/* <iframe style={{borderRadius:12}} src="https://open.spotify.com/embed/playlist/6NKsFuR2QF3mlk5W3i73CC?utm_source=generator" width="600px" height="352" allow="autoplay; encrypted-media; picture-in-picture" loading="lazy"></iframe> */}
        // {/* </div> */}
        <div id="embed-iframe"></div>
    )
}