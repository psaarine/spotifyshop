import { createContext, useState, useEffect, useContext } from "react";
import { appInfo } from "../clientInfo/appInfo";
import { TokenContext } from "./token";


export const GlobalStateContext = createContext();

const GlobalState = (props) => {

    const [globalState, setGlobalState] = useState([]);
    const tokenData = useContext(TokenContext);
    const tokenHandler = tokenData[1];

    useEffect(() => {
        _dataFetcher();
    },[]);

    return (
        <GlobalStateContext.Provider value={globalState}>
            {props.children}
        </GlobalStateContext.Provider>
    );

    async function _dataFetcher(){
        /* These functions are inpure because that is more convenient */
        let token;
        await _getToken();
        _getGenres(token);
        
        async function _getToken(){
            const result = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/x-www-form-urlencoded",
                    "Authorization" : "Basic " + btoa(appInfo.client_id + ":" + appInfo.client_secret)
                },
                body: "grant_type=client_credentials"
            })
            const data = await result.json();
            token = data.access_token;
            sessionStorage.setItem("token", token);
            tokenHandler(token);
        }

        async function _getGenres(token){
            const result = await fetch("https://api.spotify.com/v1/browse/categories?locale=sv_FI&limit=5",
            {
                method: "GET",
                headers: { "Authorization" : "Bearer " + token}
            })
            const data = await result.json();
            console.log();
            setGlobalState(data.categories.items)
        }

    }
}

export default GlobalState;