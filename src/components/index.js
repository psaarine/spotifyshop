import { Link } from "react-router-dom"


export const Index = (props) => {
    return (
        <div className="index-window screen">
            <div className="index-window-cont">
                <h1>Spotify album magazine</h1>
                    <p>This is a website developed with react to increase my skills as developer. It uses many advanced react features.
                        You can browse categories and their associated playlists. From each playlist you can see all tracks and their related albums.
                        You can add these items to the "shop" that I have created. Naturally I do not have database set up, so I will simply store items 
                        into your session storage to simulate eCommerce.
                    </p>
                <Link to="/main">
                    <button>Continue</button>
                </Link>
            </div>
        </div>
    );
}