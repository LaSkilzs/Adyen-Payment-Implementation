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
    await API.callServer('http://localhost:5000/api/getPaymentMethods').then(data => {
        console.log('data', data);
        this.setState({paymentTypes: data});
    })
   }

   static async handleSubmission(state, component, url) {
    try {
      const res = await API.callServer(url, state.data);
      API.handleServerResponse(res, component);
    } catch (error) {
      console.error(error);
    }
  }

 static async initCheckout() {
    try {
      const paymentMethodsResponse = await API.callServer("/api/getPaymentMethods");
      const configuration = {
        paymentMethodsResponse: paymentMethodsResponse,
        clientKey: "AQEyhmfxK4/JbBdBw0m/n3Q5qf3VaY9UCJ14XWZE03G/k2NFisUQ3oG4gUxAeoX8kJuJ8SMQwV1bDb7kfNy1WIxIIkxgBw==-rvbCbqVGh/HefmNBTUx3Hy2jhcrmc4HUbv+0whHaRaI=-KD,Lt*nb~m4z(2^<",
        locale: "en_US",
        environment: "test",
        paymentMethodsConfiguration: {
          card: {
            showPayButton: true,
            hasHolderName: true,
            holderNameRequired: true,
            name: "Credit or debit card",
            amount: {
              value: 1000,
              currency: "EUR"
            }
          }
        },
        onSubmit: (state, component) => {
          if (state.isValid) {
            API.handleSubmission(state, component, "/api/initiatePayment");
          }
        },
        onAdditionalDetails: (state, component) => {
          API.handleSubmission(state, component, "/api/submitAdditionalDetails");
        },
      };

    } catch (error) {
      console.error(error);
    }
  }
  
  
  

    render() {
        
        const { paymentTypes } = this.state;
        const { cartItems, total} = this.props.location.state;
        return (
            <div>
                <Checkout paymentTypes={paymentTypes}  cartItems={cartItems} total={total} />
            </div>
        )
    }
}
