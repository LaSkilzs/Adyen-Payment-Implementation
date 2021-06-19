import React from 'react';
import Navbar from  './components/navbar'
import Product from  './components/product';
import ProductDetail from './components/product/ProductDetail';
import Cart from  './components/cart';


const App = () => {
  return (
    <div className="App">
     {/* <h1>Hello World</h1> */}
     <Navbar/>
     <Product/>
     <ProductDetail />
     <Cart />
    </div>
  );
}

export default App;
