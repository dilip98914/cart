import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



class App extends React.Component{
   render(){
      return (
        <Router>
            <div className='app'>
              <Navbar/>

              <Switch>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/' component={Home}/>
              </Switch>

            </div>
          </Router> 

      );
  }

}

export default App;
