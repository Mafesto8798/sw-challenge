import { EuiInMemoryTable } from '@elastic/eui';
import {
    gql,
  } from "@apollo/client";



  const FavoritesTable = ({favorites}) => {

    const columns = [
        {
            field: 'name',
            name: 'Name',
            sortable: true,
        },
    ]


    const sorting = {
        sort: {
          field: 'name',
          direction: 'asc',
        },
      };
    

      return (
        <EuiInMemoryTable
        items={favorites}
        columns={columns}
        pagination={true}
        sorting={sorting}
      />
      )
  }

  export default FavoritesTable;