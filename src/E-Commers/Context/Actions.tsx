import { ActionType, ItemsType} from './Store-reducer'

type PropsDispatch = (value: ActionType) => void

export const getItem = async (dispatch: PropsDispatch): Promise<ItemsType[]> => {
    const data = await ( await fetch('https://fakestoreapi.com/products')).json();
    return new Promise((resolve, rejected) => {
        if(!data){
            dispatch({type : "getItem", payload : []})
            rejected()
        }
        else{
            dispatch({type : "getItem", payload : data})
            resolve(data)
        }
    })
} 

export const addToCart           = (dispatch: PropsDispatch, Item: ItemsType) => dispatch({type:"addToCartItem", payload:Item})
export const changeQtyItemAdd    = (dispatch: PropsDispatch, Item: ItemsType) => dispatch({type:"changeQtyItemAdd", payload:Item})
export const changeQtyItemRemove = (dispatch: PropsDispatch, Item: ItemsType) => dispatch({type:"changeQtyItemRemove", payload:Item})
export const destroyItemtoCart   = (dispatch: PropsDispatch, Item: ItemsType) => dispatch({type: "removeItemFromCart", payload:Item})