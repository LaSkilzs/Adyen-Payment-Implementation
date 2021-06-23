let CONFIG = {};

CONFIG = {
  apiUrl: 'https://adyen-api-implementation.herokuapp.com/' 
};

if(process.env.NODE_ENV === 'production'){

}else{
	CONFIG.apiUrl = 'http://localhost:5000/';
}

export default CONFIG;
