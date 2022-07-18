import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from "./query/categories";
import { GET_CURRENCIES } from "./query/currencies";
import { getCategory } from "./query/category";
import { getProduct } from "./query/product";


export function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
  }
export function withLocation(Component) {
    return props => <Component {...props} location={useLocation()} />;
  }
  
export function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

export function withQueryProduct(Component) {
  return props => <Component {...props} query={useQuery(getProduct(`${props.params.id}`))} />
  }
export function withQueryCategories(Component) {
  return props => <Component {...props} queryCategories={useQuery(GET_CATEGORIES)} />
  }
export function withQueryCurrencies(Component) {
  return props => <Component {...props} query={useQuery(GET_CURRENCIES)} />
}
export function withQueryCategory(Component) {
  return props => {
   return <Component {...props} query={useQuery(getCategory(`${props.params.title}`))} />
  }
  }