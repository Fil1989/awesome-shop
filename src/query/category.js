// import gql from "graphql-tag";
import {gql} from '@apollo/client';

export const getCategory=(title)=>gql`
query{
    category(input:{title:"${title}"}){
        products{
            name,
          brand,
            id,
          inStock,
             prices{
                amount,
                currency{
                    symbol
                }
            }, 
            gallery,
          attributes{
            id, name,
            items{
              id,value
            }
            }
        }
    }
    }
`;