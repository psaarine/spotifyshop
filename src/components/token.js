import { createContext, useState } from "react"


export const TokenContext = createContext();
export const Token = (props) => {
    
    const [token, setToken] = useState("tokeni");
    
    return (
        <TokenContext.Provider value={[token, setToken]}>
            {props.children}
        </TokenContext.Provider>
    );
}