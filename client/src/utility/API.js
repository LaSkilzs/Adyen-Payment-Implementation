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
  
    // Handle Adyen API
    static async callServer(url, data) {
      const res = await fetch(url, {
        method: "POST",
        body: data ? JSON.stringify(data) : "",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log(result);
      return result;
    }


    static async handleSubmission(state, component, url) {
      try {
        const res = await API.callServer(url, state.data);
        API.handleServerResponse(res, component);
      } catch (error) {
        console.error(error);
      }
    }
    

    static handleServerResponse(res, component) {
      if (res.action) {
        component.handleAction(res.action);
      } else {
        switch (res.resultCode) {
          case "Authorised":
            window.location.href = "/result/success";
            break;
          case "Pending":
          case "Received":
            window.location.href = "/result/pending";
            break;
          case "Refused":
            window.location.href = "/result/failed";
            break;
          default:
            window.location.href = "/result/error";
            break;
        }
      }
    }

    
     
    
  }
  
  export default API;