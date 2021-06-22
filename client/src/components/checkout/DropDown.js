import React from 'react';
// import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';



export default function CustomizedSelects(props) {

//  const { paymentTypes } = props;
//  console.log('payment', paymentTypes)
  return (
    <div id="dropin-container">
        <h4>Payment Selection</h4>
      <ul>
          {[].map(payment => {
              return <li>{ payment.name } </li>
          })}
      </ul>
    </div>
  );
}
