class API {
    static async findAll() {
      const response = await fetch("http://localhost:8080/carts");
      console.log('fetch data', response);
      console.log('hello api')
      return response;
    }
  
    static async create(cart) {
      const response = await fetch("/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart)
      });
      const data = await response.json();
      return data;
    }
  
    static update(cart) {
      fetch(`/carts/${cart.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    }
  
    // delete
    static delete(cart) {
      fetch(`/carts/${cart.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    }
  }
  
  export default API;
  