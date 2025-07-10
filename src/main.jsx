import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';


const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  const profile = await fetchProfile(accessToken);
  createRoot(document.getElementById('root')).render(
  <App profile={profile} />
  );
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", "user-read-private user-read-email user-read-currently-playing user-read-playback-position user-read-playback-state user-modify-playback-state playlist-read-private playlist-modify-public playlist-modify-private user-top-read user-read-recently-played user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    const { access_token, refresh_token } = await result.json();
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    return access_token;
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(120, 120);
        profileImage.src = profile.images[0].url;
        profileImage.classList.add('rounded-full')
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}

export const getRefreshToken = async () => {
   const refreshToken = localStorage.getItem('refresh_token');
   const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.access_token);
    if (response.refresh_token) {
      localStorage.setItem('refresh_token', response.refresh_token);
    }
  }
// async function getUsersQueue(){
//   const token = localStorage.getItem('access_token');
//   const result = await fetch("https://api.spotify.com/v1/me/player/queue", {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });
//     return await result.json();
// }
// export const usersQueue = await getUsersQueue();

export async function quickSearch(searchTerm){
  const token = localStorage.getItem('access_token');
  const params = new URLSearchParams();
  params.append("q", searchTerm);
  params.append("type", "artist,track,playlist,album");
  params.append("limit", 4);
  const result = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
  return await result.json();
}

export async function getMoreItems(url){
  const token = localStorage.getItem('access_token');
  const params = new URLSearchParams(url.search);
  params.delete("limit");
  const result = await fetch(url, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
  return await result.json();
}

export async function fullSearch(searchTerm, types){
  const token = localStorage.getItem('access_token');
  const params = new URLSearchParams();
  params.append("q", searchTerm);
  params.append("type", types);
  const result = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
  return await result.json();
}

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

export function populatePlaylist(playlist) {
    document.getElementById("playlistName").innerText = playlist.name;
    const list = document.getElementById("playlistItems");
    list.style.overflowY - "scroll";
    list.style.width = "98%";
    list.style.height = "98%";
    playlist.tracks.items.map((item, i) => {
      const listItem = document.createElement('li');
      listItem.style.display = 'flex';
      listItem.style.whiteSpace = "nowrap";
      listItem.style.overflowX = "scroll";
      listItem.style.width = "97.5%";
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.style.width="2.5%";
      checkbox.style.marginRight="0.5%";
      listItem.appendChild(checkbox);
      const firstCell = document.createElement('span');
      firstCell.innerText = i + 1;
      firstCell.style.width = "2.5%";
      firstCell.style.marginRight="0.5%";
      firstCell.style.marginLeft="0.5%";
      firstCell.style.fontWeight = 600;
      firstCell.style.display = "flex";
      firstCell.style.flexDirection = "column";
      firstCell.style.alignItems = "center";
      firstCell.style.justifyContent = "center";
      firstCell.style.fontSize = "1em";
      const secondCell = document.createElement('div');
      secondCell.style.display = "flex";
      secondCell.style.flexDirection = "column";
      secondCell.style.justifyContent = "center";
      secondCell.style.marginRight="0.5%";
      secondCell.style.marginLeft="0.5%";
      secondCell.style.width = "58%";
      secondCell.style.textAlign = "left";
      const nameCell = document.createElement('span');
      nameCell.innerText = item.track.name
      nameCell.style.overflowX = "scroll";
      const artistCell = document.createElement('span');
      artistCell.style.fontWeight = 700;
      artistCell.style.overflowX = "scroll";
      item.track.artists.map((artist, i) => {
        if (i === item.track.artists.length-1){
          const span = document.createElement('span');
          span.style.fontSize = "0.95em";
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
      thirdCell.style.width = "13.5%";
      thirdCell.style.fontSize = "0.6em";
      thirdCell.style.marginRight="0.5%";
      thirdCell.style.marginLeft="0.5%";
      thirdCell.style.alignSelf = 'center';
      const fourthCell = document.createElement('img');
      fourthCell.src = item.track.album.images[item.track.album.images.length-1].url;
      fourthCell.style.width = "19.5%";
      fourthCell.style.minWidth = "80px";
      fourthCell.style.height = "auto";
      fourthCell.style.marginLeft="0.5%";
      listItem.appendChild(firstCell);
      listItem.appendChild(secondCell);
      listItem.appendChild(thirdCell);
      listItem.appendChild(fourthCell);
      list.appendChild(listItem);
    })
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  const pad = (num, size) => String(num).padStart(size, '0');

  return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 3)}`;
}
