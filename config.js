
let whitelist = [ 'https://adyen-api-implementation.herokuapp.com/' ];

let apiUrl = 'https://adyen-api-implementation.herokuapp.com/';


if(process.env.NODE_ENV !== 'production'){
	whitelist = whitelist.concat(
		['http://localhost:3000/', 'http://localhost:5000', 'http://localhost:5001', 'localhost']
	);
	apiUrl = 'http://localhost:5000';
}

const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS: ' + origin))
		}
	}
};

const initiatePayment = apiUrl + "/api/initiatePayment";
const getPaymentMethods = apiUrl + "/api/getPaymentMethods";
const submitAdditionalDetails = apiUrl + "/api/submitAdditionalDetails";
const handleShopperRedirect = apiUrl + "/api/handleShopperRedirect";

const config = {
	apiUrl,
	whitelist,
	corsOptions,
}

module.exports = config;