import { getPlaylists, getPlaylist } from "./playlists";

export async function loadPlayer(){
  const playlists = await getPlaylists();
  const playlist = await getPlaylist(playlists.items[0].id);
  const playlistUri = playlist.uri;
  localStorage.setItem("uri", playlistUri);
  const uri = localStorage.getItem('uri');
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        width: '100%',
        height: '100%',
        uri: uri
        };
    const callback = (EmbedController) => {
      EmbedController.play();
      document.querySelectorAll('.playlistItem').forEach(
        playlistItem => {
        playlistItem.addEventListener('click', () => {
            EmbedController.loadUri(playlistItem.dataset.spotifyId);
        });
      })
      localStorage.setItem("embedController", EmbedController);
    };
    IFrameAPI.createController(element, options, callback);
  };
}

export async function getPlayQueue(playlistId){
  try{
      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items%28track%28name%2Calbum%2Cartists%29%29`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const playlist = await res.json();
      const tracks = playlist.items;
      const finalTracks = [];
      tracks.map((track,i) => {
      const  thisTrack = {
        position: i,
        track: track
      }
      finalTracks.push(thisTrack);
     })
     localStorage.setItem("playQueue", finalTracks);
    }
  catch(error){
    console.log(error);
  }
}
