import { EuiLoadingSpinner, EuiInMemoryTable, EuiButtonIcon } from '@elastic/eui';
import {
    useQuery,
    gql,
  } from "@apollo/client";

  const CHARACTER_QUERY = gql`
  query allPeople {
    allPeople {
      people {
        name
        birthYear
        gender
        homeworld {
          name
        }
        species {
          name
        }
      }
    }
  }
`;
const checkIfFavorited = (item, favoritesList) => {

    return favoritesList.map((f) => f.name).indexOf(item.name) !== -1;
}

  const CharacterTable = ({favorites, updateFavorites}) => {
    const { loading, error, data } = useQuery(CHARACTER_QUERY);

    if (loading) return <EuiLoadingSpinner size="xl" />

    if (error) console.error('Sorry, an error has occurred');

     const {people} = data.allPeople;

    const columns = [
        {
            field: 'name',
            name: 'Name',
            sortable: true,
        },
        {
            field: 'birthYear',
            name: 'Birth Year',
        },
        {
            field: 'gender',
            name: 'Gender',
        },
        {
            field: 'homeworld.name',
            name: 'Homeworld',
        },
        {
            field: 'species.name',
            name: 'Species',
        },
        {
            name: 'Favorite',
            actions: [{
                render: (item) => {
                    return (
                        <EuiButtonIcon iconType={checkIfFavorited(item, favorites) ? 'starFilled' : 'starEmpty'} onClick={() => updateFavorites(item)}/>
                    )
                }
            }]
        },
    ]

    const search = {
        box: {
          schema: true,
        },
        filters: [
              {
                type: 'is',
                field: 'name',
                name: 'Name',
              },
            ],
      };


    const sorting = {
        sort: {
          field: 'name',
          direction: 'asc',
        },
      };
    

      return (
        <EuiInMemoryTable
        items={people}
        columns={columns}
        pagination={true}
        search={search}
        sorting={sorting}
        hasActions
      />
      )
  }

  export default CharacterTable;