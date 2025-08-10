// export async function getArtistAlbums(artist){
//   const token = localStorage.getItem('access_token');
//   const params = new URLSearchParams();
//   params.append("q", `artist:${artist}`);
//   params.append("type", "album");
//   const result = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });
//   const albums = await result.json();
//   const albumList = albums.albums.items;
//   const finalList = [];
//   albumList.map((album)=>{
//     if(album.album_type === 'album'){
//       finalList.push(album);
//     }
//   })
//   return finalList;
// }

export async function getArtistTopTracks(artistId){
  const token = localStorage.getItem('access_token');
  const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
  const tracks = await result.json();
  return tracks.tracks;
}

export async function getArtistAlbums(artistId){
  const token = localStorage.getItem('access_token');
  const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
  const albums = await result.json();
  return albums.items;
}