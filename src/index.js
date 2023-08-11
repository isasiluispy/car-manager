import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initialization script
const initializeCarsInLocalStorage = () => {
  if (!localStorage.getItem('cars')) {
    const exampleCars = [
      { model: 'Model S', brand: 'Tesla', mainColor: 'Red', value: 79999, productionCost: 50000, transportationCosts: 5000 },
      { model: 'Mustang', brand: 'Ford', mainColor: 'Blue', value: 55999, productionCost: 35000, transportationCosts: 4500 },
      { model: 'Model 3', brand: 'Tesla', mainColor: 'White', value: 39999, productionCost: 25000, transportationCosts: 4000 },
      { model: 'Model X', brand: 'Tesla', mainColor: 'Black', value: 89999, productionCost: 60000, transportationCosts: 5500 },
      { model: 'Model Y', brand: 'Tesla', mainColor: 'Red', value: 49999, productionCost: 30000, transportationCosts: 3500 },
      { model: 'F-150', brand: 'Ford', mainColor: 'Blue', value: 45999, productionCost: 30000, transportationCosts: 3500 },
      { model: 'Focus', brand: 'Ford', mainColor: 'White', value: 29999, productionCost: 20000, transportationCosts: 3000 },
    ];
    localStorage.setItem('cars', JSON.stringify(exampleCars));
  }
};

initializeCarsInLocalStorage();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
