import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const brands = [
  { value: 'Tesla', label: 'Tesla' },
  { value: 'Ford', label: 'Ford' },
  { value: 'Toyota', label: 'Toyota' },
];

const mainColors = [
  { value: 'Red', label: 'Red' },
  { value: 'Blue', label: 'Blue' },
  { value: 'White', label: 'White' },
  { value: 'Black', label: 'Black' },
];

const CarCreate = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [mainColor, setMainColor] = useState('');
  const [value, setValue] = useState('');
  const [productionCost, setProductionCost] = useState('');
  const [transportationCost, setTransportationCost] = useState('');

  const allFieldsFilled = () => {
    return model && brand && mainColor && value && productionCost && transportationCost;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const carData = {
      model,
      brand,
      mainColor,
      value: Number(value),
      productionCost: Number(productionCost),
      transportationCosts: Number(transportationCost),
    };

    // append new car to existing cars in localStorage
    const storedCars = localStorage.getItem('cars');
    const cars = JSON.parse(storedCars);
    cars.push(carData);
    localStorage.setItem('cars', JSON.stringify(cars));

    navigate('/');
  };

  return (
    <div>
      <div className="d-flex align-items-center flex-column">
        <h3>Add Car</h3>
      </div>

      <div className="mt-4">
        <Form className="mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Model</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter model" 
              value={model}
              onChange={(e) => setModel(e.target.value)} 
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Select 
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            >
              <option value="">Select a brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand.value}>{brand.label}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Main Color</Form.Label>
            <Form.Select 
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              required
            >
              <option value="">Select a color</option>
              {mainColors.map((color, index) => (
                <option key={index} value={color.value}>{color.label}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Value</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter value" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Production Cost</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter production cost" 
              value={productionCost}
              onChange={(e) => setProductionCost(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transportation Cost</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter transportation cost" 
              value={transportationCost}
              onChange={(e) => setTransportationCost(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex align-items-center flex-column">
            <Button className="px-5" variant="primary" type="submit" disabled={!allFieldsFilled()}>
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CarCreate;
