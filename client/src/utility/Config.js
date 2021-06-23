import API from './API';

class InitiateCheckout {
    static async checkoutObject() {
      console.log('Configuration Object creation has begun')
      console.log(process.env.NODE_ENV)
        try {
          const paymentMethodsResponse = await API.callServer('https://adyen-api-implementation.herokuapp.com/api/getPaymentMethods');
          const configuration = {
            paymentMethodsResponse: paymentMethodsResponse,
            clientKey: 'test_TQPDZU2N3ZAJPEYLCL6HT44RKUQXYWWU',
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
                API.handleSubmission(state, component, "https://adyen-api-implementation.herokuapp.com/api/initiatePayment");
              }
            },
            onAdditionalDetails: (state, component) => {
              API.handleSubmission(state, component, "https://adyen-api-implementation.herokuapp.com/api/submitAdditionalDetails");
            },
          };
          console.log('Configuration Object Has Been Completed!')
          return configuration;
        } catch (error) {
          console.error(error);
        }
    }
}

export default InitiateCheckout;