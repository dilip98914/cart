import React from 'react';
import './App.css';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import Home from './components/Home';


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



class App extends React.Component{
   render(){
      return (
        <Router>
          <div>
            <Navbar/>
            {/* <Link to="/signup">Signup</Link>
            <Link to="/signin">Signin</Link> */}

            <Switch>
              <Route path='/signup' component={Signup}/>
              <Route path='/signin' component={SignIn}/>
              <Route path='/' component={Home}/>
            </Switch>
          </div>

          </Router> 

      );
  }

}

export default App;
