import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { brands, mainColors } from '../../constants';

const setCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const EditableCell = ({ value, index, keyName, type = "text", options = [], onChange }) => {
  if (type === "select") {
    return (
      <Form.Select value={value} onChange={e => onChange(index, keyName, e.target.value)}>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>{option.label}</option>
        ))}
      </Form.Select>
    );
  }

  return (
    <Form.Control 
      type={type} 
      value={value} 
      onChange={e => onChange(index, keyName, type === "number" ? Number(e.target.value) : e.target.value)} 
    />
  );
}

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [copiedCars, setCopiedCars] = useState([]);

  const getTotal = (car) => car.productionCost + car.transportationCosts;

  const handleClickOnUpdate = () => {
    setIsEditable(true);
    const copiedCars = JSON.parse(JSON.stringify(cars));
    setCopiedCars(copiedCars);
  };

  const handleInputChange = (index, key, value) => {
    const updatedCars = [...copiedCars];
    updatedCars[index][key] = value;
    setCopiedCars(updatedCars);
  };

  const handleSaveCopiedCars = () => {
    setIsEditable(false);
    setCars(copiedCars);
    localStorage.setItem('cars', JSON.stringify(copiedCars));
  }

  useEffect(() => {
    const storedCars = localStorage.getItem('cars');
    setCars(JSON.parse(storedCars) || []);  
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center flex-column">
        <h3>List of Cars</h3>
        <Link to="/create">
          <Button className="px-4" variant="primary">Add</Button>  
        </Link>
      </div>

      <div className="mt-4">
        <div className="d-flex justify-content-between">
          {isEditable ? (
            <>
              <Button className="px-4" variant="primary" onClick={() => setIsEditable(false)}>Cancel</Button>
              <Button className="px-4" variant="primary" onClick={handleSaveCopiedCars}>Save</Button>
            </>
          ) : (
            <Button className="px-4" variant="primary" onClick={handleClickOnUpdate}>Update</Button>
          )}
        </div>

        <Table className="mt-4" striped bordered hover>
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>Main Color</th>
              <th>Value</th>
              <th>Production Cost</th>
              <th>Transportation Costs</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <td>{ isEditable ? <EditableCell value={copiedCars[index]['model']} index={index} keyName="model" onChange={handleInputChange} /> : car.model }</td>
                <td>{ isEditable ? <EditableCell value={copiedCars[index]['brand']} index={index} keyName="brand" type="select" options={brands} onChange={handleInputChange} /> : car.brand }</td>
                <td>{ isEditable ? <EditableCell value={copiedCars[index]['mainColor']} index={index} keyName="mainColor" type="select" options={mainColors} onChange={handleInputChange} /> : car.mainColor }</td>
                <td>{ isEditable ? <EditableCell value={copiedCars[index]['value']} index={index} keyName="value" type="number" onChange={handleInputChange} /> : setCurrency(car.value) }</td>
                <td>{ isEditable ? <EditableCell value={copiedCars[index]['productionCost']} index={index} keyName="productionCost" type="number" onChange={handleInputChange} /> : setCurrency(car.productionCost) }</td>
                <td>{ isEditable ? <EditableCell value={copiedCars[index]['transportationCosts']} index={index} keyName="transportationCosts" type="number" onChange={handleInputChange} /> : setCurrency(car.transportationCosts) }</td>
                <td>{setCurrency(getTotal(car))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CarList;
