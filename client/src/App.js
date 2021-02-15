import {Fragment, useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes'
import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'
// Redux 
import {Provider} from 'react-redux'
import store from './store';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
  )};


export default App;
