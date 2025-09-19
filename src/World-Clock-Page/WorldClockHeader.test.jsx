import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import WorldClockHeader from './WorldClockHeader';

describe('WorldClockHeader:', () => {
  let setCityMock;
  let user;
  let input; 
  let addButton;

  beforeEach(() => {
    setCityMock = vi.fn();
    user = userEvent.setup();

    render(
      <MemoryRouter>
        <WorldClockHeader city={[]} setCity={setCityMock} />
      </MemoryRouter>
    );

    input = screen.getByPlaceholderText('Type here...');
    addButton = screen.getByText('Add');
  });

  it('calls setCity when Add clicked for a valid city', async () => {
    await user.type(input, 'Graz');
    await user.click(addButton);

    expect(setCityMock).toHaveBeenCalledTimes(1);
  });

  it('adds a city from mocked data', async () => {
    await user.type(input, 'Graz');
    await user.click(addButton);
    
    const updaterFunction = setCityMock.mock.calls[0][0]; 
    const result = updaterFunction([]);
     
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cityName: 'Graz',
          timeZone: 'Europe/Berlin'
        })
      ])
    );
  });

  it('Pressing Enter triggers addCity', async () => {
    await user.type(input, 'Graz{Enter}');

    expect(setCityMock).toBeCalledTimes(1);
});

  it('Clears the input when pressing esc', async () => {
    await user.type(input, 'Graz');
    await user.click(input);
    await user.keyboard('{Escape}');

    expect(input).toHaveValue('');
  });

  it('formats city names with proper capitalization', async () => {
    await user.type(input, 'gRaZ');
    await user.click(addButton);

    const updaterFunction = setCityMock.mock.calls[0][0];
    const result = updaterFunction([]);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          cityName: 'Graz',
          timeZone: 'Europe/Berlin'
        })
      ])
    )
  });
});



