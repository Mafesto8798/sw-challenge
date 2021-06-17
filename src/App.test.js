import { render } from '@testing-library/react';
import CharacterTable from './CharacterTable';
import FavoritesTable from './FavoritesTable';

test('renders character table', () => {
  render(<CharacterTable />);
  expect(<CharacterTable />).toBeInTheDocument();
});

test('renders favorites list', () => {
  render(<FavoritesTable />);
  expect(<FavoritesTable />).toBeInTheDocument();
})