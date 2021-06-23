
class API {
   static async callServer(url, data) {
      const res = await fetch(url, {
        method: "POST",
        // mode: 'no-cors',
        body: data ? JSON.stringify(data) : "",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const result = await res.json();
      console.log('call to server working!!!', res);
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