import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { brands, mainColors } from '../../constants';


const CarCreate = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [mainColor, setMainColor] = useState('');
  const [value, setValue] = useState('');
  const [productionCost, setProductionCost] = useState('');
  const [transportationCost, setTransportationCost] = useState('');

  const [touchedFields, setTouchedFields] = useState({
    model: false,
    brand: false,
    mainColor: false,
    value: false,
    productionCost: false,
    transportationCost: false,
  });

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

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
              onBlur={() => handleBlur('model')}
              isInvalid={!model && touchedFields.model}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a model.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Select 
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              onBlur={() => handleBlur('brand')}
              isInvalid={!brand && touchedFields.brand}
              required
            >
              <option value="">Select a brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand.value}>{brand.label}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a brand.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Main Color</Form.Label>
            <Form.Select 
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              onBlur={() => handleBlur('mainColor')}
              isInvalid={!mainColor && touchedFields.mainColor}
              required
            >
              <option value="">Select a color</option>
              {mainColors.map((color, index) => (
                <option key={index} value={color.value}>{color.label}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a color.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Value</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter value" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => handleBlur('value')}
              isInvalid={!value && touchedFields.value}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a value.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Production Cost</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter production cost" 
              value={productionCost}
              onChange={(e) => setProductionCost(e.target.value)}
              onBlur={() => handleBlur('productionCost')}
              isInvalid={!productionCost && touchedFields.productionCost}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a production cost.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transportation Cost</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter transportation cost" 
              value={transportationCost}
              onChange={(e) => setTransportationCost(e.target.value)}
              onBlur={() => handleBlur('transportationCost')}
              isInvalid={!transportationCost && touchedFields.transportationCost}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a transportation cost.
            </Form.Control.Feedback>
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
