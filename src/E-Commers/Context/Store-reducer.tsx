import React, { createContext, useContext, useReducer } from 'react';

export type ItemsType = {
    id          : number,
    title       : string,
    price       : number,
    category    : string,
    description : string,
    image       : string,
    amount      : number 
}

type initialState = {
    Item : ItemsType[],
    Carts : ItemsType[]
};

export type ActionType = 
    { type : "getItem", payload : ItemsType[] } |
    { type : "addToCartItem" | "changeQtyItemAdd" | "changeQtyItemRemove" | "removeItemFromCart", payload : ItemsType } 



const initialValue: initialState = {
        Item : [] as ItemsType[],
        Carts : [] as ItemsType[]
}


type initialTypeContext = {
    state : initialState,
    dispatch : React.Dispatch<ActionType>
}

const Store = createContext<initialTypeContext>({} as initialTypeContext)

const Reducer:React.Reducer<initialState, ActionType> = (state, action) => {
    switch(action.type){
        case "getItem":
            return { ...state, Item : action.payload }
        case "addToCartItem":
            return {...state,  Carts : state.Carts.concat({...action.payload, amount : 1}) }
        case "changeQtyItemAdd":
            return {...state, Carts : state.Carts.map(c => c.id === action.payload.id ?
                { ...action.payload, amount : c.amount + 1} : c)}
        case "changeQtyItemRemove":
            return {...state, Carts : state.Carts.map(c => c.id === action.payload.id ?
                { ...action.payload, amount : c.amount - 1} : c)}
        case "removeItemFromCart":
            return {...state, Carts : state.Carts.filter((item) => item.id !== action.payload.id )}
        default:
            return state
    }
}

type PropsType = { children : React.ReactNode }

export const AppContext = ({ children }:PropsType) => {
    const [state, dispatch] = useReducer(Reducer, initialValue)
    return(
        <Store.Provider value={{state, dispatch}}>
            {children}
        </Store.Provider>
    )
}

export const useStoreContext = () => useContext(Store);


