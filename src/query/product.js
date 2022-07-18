import {gql} from '@apollo/client';

export const getProduct=(id)=>gql`
query{
    product(id: "${id}"){
      id,
      name,
      inStock,
      attributes{name,
        items{
         value,
         id
        }
      },
      gallery,
      description,
      brand,
      prices{
        amount,
        currency{
          symbol
        }
      }
    }
    }
`;