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
    await API.callServer('http://localhost:5000/api/getPaymentMethods').then(data => {
        console.log('data', data);
        this.setState({paymentTypes: data});
    })
   }
  
    render() {
        return (
            <div>
                <Checkout ref={this.inputRef}/>
            </div>
        )
    }
}
