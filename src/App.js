import {useState, useEffect} from 'react';
import styled from "styled-components";

import {
  EuiPage,
  EuiPageBody,
  EuiFlexGroup, 
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
} from '@elastic/eui';

import CharacterTable from './CharacterTable';
import FavoritesTable from './FavoritesTable';

function App() {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites])

  const updateFavorites = (item) => {
    const indexOfItem = favorites.map((f) => f.name).indexOf(item.name);

    if (indexOfItem === -1) {
      setFavorites([
        ...favorites,
        item
      ])
    } else {
      setFavorites((state) => state.splice(indexOfItem, 0, item))
    }
  }

  const Title = styled.div`
    font-size:32px;
    background:navy;
    padding:15px;
    color: white;
  `



  return (
    <EuiPage paddingSize="m">
      <EuiPageBody restrictWidth>
        
        <EuiTitle>
          <Title>
          <h1>Star Wars Challenge</h1>
          </Title>
        </EuiTitle>
        <EuiSpacer />
        <EuiFlexGroup>
          <EuiFlexItem grow={8}>
            <EuiTitle size="s"><h3>Character List</h3></EuiTitle>
            <CharacterTable favorites={favorites} updateFavorites={updateFavorites} />
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            <EuiTitle size="s"><h3>Favorites</h3></EuiTitle>
            <FavoritesTable favorites={favorites} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </EuiPage>
  );
}

export default App;
