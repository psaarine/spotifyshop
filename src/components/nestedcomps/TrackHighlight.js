import { useContext, useEffect, useState } from "react";
import { HighLightContextCreator } from "./HighlightContext";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";


export const TrackHighlight = (props) => {

    const highlightData = useContext(HighLightContextCreator);

    
    return (
        <SwitchTransition 
            mode={"out-in"}>
            <CSSTransition
            key={highlightData[1]}
            classNames="fade"
            timeout={
                {
                    appear: 1000,
                    enter: 1000,
                    exit: 0
                }
            }
            unmountOnExit={true}
            >
                <div>
                    {highlightData[1] ? <TrackCard data={highlightData}/> : <h1></h1>}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );

}

const TrackCard = (props) => {

    const [hover, setHover] = useState(false);
    const [ready, setReady] = useState(false);
    const linkObj = {
        pathname: "/album/" + props.data[0].album,
        state: {
            kek: "lol"
        }
    }
    useEffect(() => {
        setReady(false);
    }, [props.data]);

    return (
        <TrackCardStyle isReady={ready} isHovered={false}>
            <div className="track-card" onMouseEnter={() => {setHover(true)}}>
                    <img src={props.data[0].image.url} onLoad={() => {toggleTransition(setReady)}} alt=""/>
                    <h3 className="track-card-front-name">{props.data[0].name}</h3>
                    <Link to={linkObj}>
                    <h4>Browse</h4>
                    </Link>
                    <div className="track-card-front-viewers"></div>
            </div>
        </TrackCardStyle>
    );

    async function toggleTransition(readyHandler){
        setTimeout(() => {
            readyHandler(true)
        }, 1000);
    }

    function testHover(){
        setHover(true);
        console.log("true");
    }
}

const TrackCardStyle = styled.div`
    transition: ${props => props.isReady ? 1 : 0}s;
    margin-left: ${props => props.isReady ? 0 : 600}px;
    opacity: ${props => props.isReady ? 1 : 0};
    display: inline-block;
    text-align: center;
    transform-style: preserve-3d;
`