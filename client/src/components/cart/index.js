// export { default } from './Cart';
import React, { Component } from 'react'
import Cart from './Cart';
import API from '../../utility/API'

export default class CartItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            cartItems: []
        }
    }
    async componentDidMount(){
        API.findAll().then(cartItems => {
            console.log('cartItmes from call', cartItems)
            this.setState({cartItems})
        })
    }
    render() {
        const { cartItems } = this.state;
        console.log('cartItems', cartItems)
        return (
            <div>
                <Cart cartItems={ cartItems }/>
            </div>
        )
    }
}
