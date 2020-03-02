import React from 'react';
import './App.css';
import Shipment from './components/Shipment';
import {BrowserRouter, Route} from 'react-router-dom';
import ShipmentDetail from './components/ShipmentDetail';

function App() {
  
  return (
  <BrowserRouter>
   <main>
     <h2>Shippment information</h2>
     <section>
       {/* <Shipment></Shipment> */}
        <Route exact path="/" component={Shipment}></Route>
        <Route exact path="/:id" component={ShipmentDetail}></Route>
     </section>
     </main>
  </BrowserRouter>
  );
}

export default App;
