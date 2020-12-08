import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PlaylistCardStyle = styled.div`
    width: 640px;
    height: 700px;
    position: absolute;
    left: ${props => (props.index * 800) + props.currentPosition + 300}px;
    scale: ${props => (props.active ? 1.2 : 1)};
    transition: 0.5s;
`



export const PlaylistCard = (props) => {
    
    const [isActive, setActive] = useState(false)
    const linkObj = {
        pathname: "/playlists/" + props.data.id,
        state: {
            tracks: props.data.tracks,
            image: props.data.images[0].url
        }
    }

    return (
        <PlaylistCardStyle index={props.index} currentPosition={props.currentPosition} active={isActive}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        >
            <h1>{props.data.title}</h1>
            <Link to={ linkObj }>
                <img src={props.data.images[0].url}/>
            </Link>
            <p>{props.data.description}</p>
            </PlaylistCardStyle>
    );
}