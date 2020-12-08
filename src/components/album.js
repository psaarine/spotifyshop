import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopC } from "./shopContext";


export const Album = (props) => {
    let { id } = useParams();
    const shopContext = useContext(ShopC);
    const addItems = shopContext.addItem;
    const [amount, setAmount] = useState(0);
    const [albumData, setData] = useState({
        image: "",
        label: "",
        name: ""
    });

    useEffect(() => {
        fetchAlbumData(id, setData);
    }, [id]);


    return (
        <div className="album-screen">
            <div className="album-cont">
                <div className="album-item">
                    <div className="album-info">
                        <h1>{albumData.label}</h1>
                        <h2>{albumData.name}</h2>
                        <h3>Currently: {amount}</h3>
                        <button onClick={() => {addItems(albumData, setAmount)}}>Add to cart</button>
                        <button onClick={() => {shopContext.removeItem(albumData, setAmount)
                        
                        }}>Remove from cart</button>
                    </div>
                    <div className="album-pic">
                        <img src={albumData.image} />
                    </div>

                </div>
            </div>
        </div>
    );

    async function fetchAlbumData(id, handler){
        const resp = await fetch(`https://api.spotify.com/v1/albums/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        }
        );
        const data = await resp.json();
        const albumObject = {
            image: data.images[0].url,
            label: data.label,
            name: data.name,
            id: data.id
        }
        handler(albumObject);
        fetchAlbumData(data.id);

        function fetchAlbumData(id){
            let storageShop = JSON.parse(sessionStorage.getItem("shop"));
            if (storageShop != null && storageShop[id] != undefined) {
                setAmount(storageShop[id].length);
            }

        }
    }

}