import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { brands, mainColors } from '../../constants';

const setCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [copiedCars, setCopiedCars] = useState([]);

  const getTotal = (car) => {
    return car.productionCost + car.transportationCosts;
  };

  const handleClickOnUpdate = () => {
    console.log('handleClickOnUpdate');
    setIsEditable(true);

    // create a copy of cars array, the copy should be a whole different array
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

    // Save cars to localStorage
    localStorage.setItem('cars', JSON.stringify(copiedCars));
  }

  useEffect(() => {
    // Get cars from localStorage
    const storedCars = localStorage.getItem('cars');

    setCars(JSON.parse(storedCars));  // Parse the string to convert back to array/object
  }, []);  // The empty dependency array ensures this useEffect runs only once.

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
          {isEditable ? 
            (<>
              <Button className="px-4" variant="primary" onClick={() => setIsEditable(false)}>Cancel</Button>
              <Button className="px-4" variant="primary" onClick={() => handleSaveCopiedCars()}>Save</Button>
            </>) : 
            (<Button className="px-4" variant="primary" onClick={() => handleClickOnUpdate()}>Update</Button>)
          }
          
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
                <td>{ isEditable ? <Form.Control type="text" value={copiedCars[index]['model']} onChange={e => handleInputChange(index, 'model', e.target.value)} /> : car.model }</td>
                <td>{ isEditable ? 
                  <Form.Select value={copiedCars[index]['brand']} onChange={e => handleInputChange(index, 'brand', e.target.value)}>
                    {brands.map((brand, index) => (
                      <option key={index} value={brand.value}>{brand.label}</option>
                    ))}
                  </Form.Select> : 
                  car.brand }
                </td>
                <td>{ isEditable ? 
                  <Form.Select value={copiedCars[index]['mainColor']} onChange={e => handleInputChange(index, 'mainColor', e.target.value)}>
                    {mainColors.map((color, index) => (
                      <option key={index} value={color.value}>{color.label}</option>
                    ))}
                  </Form.Select> : 
                  car.mainColor }
                </td>
                <td>{ isEditable ? <Form.Control type="number" value={copiedCars[index]['value']} onChange={e => handleInputChange(index, 'value', Number(e.target.value))} /> : setCurrency(car.value) }</td>
                <td>{ isEditable ? <Form.Control type="number" value={copiedCars[index]['productionCost']} onChange={e => handleInputChange(index, 'productionCost', Number(e.target.value))} /> : setCurrency(car.productionCost) }</td>
                <td>{ isEditable ? <Form.Control type="number" value={copiedCars[index]['transportationCosts']} onChange={e => handleInputChange(index, 'transportationCosts', Number(e.target.value))} /> : setCurrency(car.transportationCosts) }</td>
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
