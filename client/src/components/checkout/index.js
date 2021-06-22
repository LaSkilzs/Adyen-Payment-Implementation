import React, { Component } from 'react'
import API from '../../utility/API';
import Checkout from './Checkout';

export default class PaymentList extends Component {
   constructor(props){
       super(props);
       this.state = {
           paymentTypes: []
       }
   }

   async componentDidMount(){
    await API.getPaymentMethods().then(data => {
        console.log('data', data);
    })
   }
    render() {
        const { paymentTypes } = this.state;
        const { cartItems, total} = this.props.location.state;
        return (
            <div>
                <Checkout paymentTypes={paymentTypes}  cartItems={cartItems} total={total}/>
            </div>
        )
    }
}
