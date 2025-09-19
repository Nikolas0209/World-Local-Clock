import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import Footer from './Footer';

 describe('Footer', () => {
  it('renders timezone and offset', () => {
    vi.spyOn(dayjs.tz, 'guess').mockReturnValue('Europe/Berlin');
    vi.spyOn(dayjs.prototype, 'tz').mockReturnValue({
      format: () => '+02:00',
    });
  
    render(<Footer />);

    expect(screen.getByText(/Europe\/Berlin \+02:00/)).toBeInTheDocument();
  });
 });



   
  

 
