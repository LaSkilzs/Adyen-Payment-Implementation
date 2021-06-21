import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from  './components/navbar'
import routes from './routes/Routes';
import NoMatch from './routes/NoMatch';
// import API from "./utility/API";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

async componentDidMount(){
// debugger
let response = await fetch("http://localhost:5000/carts", {
  mode: 'no-cors'
});
// let data = await response.json();
// console.log('data', data)
console.log('response', response)

}

  render(){
    return (
      <div>
          <Navbar/>
        <Switch>
          {routes.map(({path, exact, component: Component, ...rest}) =>(
            <Route
              key={path}
              path={path}
              exact={exact}
              render={routerProps => (
                <Component {...routerProps}{...rest}/>
              )}
              />
          ))}
          <Route render={props => <NoMatch {...props}/>}/>
        </Switch>
      </div>
    );
  }
  
}

export default App;
