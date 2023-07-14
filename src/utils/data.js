import { getAccessToken, redirectToAuthCodeFlow } from "./SpotifyAuth";
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

    return { accessToken, playlist, profile, artists, song };
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



async function fetchCurrent(token) {

}

// Add this code to fetch the top playlists
async function fetchPlaylist(token) {
    const result = await fetch("https://api.spotify.com/v1/me/playlists?limit=5", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    const { items } = await result.json();




    return items;
 
}

// Add this code to fetch the top favorite artists
async function fetchArtists(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });



    const { items } = await result.json();

    return items;
 
}


async function fetchSong(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });



    const { items } = await result.json();

    return items;
  

}

