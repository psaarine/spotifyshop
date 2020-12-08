const { createContext, useState } = require("react");


export const HighLightContextCreator = createContext();

export const HighLightContext = (props) => {

    const [highlightData, setHighlight] = useState({data: "kek"}); 
    const [hasHighLight, toggleHighlight] = useState(false);

    return (
        <HighLightContextCreator.Provider value={[highlightData, hasHighLight, toggleHighlight, setHighlight]}>
            {props.children}
        </HighLightContextCreator.Provider>
    );
}