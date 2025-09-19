import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage:',() => {
  it('Displays error message when needed', () => {
     render(
       <ErrorMessage errorMessage='Something went wrong!' />)
  
     expect(
      screen.getByText('Something went wrong!')).toBeInTheDocument();
  })

  it('Does not display error message', () => {
    const { container } = render(<ErrorMessage errorMessage=''/>)

    expect(container).toBeEmptyDOMElement();
  })
})