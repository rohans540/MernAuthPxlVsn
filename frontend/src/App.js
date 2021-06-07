import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/Routing/PrivateRoute';
import PrivateScreen from './components/Screens/Privatescreen';
import LoginScreen from './components/Screens/Loginscreen';
import RegisterScreen from './components/Screens/Registerscreen';



const App = () => {
  return (
      <Router>
        <div className="app">
          <Switch>
            <PrivateRoute exact path="/" component={PrivateScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
