import React from 'react';
import Navbar from  './components/navbar'
import Product from  './components/product';
import ProductDetail from './components/product/ProductDetail';
import Cart from  './components/cart';
import Checkout from './components/checkout/Checkout';


const App = () => {
  return (
    <div className="App">
     <h1>Hello World</h1>
     <Navbar/>
     <Product/>
     <ProductDetail />
     <Cart />
     <Checkout/>
    </div>
  );
}

export default App;
