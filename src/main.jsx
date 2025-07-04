import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';


const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  const profile = await fetchProfile(accessToken);
  createRoot(document.getElementById('root')).render(
  <App profile={profile}/>
  );
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://jammming.njtd.xyz");
    // params.append("redirect_uri", "https://192.168.1.124:5173");
    params.append("scope", "user-read-private user-read-email user-read-currently-playing user-read-playback-position user-read-playback-state user-modify-playback-state playlist-modify-public playlist-modify-private user-top-read user-read-recently-played user-library-read");
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
    params.append("redirect_uri", "https://jammming.njtd.xyz");
    // params.append("redirect_uri", "https://192.168.1.124:5173");
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

export async function fullSearch(searchTerm){
  const token = localStorage.getItem('access_token');
  const params = new URLSearchParams();
  params.append("q", searchTerm);
  params.append("type", "artist track playlist album");
  const result = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
  return await result.json();
}