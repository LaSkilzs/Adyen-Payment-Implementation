import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import Config from './Config';
 
 class Checkout{

    static async initiateCheckout() {
        console.log("Call for Dropin Occured")
        try {
          const configuration =  await Config.checkoutObject();
          const checkout = new AdyenCheckout(configuration);
          return await checkout.create("dropin").mount(document.getElementById("dropin-container"));
        } catch (error) {
          console.log('error',error);
        }
      };
 }


 export default Checkout
 
 
 