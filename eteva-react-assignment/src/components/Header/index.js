
import {Link,withRouter} from 'react-router-dom'

const Header = () => (
    <nav className="navbar">
        <h1 className="website-logo">
            Eteva
            <sub className="sub-script">e-commerce</sub>
        </h1>
        <Link to="/products">
            <p className="products-link">
                Products
            </p>
        </Link>
    </nav>
)

export default Header