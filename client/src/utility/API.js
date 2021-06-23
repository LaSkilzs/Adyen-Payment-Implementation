import axios from 'axios';

class API { 
    // Handle Adyen API
    static async callServer(url, data) {
      let bodyData = data ? JSON.stringify(data) : "";
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Credentials': 'true',
          "Content-Type": "application/json"
        }
      }
      console.log(process.env.NODE_ENV)
      try {
          const res = await axios.post(url, bodyData, config);
          console.log('res data', res);
          const result = await res.data
          console.log('result', result)
          return result;
      } catch (err) {
          if (err.response) {
              // the request went through and a response was returned
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
          } else if (err.request) {
              // request was made but server returned no response
              console.log(err.request);
          } else {
              // something went wrong in setting up the request
              console.error('Error:', err.message);
          }
      }};


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

       // static async callServer(url, data) {
    //   const res = await fetch(url, {
    //     method: "POST",
    //     mode: 'cors',
    //     body: data ? JSON.stringify(data) : "",
    //     headers: {
    //       "Content-Type": "application/json",
    //     }
    //   });
    //   const result = await res.json();
    //   console.log('call to server working!!!', res);
    //   return result;
    // }
     
    
  }
  
  export default API;