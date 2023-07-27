import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductDetailsRoute extends Component {
  state = {
    productDetails: {},
    similarProductData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
       method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.similar_products.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      this.setState({
        productDetails: updatedData,
        similarProductData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onClickIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevSate => ({quantity: prevSate.quantity - 1}))
    }
  }

  renderProductDetailsView = () => {
    const {productDetails, quantity, similarProductData} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productDetails

    return (
      <div className="product-details-success-view">
        <img src={imageUrl} alt="product" className="product-image" />
        <div className="product-details-container">
          
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price">Rs {price}</p>
          <div className='rating-reviews-container'> 
            <div className="rating-container">
              <p className="rating">{rating}</p>
              <img
                src="https://assests.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="reviews-count">{totalReviews} Reviews</p>
          </div>
          </div>
          <p className="description">{description}</p>
          <div className="label-value-container">
            <p className="label">Available:</p>
            <p className="value">{availability}</p>
          </div>
          <div className="label-value-container">
            <p className="label">Brand:</p>
            <p className="value">{brand}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={this.onClickDecrement}
              data-testid="minus"
            >
              <BsDashSquare className="quantity-controller-icon" />
            </button>
            <p className="quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={this.onClickIncrement}
              data-testid="plus"
            >
              <BsPlusSquare className="quantity-controller-icon" />
            </button>
          </div>
          <button type="button" className="add-to-cart-btn">
            ADD TO CART
          </button>
        </div>
    </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default ProductDetailsRoute
