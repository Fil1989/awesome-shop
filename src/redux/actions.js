

export const changeCurrency = currency => ({
    type: 'CHANGE_CURRENCY',
    payload: currency
})

export const addProductToCart=product=>({
    type: 'ADD_PRODUCT_TO_CART',
    payload: product,
})

export const addNextProduct = (idInCart) => ({
        type: 'ADD_NEXT_PRODUCT',
        payload: idInCart,
    })
export const removeOneProduct = (idInCart) => ({
        type: 'REMOVE_ONE_PRODUCT',
        payload: idInCart,
})
export const ChangeQuantityInCart = (idInCart) => ({
        type: 'ADD_SAME_PRODUCT',
        payload: idInCart,
})
export const removeFromCart = (idInCart) => ({
        type: 'REMOVE_FROM_CART',
        payload: idInCart,
})
export const cleanCart = () => ({
        type: 'CLEAN_THE_CART',
})
    
