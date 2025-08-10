import { formatTime } from "./utils";

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

export async function renamePlaylist(playlistId, newName){
  try{
      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "name": newName
        })
      });
      return await res.json();
    }
  catch(error){
    console.log(error);
  }
}

export async function updatePlaylistDescription(playlistId, description){
  try{
      const token = localStorage.getItem('access_token');
      const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "description": description
        })
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
        body: JSON.stringify({
          "uris": trackURIs,
          "position": 0
        })
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

export async function createPlaylist(){
  try{
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');
    const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": "New Playlist",
        "description": "Description..."
      })
    });
    clearPlaylist();
    return await res.json();
  }
  catch(error){
    console.log(error);
  }
}

export async function createPlaylistWithTracks(tracks){
  try{
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');
    const res = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": "New Playlist",
        "tracks": tracks
      })
    });
    return await res.json();
  }
  catch(error){
    console.log(error);
  }
}

export async function checkBoxChecker(){
  const allCheck = document.getElementById("allCheckbox");
  const checkboxes = document.getElementsByName('playlistSelector');
  if(!allCheck.checked){
    localStorage.setItem("selection", false); 
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked){
        localStorage.setItem("selection", true); 
      }      
    }
  } else {
    localStorage.setItem("selection", true); 
  }
}

export function populatePlaylist(playlist) {
    const list = document.getElementById("playlistItems");
    list.style.overflowY = "scroll";
    list.style.width = "98%";
    list.style.height = "98%";
    playlist.tracks.items.map((item, i) => {
      const listItem = document.createElement('li');
      const listButton = document.createElement('button');
      listButton.classList.add('playlistItem');
      listButton.setAttribute('data-spotify-id', item.track.uri);
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.name = "playlistSelector";
      checkbox.value = item.track.uri;
      checkbox.classList.add('playlistCheck');
      checkbox.addEventListener('click', checkBoxChecker);
      listButton.appendChild(checkbox);

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
      fourthCell.src = item.track.album.images[0].url;
      fourthCell.classList.add('playlistImg');
      listButton.appendChild(firstCell);
      listButton.appendChild(secondCell);
      listButton.appendChild(thirdCell);
      listButton.appendChild(fourthCell);
      listItem.appendChild(listButton);
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
      const listButton = document.createElement('button');
      listButton.classList.add('playlistItem');
      listButton.setAttribute('data-spotify-id', item.track.uri);
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.name = "playlistSelector";
      checkbox.value = item.track.uri;
      checkbox.classList.add('playlistCheck');
      listButton.appendChild(checkbox);

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
      fourthCell.src = item.track.album.images[0].url;
      fourthCell.classList.add('playlistImg');
      listButton.appendChild(firstCell);
      listButton.appendChild(secondCell);
      listButton.appendChild(thirdCell);
      listButton.appendChild(fourthCell);
      listItem.appendChild(listButton);
      list.appendChild(listItem);
    })
}

export function clearPlaylist(){
  const container = document.getElementById('playlistContainer');
  const oldList = document.getElementById("playlistItems");
  container.removeChild(oldList);
  const list = document.createElement('ul');
  list.setAttribute('id', 'playlistItems');
  list.style.overflowY = "scroll";
  list.style.width = "98%";
  list.style.height = "98%";
  container.appendChild(list);
  const tempItem = document.createElement('li');
  tempItem.innerHTML = `<p className="w-[80%] flex self-center justify-self-center text-zinc-500">Search for songs in the search box and add them to your new playlist!</p>`;
  list.appendChild(tempItem);
}

export async function getFeaturedArtists(playlistId){
  try{
    const token = localStorage.getItem('access_token');
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.items%28track%28artists%28name%2Cexternal_urls%28spotify%29%29%29%29`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
  }
  catch(error){
    console.log(error);
  }
}
