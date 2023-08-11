import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CarList from './carList';

describe('CarList Component', () => {

  // Setup localStorage mock
  let getItemSpy, setItemSpy;
  beforeEach(() => {
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  it('should display cars from localStorage', async () => {
    getItemSpy.mockReturnValueOnce(JSON.stringify([
      { model: 'Test Model', brand: 'Test Brand', mainColor: 'Red', value: 50000, productionCost: 10000, transportationCosts: 5000 }
    ]));

    const { getByText } = render(
      <BrowserRouter>
        <CarList />
      </BrowserRouter>
    );

    await waitFor(() => expect(getByText(/Test Model/i)).toBeInTheDocument());
  });

  it('should allow editing and saving cars', async () => {
    getItemSpy.mockReturnValueOnce(JSON.stringify([
      { model: 'Test Model', brand: 'Test Brand', mainColor: 'Red', value: 50000, productionCost: 10000, transportationCosts: 5000 }
    ]));

    const { getByText, getByDisplayValue, getByRole } = render(
      <BrowserRouter>
        <CarList />
      </BrowserRouter>
    );

    await waitFor(() => expect(getByText(/Test Model/i)).toBeInTheDocument());

    fireEvent.click(getByText('Update'));

    const modelInput = getByDisplayValue('Test Model');
    fireEvent.change(modelInput, { target: { value: 'Updated Model' } });

    fireEvent.click(getByText('Save'));

    // Check if the data is saved in localStorage
    expect(setItemSpy).toHaveBeenCalledWith('cars', expect.stringContaining('Updated Model'));
  });

  it('should link to the create page when clicking the "Add" button', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CarList />
      </BrowserRouter>
    );

    const linkElement = getByText("Add").closest("a");
    expect(linkElement).toHaveAttribute("href", "/create");
  });

  it('should display the correct total for a car', async () => {
    getItemSpy.mockReturnValueOnce(JSON.stringify([
      { model: 'Test Model', brand: 'Test Brand', mainColor: 'Red', value: 50000, productionCost: 10000, transportationCosts: 5000 }
    ]));

    const { getByText } = render(
      <BrowserRouter>
        <CarList />
      </BrowserRouter>
    );

    // Expect the total to be the sum of productionCost and transportationCosts
    await waitFor(() => expect(getByText("$15,000.00")).toBeInTheDocument());
  });

  it('should revert changes when "Cancel" is clicked', async () => {
    getItemSpy.mockReturnValueOnce(JSON.stringify([
      { model: 'Test Model', brand: 'Test Brand', mainColor: 'Red', value: 50000, productionCost: 10000, transportationCosts: 5000 }
    ]));

    const { getByText, getByDisplayValue } = render(
      <BrowserRouter>
        <CarList />
      </BrowserRouter>
    );

    await waitFor(() => expect(getByText(/Test Model/i)).toBeInTheDocument());

    fireEvent.click(getByText('Update'));

    const modelInput = getByDisplayValue('Test Model');
    fireEvent.change(modelInput, { target: { value: 'Changed Model' } });

    fireEvent.click(getByText('Cancel'));

    // Check if the model reverted back to the original value
    expect(getByText('Test Model')).toBeInTheDocument();
  });
});

