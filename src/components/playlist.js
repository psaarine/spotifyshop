import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { TrackItem } from "./nestedcomps/TrackItem";
import { TrackHighlight } from "./nestedcomps/TrackHighlight";
import { HighLightContext } from "./nestedcomps/HighlightContext";

const PlaylistStyle = styled.div`
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${props => props.url});
    height: 100vh;
    width: 100vw;
    position: absolute;
    opacity: 0.5;
    z-index: -1;
`
const reducer = (state, action) => {
    switch (action) {
        case "increment":
            return state + 1;
        case "decrement":
            return state -1;   
        default:
            return state;
    }
}
export const Playlist = (props) => {
    
    const [pos, setPos] = useReducer(reducer, 1);
    const [tracks, setTracks] = useState([]);
    const scrollAmount = 50;
    useEffect(() => {
        fetchTracks(props.data.location.state.tracks.href, setTracks);
    }, []);

    return (
        <div className="playlist-item">
            <PlaylistStyle url={props.data.location.state.image}>
            </PlaylistStyle>
            <HighLightContext>
            <div className="track-wrapper">
                {tracks.map((track, index) => <TrackItem data={track} trackNumber={index}/>
                )}
            </div>
            <div className="track-highlight">
                    <TrackHighlight />
            </div>
            </HighLightContext>
        </div>
    );

    async function fetchTracks(href, handler) {
        const resp = await fetch(href, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
            
        });

        const data = await resp.json();
        handler(data.items);
    }
}