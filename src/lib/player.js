import { getPlaylists, getPlaylist } from "./playlists";

export async function loadPlayer(){
    const playlists = await getPlaylists();
    const playlist = await getPlaylist(playlists.items[0].id);
    const track = playlist.tracks.items[0];
    // const trackId = track.track.id;
    const trackUri = track.track.uri;
    // const trackId = '4gqakJ2DQ5NoTqNHxyIBAM';
    // const playerDiv = document.getElementById('playerDiv');
    // playerDiv.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator" width="600px" height="352" allow="autoplay; encrypted-media; picture-in-picture" loading="lazy" style={{borderRadius:12}} autoplay></iframe>`
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = document.getElementById('embed-iframe');
        const options = {
            width: '600px',
            height: '352px',
            uri: `${trackUri}`
            };
        const callback = (EmbedController) => {
        document.querySelectorAll('.playlistItem').forEach(
            playlistItem => {
            playlistItem.addEventListener('click', () => {
                EmbedController.loadUri(playlistItem.dataset.spotifyId);
            });
            })
        };
        IFrameAPI.createController(element, options, callback);
    };
}

