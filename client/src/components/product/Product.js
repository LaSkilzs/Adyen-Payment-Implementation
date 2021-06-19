import React from 'react';
import ProductDetail from './ProductDetail';

const Product = () => {
    return (
        <div data-test="ProductContainer">
            <h1>FUTURE PRODUCT</h1>
            <ProductDetail/>
        </div>
    );
};

export default Product;