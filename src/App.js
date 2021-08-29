import './App.css';
import Header from './Components/header';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react'
import store from './store';
import {
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from './Components/privateRoute';

const Login = React.lazy(() => import('./Components/login'));
const Board = React.lazy(() => import('./Components/board'));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <Suspense fallback={<div></div>}>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/tasks" component={Board} />
          </Switch>
       </Suspense>
      </div>
    </Provider>
  );
}

export default App;





