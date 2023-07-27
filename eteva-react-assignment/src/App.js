import {Route, Switch, Redirect} from 'react-router-dom'


import ProductsRoute from './components/ProductsRoute'
import ProductDetailsRoute from './components/ProductDetailsRoute'

import NotFound from './components/notFound'


import './App.css'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/products" component={ProductsRoute} />
    <ProtectedRoute exact path="/products/:id" component={ProductDetailsRoute} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)
export default App;
