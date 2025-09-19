import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ControlPanel from './ControlPanel';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('ControlPanel:', () => {
  it('Navigates to World Clock page on button click', async () => {
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
    <ControlPanel setClockOption={() => {}} optionButton={false} />
    );

    const user = userEvent.setup();
    const button = screen.getByText('World Clock');
    await user.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/world-clock');
  });
});