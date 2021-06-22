class API {
    static async findAll() {
        try{
            const response = await fetch("http://localhost:5000/carts");
            const data = await response.json();
            console.log('data from class', data);
            return data;

        }catch(e){
            console.log('error', e)
        }
 
    }
  
    static async create(cart) {
        try{
            const response = await fetch("http://localhost:5000/carts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "cart": {
                    "productID" : cart.id,
                    "name" : cart.short,
                    "price": cart.price,
                    "quantity": cart.quantity
                  }})
            });
            const data = await response.json();
            console.log('data from class', data);
            return data;
        }catch(e){
            console.log('error', e)
        }
    }
  
    // delete
   static async delete(id) {
     try{
      fetch(`http://localhost:5000/carts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
     }catch(e){
      console.log('error', e)
     }
    }

    // getPaymentMethods
    static async getPaymentMethods(){
      const response = await fetch('http://localhost:5000/api/getPaymentMethods', { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
      const data = await response.json();
      console.log(data);
      return data;
    }
  }
  
  export default API;