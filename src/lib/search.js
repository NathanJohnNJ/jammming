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

export async function limitedSearch(searchTerm, types){
  const token = localStorage.getItem('access_token');
  const params = new URLSearchParams();
  params.append("q", searchTerm);
  params.append("type", types);
  params.append("limit", 6);
  const result = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
  return await result.json();
}