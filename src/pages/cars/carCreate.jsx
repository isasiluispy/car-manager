import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { brands, mainColors } from '../../constants';

const FormControlGroup = ({ label, type, value, onChange, onBlur, placeholder, field, options }) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    {type === "select" ? (
      <Form.Select 
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={!value && field}
        required
      >
        <option value="">{placeholder}</option>
        {options && options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </Form.Select>
    ) : (
      <Form.Control 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange} 
        onBlur={onBlur}
        isInvalid={!value && field}
        required
      />
    )}
    <Form.Control.Feedback type="invalid">
      Please enter {label.toLowerCase()}.
    </Form.Control.Feedback>
  </Form.Group>
);

const CarCreate = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [mainColor, setMainColor] = useState('');
  const [value, setValue] = useState('');
  const [productionCost, setProductionCost] = useState('');
  const [transportationCost, setTransportationCost] = useState('');
  const toNumber = value => Number(value);

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
      value: toNumber(value),
      productionCost: toNumber(productionCost),
      transportationCosts: toNumber(transportationCost),
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
        <Form className="mt-4" onSubmit={handleSubmit} role="form">
          <FormControlGroup 
            label="Model" 
            type="text" 
            value={model} 
            onChange={(e) => setModel(e.target.value)} 
            onBlur={() => handleBlur('model')} 
            placeholder="Enter model" 
            field={touchedFields.model}
          />
          
          <FormControlGroup 
            label="Brand" 
            type="select" 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)} 
            onBlur={() => handleBlur('brand')} 
            placeholder="Select a brand" 
            field={touchedFields.brand}
            options={brands}
          />

          <FormControlGroup 
            label="Main Color" 
            type="select" 
            value={mainColor} 
            onChange={(e) => setMainColor(e.target.value)} 
            onBlur={() => handleBlur('mainColor')} 
            placeholder="Select a color" 
            field={touchedFields.mainColor}
            options={mainColors}
          />

          <FormControlGroup 
            label="Value" 
            type="number" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            onBlur={() => handleBlur('value')} 
            placeholder="Enter value" 
            field={touchedFields.value}
          />

          <FormControlGroup 
            label="Production Cost" 
            type="number" 
            value={productionCost} 
            onChange={(e) => setProductionCost(e.target.value)} 
            onBlur={() => handleBlur('productionCost')} 
            placeholder="Enter production cost" 
            field={touchedFields.productionCost}
          />

          <FormControlGroup 
            label="Transportation Cost" 
            type="number" 
            value={transportationCost} 
            onChange={(e) => setTransportationCost(e.target.value)} 
            onBlur={() => handleBlur('transportationCost')} 
            placeholder="Enter transportation cost" 
            field={touchedFields.transportationCost}
          />

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
