import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const currentToken = {
  get access_token() { return localStorage.getItem('access_token') || null; },
  get refresh_token() { return localStorage.getItem('refresh_token') || null; },
  get expires_in() { return localStorage.getItem('refresh_in') || null },
  get expires() { return localStorage.getItem('expires') || null },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('expires_in', expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + (expires_in * 1000));
    localStorage.setItem('expires', expiry);
  }
};

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

// if(code){
//   const token = await getAccessToken(code);
//   currentToken.save(token);

//   const url = new URL(window.location.href);
//   url.searchParams.delete("code");
//   const updatedUrl = url.search ? url.href : url.href.replace('?', '');
//   window.history.replaceState({}, document.title, updatedUrl);
// }

// if(currentToken.access_token){
//   createRoot(document.getElementById('root')).render(<App />);
// }

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const token = await getAccessToken(clientId, code);
  currentToken.save(token);
  if(currentToken.access_token){
    createRoot(document.getElementById('root')).render(<App />);
  }
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

async function getAccessToken(clientId, code) {
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
  // const { access_token, refresh_token } = await result.json();
  // localStorage.setItem("access_token", access_token);
  // localStorage.setItem("refresh_token", refresh_token);
  // return access_token;
  return await result.json();
}

async function getRefreshToken(){
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
  // const response = await body.json();

  // localStorage.setItem('access_token', response.access_token);
  // if (response.refresh_token) {
  //   localStorage.setItem('refresh_token', response.refresh_token);
  // }
  return await body.json();
}

