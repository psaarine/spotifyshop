import { Link } from "react-router-dom";

export const Shoplink = (props) => {
    return (
        <Link to="/shop">
            <div className="shop-link">
                <p>Visit Shop</p>
            </div>
        </Link>
    );
}