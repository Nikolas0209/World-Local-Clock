import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListContainer from './ListContainer';

vi.mock('./CityTime', () => ({
  default: () => <>12:34</>
}));

describe('ListContainer:', () => {
  let mockCity;
  let setMockCity;

  beforeEach(() => {
    mockCity = [{
      id: 1,
      cityName: 'Graz',
      timeZone: 'Europe/Berlin'
    }];
  
    setMockCity = vi.fn();

    render(
      <ListContainer city={mockCity} setCity={setMockCity}/>
    )
  })

  it('Renders city name and current time', () => {
    const li = screen.getByRole('listitem');

    expect(within(li).getByText((content) => content.includes('Graz'))).toBeInTheDocument();
    expect(within(li).getByText(/12:34/)).toBeInTheDocument();
  });

  it('Deletes displayed city', async () => {
    const delButton = screen.getByText('Delete');
    const user = userEvent.setup();
    await user.click(delButton);

    expect(setMockCity).toBeCalledWith([]);
  });
});