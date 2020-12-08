import { useReducer, useEffect, useState } from "react";
import { PlaylistCard } from "./nestedcomps/PlaylistCard"



export const Category = (props) => {
    const currentState = props.data.location.state;
    const [categoryData, setData] = useState([]);
    const [currentPosition, setPosition] = useReducer(wheelReducer, 0);

    useEffect(() => {
        fetchData(currentState.id, setData);
    }, []);

    return (
        <div className="screen">
            <div className="playlist-card-wrapper" onWheel={(e) => handleMouseWheel(e, setPosition, currentPosition, categoryData)}>
                {categoryData.map((elem, index) => 
                    <PlaylistCard key={index} data={elem} index={index} currentPosition={currentPosition * 600}/>
                )}
            </div>
            
        </div>
    );

    async function fetchData(href, handler){
        const resp = await fetch(`https://api.spotify.com/v1/browse/categories/${href}/playlists?limit=5`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        });
        const data = await resp.json();
        handler(data.playlists.items);
    }

    function handleMouseWheel(e, handler, pos, data){
        if (e.deltaY < 0 && pos < 0){
            handler("increment");
        } 

        if ((e.deltaY > 0) && (pos <= 0) && (pos > (-1 * data.length))) {
            handler("decrement");
        }

    }

    function wheelReducer(state, action) {
        const scrollAmount = 1;
        
        switch (action) {
            case "increment":

                return state + scrollAmount;
                
            case "decrement":
                return state - scrollAmount;
        
            default:
                break;
        }
    }
}