import { describe, it, expect, vi} from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WorldClockPage from './WorldClockPage';

describe('WorldClockPage', () => {
  it('Stars with empty array if localStorage is empty', () => {
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem'); 
    
    render(
      <MemoryRouter>
        <WorldClockPage />
      </MemoryRouter>
    )
 
    expect(setItemSpy).toHaveBeenCalledWith('cities', '[]');
  });

  it('Starts with loaded list if there is a city in localStorage', 
    () => {
      const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');
      vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify([{
        cityName: 'Graz',
        timeZone: 'Europe/Berlin'
      }]));

      render(
        <MemoryRouter>
          <WorldClockPage />
        </MemoryRouter>
      )

    expect(setItemSpy).toBeCalledWith(
     'cities', 
      JSON.stringify([{
        cityName: 'Graz',
        timeZone: 'Europe/Berlin'
      }])
    )
  });

  it('Sets the document title vie Helmet' , async () => {
   
    render(
      <MemoryRouter>
        <WorldClockPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(document.title).toBe('World Clock')
    })
  })
});
