import {Component} from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsList from './ProductsList';
import ProductPage from './ProductPage';
import WrongWay from './WrongWay';
import CartPage from './CartPage';
import OrderDone from './OrderDone';
import HomePage from './HomePage';

class Routing extends Component {
    render() {

return (
<Routes>
<Route path="/" exact element={<HomePage />}/>
<Route path="/:title/*" exact element={<ProductsList />}></Route>
<Route path="/:title/:id/*" exact element={<ProductPage />}/>
<Route path="/cart" exact element={<CartPage />}/>
<Route path="/order" exact element={<OrderDone />}/>
<Route path='*' element={<WrongWay />}/>
</Routes>
)
}
}
export default Routing


