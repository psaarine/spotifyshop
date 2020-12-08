import { useContext } from "react";
import {GlobalStateContext} from "./state";
import { CategoryCard } from "./nestedcomps/CategoryCard";
import styled from "styled-components";

const MainCont = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const Main = () => {

    const data = useContext(GlobalStateContext);


    return (
        
        <MainCont>
            <h1 className="header">Categories</h1>
            <div className="category-card-wrapper">
                {data.map((category, index) => <CategoryCard key={index} category={category}/>)}
            </div>
            
        </MainCont>
        
    );


}

export default Main;