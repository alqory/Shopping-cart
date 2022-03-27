import { useEffect, Fragment, useState } from 'react';
import { IoBagAddSharp } from 'react-icons/io5'
import { getItem, addToCart, changeQtyItemAdd } from './Context/Actions'
import { ItemsType ,useStoreContext } from './Context/Store-reducer'
 

const CardItem = () => {
    const [response, setResponse] = useState<{
        isLoading : boolean,
        isError : boolean
    }>({
        isLoading : false,
        isError : false
    })

    const {state , dispatch} = useStoreContext();
    const {Item, Carts} = state;

    useEffect(()=> {
        setResponse(prev => {
            return {
                ...prev,
                isLoading : true
            }
        })
        getItem(dispatch)
        .then((_) => {
            setResponse({
                isLoading : false,
                isError : false
            })
        }).catch(err => {
            setResponse({
                isLoading : false,
                isError : true
            })
        })
    },[dispatch])

    if(response.isLoading) return <div style={{fontSize:14, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <span>Loading . . .</span>
    </div>
    if(response.isError) return <div>Something when Wrong</div>

    const handleAddCart = (id: number, data:ItemsType) => {
        const isMatch = Carts.find((item) => item.id === id);
        if(isMatch === undefined){
            return addToCart(dispatch, data)
        }  
        return changeQtyItemAdd(dispatch, data)
    }

    return(
        <Fragment>
            {
                Item.map((resp) => (
                    <div key={resp.id} className="w-3/6 relative rounded-md shadow-xl p-3 flex flex-col md:flex-row ">
                    <div className="absolute right-2 top-3">
                        <button onClick={() => handleAddCart(resp.id, resp)} className="border-2 border-neutral-700 my-2 rounded-md text-sm p-1 font-light"><IoBagAddSharp /></button>
                    </div>
                    <img className="mx-auto rounded-md p-1 object-contain h-48 w-48" src={resp.image} alt="" width="70%"/>
                    <div className="flex  p-1 mt-3 text-center md:text-left flex-col ml-4">
                        <span className="text-2xl font-light my-4">{resp.title}</span>
                        <span className="text-xs font-bold text-gray-400">{resp.category}</span>
                        <span className="text-lg font-semibold">$ {resp.price},-</span>
                        <p className="text-xs text-gray-600">{resp.description}</p>
                    </div>
                </div>
                ))
            }
        </Fragment>
    )
}

export default CardItem;
