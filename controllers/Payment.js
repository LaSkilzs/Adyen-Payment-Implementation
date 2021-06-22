const {Client, Config, CheckoutAPI} = require('@adyen/api-library');

// Adyen Server Library
const config = new Config();
config.apiKey = 'AQEyhmfxK4/JbBdBw0m/n3Q5qf3VaY9UCJ14XWZE03G/k2NFisUQ3oG4gUxAeoX8kJuJ8SMQwV1bDb7kfNy1WIxIIkxgBw==-rvbCbqVGh/HefmNBTUx3Hy2jhcrmc4HUbv+0whHaRaI=-KD,Lt*nb~m4z(2^<';
config.merchantAccount = 'AdyenRecruitment_NY1';
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);



module.exports = {
    async getPaymentMethod(req, res) {
        try {
            const response = await checkout.paymentMethods({
                channel: "Web",
                merchantAccount: config.merchantAccount,
            });
            res.json(response);
            } catch (err) {
                onsole.error(`Error: ${err.message}, error code: ${err.errorCode}`);
                res.status(err.statusCode).json(err.message);
            }
    }
}

    