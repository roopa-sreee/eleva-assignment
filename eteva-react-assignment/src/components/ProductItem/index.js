import {Link} from "react-router-dom"

import './index.css'

const ProductItem = props => {
    const {productDetails} = props
    const {title,brand,imageUrl,rating,price,id} = productDetails

    return(
        <Link to = {`/products/${id}`} className = 'link-item'>
            <li className="product-item">
                <img src={imageUrl} alt= "product" className="product-item-image"/>
                <h1 className="title" >{title}</h1>
                <p className="brand">{brand}</p>
                <div className='product-details'>
                    <p className="price">Rs {price}</p>
                    <div className='rating-container'>
                        <p className="rating">{rating}</p>
                        <img 
                          src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                          alt = "rating-star"
                          className="star-image"
                        />
                    </div>
                </div>
            </li>
        </Link>
    )
}


export default ProductItem