export const initialState = {
    basket: [],
    user: null,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return {
                ...state,
                user: action.user,
            }
        }
        case 'ADD_TO_BASKET': {
            return {
                ...state,
                basket: [...state.basket, action.item],
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
        case 'SET_ITEM_QUANTITY': {
            return {
                ...state,
                basket: state.basket.map(item => item.id === action.payload.id 
                ? {...item, quantity: action.payload.quantity} 
                : item),
            }
        }
        case 'REMOVE_FROM_BASKET': {
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id),
            }
        }
        default:{
            return state;
        }
    }
}