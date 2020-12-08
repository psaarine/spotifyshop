import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { HighLightContextCreator } from "./HighlightContext";

const TrackItemStyle = styled.div`
    padding: 10px;
    width: 400px;
    height: 55px;
    border-radius: 3px;
    white-space: nowrap;
    overflow: hidden;
    transition: 1s;
    text-align: center;
    background-color: #2A1B3D;
    margin: 10px;
    scale: ${props => props.isActive ? 1.2 : 1};
    color: white;
`


export const TrackItem = (props) => {
    
    const contextData = useContext(HighLightContextCreator);
    const [text, setText] = useState("");
    const [isActive, setStrong] = useState(false);

    useEffect(() => {
        setPreviewText(props, setText);
    }, []);


    
    return (
    <TrackItemStyle isActive={isActive}
    onMouseEnter={() => {addHighlightCard(contextData[1], contextData[3], contextData[2])}}
    onMouseLeave={() => {setStrong(false)}}
    >
        <h1 className="track-text">{text}</h1>
    </TrackItemStyle>
    );
    
    function addHighlightCard(isActive, setHighlightData, setActive){
        setActive(true);
        const trackObj = {
            image: props.data.track.album.images[1],
            name: props.data.track.name,
            duration: props.data.track.duration_ms,
            album: props.data.track.album.id
        }
        setHighlightData(trackObj);
        setStrong(true);
    }

    function setPreviewText(string, handler){
        const trackLenght = 15;
        let newString = string.data.track.name
        

        if (newString.length > trackLenght) {
            newString = newString.slice(0, trackLenght).concat("...");
        }
        handler(newString);
    }

}