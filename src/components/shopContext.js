import { createContext, useState } from "react";


export const ShopC = createContext();

export const ShopContext = (props) => {
    
    const [Shop, setItems] = useState({});
    
    return (
        <ShopC.Provider value={{
            Shop: Shop,
            addItem: addItem,
            resetShop: resetShop,
            removeItem: removeItem
        }}>
            {props.children}
        </ShopC.Provider>
    );

    function addItem(albumObj, handler){
        let storageShop = JSON.parse(sessionStorage.getItem("shop"));
        if (storageShop === null) {
            let storageObj = {                
            }
            storageObj[albumObj.id] = [albumObj];
            
            sessionStorage.setItem("shop", JSON.stringify(
                storageObj
            ));
            handler(1);
        } else {

            if (albumObj.id in storageShop) {
            let albumList = storageShop[albumObj.id];
            albumList.push(albumObj);
            storageShop[albumObj.id] = albumList;
            sessionStorage.setItem("shop", JSON.stringify(
                storageShop
            ));
            handler(albumList.length);
            } else {
                let newEntry = [albumObj];
                storageShop[albumObj.id] = newEntry;
                sessionStorage.setItem("shop", JSON.stringify(
                    storageShop
                ));
                handler(1);                
            }
        }

    }
    function removeItem(albumObj, handler){
        let storageShop = JSON.parse(sessionStorage.getItem("shop"));
        if (storageShop !== null && albumObj.id in storageShop && storageShop[albumObj.id].length > 0){
            let albumList = storageShop[albumObj.id];
            albumList.pop();
            storageShop[albumObj.id] = albumList;
            sessionStorage.setItem("shop", JSON.stringify(
                storageShop
            ));
            handler(albumList.length);
        }
    }
    function resetShop(handler){
        sessionStorage.removeItem("shop");
        handler(0);
    }
}