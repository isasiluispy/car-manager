import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import CarList from './pages/cars/carList';
import CarCreate from './pages/cars/carCreate';

const Routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" element={<CarList />} />
      <Route path="/create" element={<CarCreate />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
