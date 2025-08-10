
export async function fetchProfile() {
  const token = localStorage.getItem('access_token');
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
    profileImage.classList.add('rounded-full');
    if(!document.getElementById("avatar").hasChildNodes()){
      document.getElementById("avatar").appendChild(profileImage);
    }
    document.getElementById("imgUrl").innerText = profile.images[0].url;
  }
  document.getElementById("id").innerText = profile.id;
  document.getElementById("email").innerText = profile.email;
  document.getElementById("uri").innerText = profile.uri;
  document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url").innerText = profile.href;
  document.getElementById("url").setAttribute("href", profile.href);
}

export function populateMiniUI(profile) {
  if (profile.images[0]) {
    const profileImage = new Image(120, 120);
    profileImage.src = profile.images[0].url;
    profileImage.classList.add('rounded-full');
    document.getElementById("miniDisplayName").innerText = profile.display_name;
    document.getElementById("miniId").innerText = profile.id;
    document.getElementById("miniEmail").innerText = profile.email;
    if(!document.getElementById("miniAvatar").hasChildNodes()){
      document.getElementById("miniAvatar").appendChild(profileImage);
    }
  }
}