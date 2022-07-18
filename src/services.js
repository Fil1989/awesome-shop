export const service = {
    _prices:[],
    _appCurrency: '',
    _cart: [],
    _tax:null,
    priceSearching() {
        let price = Math.round(
            this._prices.find(
                ({ currency }) => currency.symbol === this._appCurrency
            ).amount * 100
        ) / 100;
        price += '';
         price = price.split('.').length === 2 ? (price.split('.')[1].length === 1 ? price.padEnd(price.length+1, '0') : price) : (
            price.padEnd(price.length + 1, '.').padEnd(price.length + 3,'0'));
       return price
    },
    totalPrice() {
        let total= Math.round(
        this._cart.reduce((accum, { prices, numberOfProducts }) => {
          prices.forEach(({ amount, currency }) => {
            if (currency.symbol === this._appCurrency) {
              accum += amount * numberOfProducts;
            }
          });
          return accum;
        }, 0) * 100
        ) / 100
         total += '';
         total = total.split('.').length === 2 ? (total.split('.')[1].length === 1 ? total.padEnd(total.length+1, '0') : total) : (
            total.padEnd(total.length + 1, '.').padEnd(total.length + 3,'0'));
        return total
    },
setPrice(prices) {
     this._prices = prices
    },
getPrice() {
        return this._prices
    },
    setAppCurrency(currency) {
     this._appCurrency = currency
    },
    getAppCurrency() {
        return this._appCurrency
    },
setCart(cart) {
     this._cart = cart
    },
getCart() {
        return this._cart
    },
    setTax() {
        this._tax=Math.round(this.totalPrice() * 0.21 * 100) / 100
    },
    getTax() {
        return this._tax
    }
}