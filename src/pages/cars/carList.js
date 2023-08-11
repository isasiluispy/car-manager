import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

const setCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const CarList = () => {
  const [cars, setCars] = useState([]);

  const getTotal = (car) => {
    return car.productionCost + car.transportationCosts;
  };

  useEffect(() => {
    // Get cars from localStorage
    const storedCars = localStorage.getItem('cars');

    setCars(JSON.parse(storedCars));  // Parse the string to convert back to array/object
  }, []);  // The empty dependency array ensures this useEffect runs only once.

  return (
    <div>
      <div className="d-flex align-items-center flex-column">
        <h3>List of Cars</h3>
        <Button className="px-4" variant="primary">Add</Button>
      </div>

      <div className="mt-4">
        <Button className="px-4" variant="primary">Update</Button>

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
                <td>{car.model}</td>
                <td>{car.brand}</td>
                <td>{car.mainColor}</td>
                <td>{setCurrency(car.value)}</td>
                <td>{setCurrency(car.productionCost)}</td>
                <td>{setCurrency(car.transportationCosts)}</td>
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
