import { useContext, useEffect, useState } from "react";
import {GlobalStateContext} from "./state";
import { useHistory } from "react-router-dom";


export const Shop = (props) => {
    const data = useContext(GlobalStateContext);
    const [shop, setShop] = useState([]);
    const previousPage = useHistory();
    useEffect(() => {
        fetchShop();
    }, []);

    return (
    <div className="shop">
        <ul>
            <div className="shop-list">
                <h1>Your items:</h1>
            </div>
            {shop.map((value, index) => <ShopListItem data={value} key={index}/>)}
        </ul>
    </div>
    );

    function fetchShop(){
        let storageshop = JSON.parse(sessionStorage.getItem("shop"));
        if (storageshop !== null && storageshop !== undefined){
        setShop(Object.values(storageshop));
        }
    }
}

const ShopListItem = (props) => {

    return(
        <div className="shop-list">
            {props.data[0] === undefined ? <h1></h1> : <h1>{props.data[0].label}: {props.data[0].name} x {props.data.length}</h1>}
            
        </div>
    );
}
