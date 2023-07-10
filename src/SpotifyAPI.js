// src/App.js
import { useState, useEffect } from 'react';

export const useSpotifyAPI = (clientId) => {
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [artists, setArtists] = useState(null);
  const [song, setSong] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const fetchData = async () => {
            try {
                const token = await getAccessToken(clientId, code);
                setAccessToken(token);
                
                const profileData = await fetchProfile(token);
                setProfile(profileData);

                
                const playlistData = await fetchPlaylist(token);
                setPlaylist(playlistData);


                const artistsData = await fetchArtists(token);
                setArtists(artistsData);


                const songData = await fetchSong(token);
                setSong(songData);

            } catch (error) {
                console.error('There was a problem getting the token and data: ', error);
            }
        };

        fetchData();
    }
}, [clientId]);

  return { accessToken,  playlist, profile, artists, song };
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-top-read playlist-read-private");
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
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const { access_token } = data;
    return access_token;
}
async function fetchProfile(token) {
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}

// Add this code to fetch the top playlists
async function fetchPlaylist(token) {
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    const { items } = await result.json();




    return items;
    // try {
    //     const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    //         method: "GET", headers: { Authorization: `Bearer ${token}` }
    //     });
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return await response.json();
    // } catch (error) {
    //     console.error('There was a problem with the fetch operation: ', error);
    // }
}

// Add this code to fetch the top favorite artists
async function fetchArtists(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });



    const { items } = await result.json();

    return items;
    // try {
    //     const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
    //         method: "GET", headers: { Authorization: `Bearer ${token}` }
    //     });
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return await response.json();
    // } catch (error) {
    //     console.error('There was a problem with the fetch operation: ', error);
    // }
}


async function fetchSong(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });



    const { items } = await result.json();

    return items;
    // try {
    //     const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    //         method: "GET", headers: { Authorization: `Bearer ${token}` }
    //     });
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return await response.json();
    // } catch (error) {
    //     console.error('There was a problem with the fetch operation: ', error);
    // }

}


// Update the populateUI function to fetch and display the top playlists and favorite artists
// async function populateUI(profile, token) {
//     // Existing code for populating profile information
//     document.getElementById("displayName").innerText = profile.display_name;
//     if (profile.images[0]) {
//         const profileImage = new Image(200, 200);
//         profileImage.src = profile.images[0].url;
//         document.getElementById("avatar").appendChild(profileImage);
//         document.getElementById("imgUrl").innerText = profile.images[0].url;
//     }
//     document.getElementById("id").innerText = profile.id;
//     document.getElementById("email").innerText = profile.email;
//     document.getElementById("uri").innerText = profile.uri;
//     document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
//     document.getElementById("url").innerText = profile.href;
//     document.getElementById("url").setAttribute("href", profile.href);



//     const topPlaylists = await fetchTopPlaylists(token);
//     const topArtists = await fetchTopArtists(token);
//     const topTracks = await fetchTopSongs(token);

//     // Display top playlists
//     const playlistsElement = document.getElementById("playlists");
//     topPlaylists.forEach((playlist) => {
//         const playlistItem = document.createElement("li");
//         playlistItem.innerText = playlist.name;
//         playlistsElement.appendChild(playlistItem);
//     });

//     // Display top favorite artists
//     const favoriteArtistsElement = document.getElementById("favoriteArtists");
//     topArtists.forEach((artist) => {
//         const artistItem = document.createElement("li");
//         artistItem.innerText = artist.name;
//         favoriteArtistsElement.appendChild(artistItem);
//     });

//     // Display top favorite artists
//     const favoriteTracksElement = document.getElementById("favoriteTracks");
//     topTracks.forEach((song) => {
//         const songItem = document.createElement("li");
//         songItem.innerText = song.name;
//         favoriteTracksElement.appendChild(songItem);
//     });
// }


