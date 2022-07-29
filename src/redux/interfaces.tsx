export interface ICurrency {
  symbol: string;
}

export interface IPrices {
  amount: number;
  currency: ICurrency;
}
export interface IItems {
  value: string;
  id: string;
}
export interface IAttributes {
  name: string;
  items: IItems[];
}

export interface ICart {
  id: string;
  idInCart: string;
  name: string;
  inStock: boolean;
  brand: string;
  gallery: string[];
  prices: IPrices[];
  attributes: IAttributes[] | [];
  chozenAttributes: any;
  numberOfProducts: number;
}

export interface IAppState {
  appCurrency: string;
  cart: ICart[];
}
