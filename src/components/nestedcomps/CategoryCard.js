import { Link } from "react-router-dom";


export const CategoryCard = (props) => {
    const linkUrl = `/categories/${props.category.id}`
    const stateObj = {pathname: linkUrl,
        state: props.category
        }
    
    return (
        <div className="category-card" >
            <Link to={stateObj}>
            <img src={props.category.icons[0].url}/>
            </Link>
            <h1>{props.category.name}</h1>
        </div>
    );
}

export default CategoryCard;
