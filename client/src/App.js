import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from  './components/navbar'
import routes from './routes/Routes';
import NoMatch from './routes/NoMatch';

const App = () =>   {
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

export default App;


