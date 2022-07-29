export interface IHeaderState {
  currencyModal: boolean;
  cartModal: boolean;
}
export type ISetHeaderState = (previousState: IHeaderState) => IHeaderState;

export interface ICategory {
  name: string;
}

interface ICategoryResult {
  name: string;
}

interface ICategories {
  categories: ICategoryResult[];
}

export interface IQueryCategories {
  loading: boolean;
  error?: any;
  data: ICategories;
}

export interface IQueryCurrency {
  data: any;
  loading: boolean;
  error?: any;
}
