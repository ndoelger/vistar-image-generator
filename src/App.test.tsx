import { render, screen } from '@testing-library/react';
import App from './App';

test('upload and submit works', () => {
  // render
  render(<App />);

  const pdfInput = screen.getAllByPlaceholderText('Enter Copy');
  const brandInput = screen.getAllByPlaceholderText('Upload BrandBook');
  const uploadButt = screen.getAllByPlaceholderText('Upload Assets');

  


});
