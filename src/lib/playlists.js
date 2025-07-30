import { formatTime } from "./utils";
import AddButton from "../components/AddButton";

export async function getPlaylists() {
    try{
    const token = localStorage.getItem('access_token');
    const res = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  }
  catch(error){
    console.log(error);
  }
}

export async function getPlaylist(playlistId){
    try{
      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    }
  catch(error){
    console.log(error);
  }
}

export async function addToPlaylist(playlistId, trackURIs){
    try{
      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: {
          "uris": trackURIs,
          "position": 0
        }
      });
      return await res.json();
    }
  catch(error){
    console.log(error);
  }
}

export async function removeFromPlaylist(playlistId, tracksArray){
  const trackURIs = [];
  tracksArray.map((track) => {
    if(track !== ""){
      const uri = {
        "uri": track
      };
      trackURIs.push(uri);
    }
  })
  try{
    const token = localStorage.getItem('access_token');
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "tracks": trackURIs})
    });
    await res.json();
    const playlist = await getPlaylist(playlistId);
    refreshPlaylist(playlist);
  }
  catch(error){
    console.log(error);
  }
}

export function populatePlaylist(playlist) {
    document.getElementById("playlistName").innerText = playlist.name;
    const list = document.getElementById("playlistItems");
    list.style.overflowY = "scroll";
    list.style.width = "98%";
    list.style.height = "98%";
    playlist.tracks.items.map((item, i) => {
      const listItem = document.createElement('li');
      listItem.classList.add('playlistItem');
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.name = "playlistSelector";
      checkbox.value = item.track.uri;
      checkbox.classList.add('playlistCheck');
      listItem.appendChild(checkbox);

      const firstCell = document.createElement('span');
      firstCell.innerText = i + 1;
      firstCell.classList.add('playlistNum');

      const secondCell = document.createElement('div');
      secondCell.classList.add('playlistSongArtist')
      const nameCell = document.createElement('span');
      nameCell.innerText = item.track.name
      nameCell.style.overflowX = "scroll";
      const artistCell = document.createElement('span');
      artistCell.style.fontWeight = 300;
      artistCell.style.overflowX = "scroll";
      item.track.artists.map((artist, i) => {
        if (i === item.track.artists.length-1){
          const span = document.createElement('span');
          span.style.fontSize = "0.8em";
          span.innerText = artist.name;
          artistCell.appendChild(span);
        } else {
          const span = document.createElement('span');
          span.style.fontSize = "0.8em";
          span.innerText = `${artist.name}, `;
          artistCell.appendChild(span);
        }
      });
      secondCell.appendChild(nameCell);
      secondCell.appendChild(artistCell);
      const thirdCell = document.createElement('span');
      thirdCell.innerText = formatTime(item.track.duration_ms);
      thirdCell.classList.add('playlistDuration');
      const fourthCell = document.createElement('img');
      fourthCell.src = item.track.album.images[item.track.album.images.length-1].url;
      fourthCell.classList.add('playlistImg')
      listItem.appendChild(firstCell);
      listItem.appendChild(secondCell);
      listItem.appendChild(thirdCell);
      listItem.appendChild(fourthCell);
      list.appendChild(listItem);
    })
}

export function refreshPlaylist(playlist) {
  const container = document.getElementById('playlistContainer');
    const oldList = document.getElementById("playlistItems");
    container.removeChild(oldList);
    const list = document.createElement('ul');
    list.setAttribute('id', 'playlistItems');
    list.style.overflowY = "scroll";
    list.style.width = "98%";
    list.style.height = "98%";
    container.appendChild(list);
    playlist.tracks.items.map((item, i) => {
      const listItem = document.createElement('li');
      listItem.classList.add('playlistItem');
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.name = "playlistSelector";
      checkbox.value = item.track.uri;
      checkbox.classList.add('playlistCheck');
      listItem.appendChild(checkbox);

      const firstCell = document.createElement('span');
      firstCell.innerText = i + 1;
      firstCell.classList.add('playlistNum');

      const secondCell = document.createElement('div');
      secondCell.classList.add('playlistSongArtist')
      const nameCell = document.createElement('span');
      nameCell.innerText = item.track.name
      nameCell.style.overflowX = "scroll";
      const artistCell = document.createElement('span');
      artistCell.style.fontWeight = 300;
      artistCell.style.overflowX = "scroll";
      item.track.artists.map((artist, i) => {
        if (i === item.track.artists.length-1){
          const span = document.createElement('span');
          span.style.fontSize = "0.8em";
          span.innerText = artist.name;
          artistCell.appendChild(span);
        } else {
          const span = document.createElement('span');
          span.style.fontSize = "0.8em";
          span.innerText = `${artist.name}, `;
          artistCell.appendChild(span);
        }
      });
      secondCell.appendChild(nameCell);
      secondCell.appendChild(artistCell);
      const thirdCell = document.createElement('span');
      thirdCell.innerText = formatTime(item.track.duration_ms);
      thirdCell.classList.add('playlistDuration');
      const fourthCell = document.createElement('img');
      fourthCell.src = item.track.album.images[item.track.album.images.length-1].url;
      fourthCell.classList.add('playlistImg')
      listItem.appendChild(firstCell);
      listItem.appendChild(secondCell);
      listItem.appendChild(thirdCell);
      listItem.appendChild(fourthCell);
      list.appendChild(listItem);
    })
}
