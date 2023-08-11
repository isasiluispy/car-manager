import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CarCreate from './carCreate'; // Update the path to the CarCreate component file

// Mock the navigate function from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('<CarCreate />', () => {
  // Set up local storage mock
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true
  });

  beforeEach(() => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify([])); // Mocks an empty cars array in localStorage for each test
  });

  it('renders without crashing', () => {
    render(<CarCreate />);
  });

  it('updates the Model field when typed into', () => {
    const { getByPlaceholderText } = render(<CarCreate />);
    const modelInput = getByPlaceholderText('Enter model');

    fireEvent.change(modelInput, { target: { value: 'Sedan' } });
    expect(modelInput.value).toBe('Sedan');
  });

  // Similar tests can be written for other fields...

  it('shows error feedback if a field is focused and left empty', async () => {
    const { getByPlaceholderText, findByText } = render(<CarCreate />);
    const modelInput = getByPlaceholderText('Enter model');

    // Trigger onBlur event for the model input field
    fireEvent.focus(modelInput);
    fireEvent.blur(modelInput);

    const errorMessage = await findByText('Please enter model.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('adds a new car to local storage on form submission', async () => {
    const { getByPlaceholderText, getByRole } = render(<CarCreate />);
  
    // Mock user filling out the form
    fireEvent.change(getByPlaceholderText('Enter model'), { target: { value: 'Sedan' } });
    fireEvent.change(getByPlaceholderText('Enter value'), { target: { value: '20000' } });
    fireEvent.change(getByPlaceholderText('Enter production cost'), { target: { value: '15000' } });
    fireEvent.change(getByPlaceholderText('Enter transportation cost'), { target: { value: '2000' } });
    // Continue filling out other fields as necessary...
    
    // Trigger form submission
    const form = getByRole('form');
    fireEvent.submit(form);
  
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled();
    }, { timeout: 5000 });
  });
  
});
