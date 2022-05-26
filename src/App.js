import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import Cliente from './pages/Cliente';
import Inicio from './pages/Inicio';
import Categoria from './pages/Categoria';
import Producto from './pages/Producto';
import Factura from './pages/Factura';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Inicio} />
          <Route path='/cliente' component={Cliente} />
          <Route path='/cliente-actualizar/:id' component={Cliente} />
          <Route path='/categoria' component={Categoria} />
          <Route path='/categoria-actualizar/:id' component={Categoria} />
          <Route path='/producto' component={Producto} />
          <Route path='/producto-actualizar/:id' component={Producto} />
          <Route path='/factura'  component={Factura}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;