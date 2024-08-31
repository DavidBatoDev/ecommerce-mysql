export const initialState = {
    basket: [],
    user: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        // When user logs in, set the user
        case 'SET_USER': {
            // always return the new state
            return {
                ...state,
                user: action.user,
            }
        }
        // When user logs in, set the basket
        case 'EMPTY_CART': {
            return {
                ...state,
                basket: [],
            }
        }
        // When user add's am item to the cart
        case 'ADD_TO_CART': {
            // Check if the product already exists in the cart
            const productExists = state.basket.find(item => item.id === action.item.id);
            let basket = [];
            // If the product exists, update the quantity
            if (productExists) {
                basket = state.basket.map(item => item.id === action.item.id 
                ? {...item, quantity: item.quantity + action.item.quantity} 
                : item);
            } 
            // If the product does not exist, add it to the cart
            else {
                basket = [...state.basket, action.item];
            }
            // always return the new state
            return {
                ...state,
                basket,
            }
        }
        case 'TOGGLE_ITEM_SELECTION': {
            return {
                ...state,
                basket: state.basket.map(item => item.id === action.id 
                ? {...item, isSelected: !item.isSelected} 
                : item),
            }
        }
        case 'REMOVE_FROM_BASKET': {
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id),
            }
        }
        case 'REMOVE_SELECTED_FROM_BASKET': {
            return {
                ...state,
                basket: state.basket.filter(item => !item.isSelected),
            }
        }
        default:{
            return state;
        }
    }
}