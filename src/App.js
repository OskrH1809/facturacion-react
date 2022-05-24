import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import Cliente from './pages/Cliente';
import Inicio from './pages/Inicio';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Inicio} />
          <Route path='/cliente' component={Cliente} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;