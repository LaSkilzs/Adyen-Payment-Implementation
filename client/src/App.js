import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from  './components/navbar'
import routes from './routes/Routes';
import NoMatch from './routes/NoMatch';
// import API from './utility/API';

export default class App extends Component {

  // async componentDidMount(){

  //   let cart = {productID: 7, name: "IPHONE 8", quantity: 1, price: "999.99"}
  //   API.create(cart).then(data => {
  //     console.log('data', data);
  //   })
  // }
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



