import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Clock from './Clock';
import { MemoryRouter } from 'react-router-dom';

describe('Clock:', () => {
  it('Renders current time', () => {
    render(
      <MemoryRouter>
        <Clock />
      </MemoryRouter>
    );

    const timeRegex = /\d{2}:\d{2}:\d{2}/;
    expect(screen.getByText(timeRegex)).toBeInTheDocument();
  });

  it('Toggles between 24h and 12h formats', async () => {
    render(
     <MemoryRouter>
       <Clock />
     </MemoryRouter>
    )  

    const toggleButton = screen.getByRole('button', {
      name: 'Digital Clock'
    });
    const user = userEvent.setup();
    await user.click(toggleButton);

    expect(screen.getByRole('button', {
      name: 'Analog Clock'
    }));
  });

  it('Saves toggle state to localStorage', async () => {
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');

    localStorage.setItem('option', JSON.stringify(false));

    render(
      <MemoryRouter>
        <Clock />
      </MemoryRouter>
    )

    const toggleButton = screen.getByText(
      /Analog Clock|Digital Clock/i);
    const user = userEvent.setup();
    await user.click(toggleButton);

    expect(setItemSpy).toHaveBeenCalledWith('option',
      JSON.stringify(true));

    await user.click(toggleButton);
    expect(setItemSpy).toHaveBeenCalledWith('option',
      JSON.stringify(true));  
  });

  it('Sets the document title vie Helmet' , async () => {
    render(
      <MemoryRouter>
        <Clock />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(document.title).toBe('Clock')
    });
  });
});