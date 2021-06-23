import React, { Component } from 'react'
import API from '../../utility/API';
import Checkout from './Checkout';


export default class PaymentList extends Component {
   constructor(props){
       super(props);
       this.state = {
           paymentTypes: [],
       }
       this.inputRef = React.createRef();
   }


   async componentDidMount(){
    this.inputRef.current.focus();

    await API.callServer('https://adyen-api-implementation.herokuapp.com/api/getPaymentMethods').then(data => {
        this.setState({paymentTypes: data});
    })
   }
  
    render() {
        console.log('DOM node set in Parent', this.inputRef)
        return (
            <div>
                <Checkout ref={this.inputRef}/>
            </div>
        )
    }
}
