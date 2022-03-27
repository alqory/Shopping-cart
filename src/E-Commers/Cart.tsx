import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { ImCross } from 'react-icons/im'
import { ItemsType ,useStoreContext } from "./Context/Store-reducer";
import { changeQtyItemAdd, changeQtyItemRemove ,destroyItemtoCart } from "./Context/Actions";



const Cart = () => {
    
    const {state, dispatch} = useStoreContext()
    const {Carts} = state;

    const TotalPriceCart = (data: ItemsType[]) => {
        const ReduceAll = data.reduce((prev, item) => prev + item.price * item.amount, 0)
        return ReduceAll.toFixed(2);
    }

  return (
    <div id="cart" className="fixed top-0 right-0 h-full p-5 z-20 bg-white overflow-auto">
        <div className="p-4 text-center shadow-md rounded-md">
            <span className="text-lg font-light">Total Price ${TotalPriceCart(Carts)},-</span>
        </div>
      {
        Carts.length === 0 ? <span className=" px-10 font-light text-2xl">Empty Carts!</span> : 
        Carts.map((resp, id) => (
            <div key={id} id="cart-item" className="relative flex p-5 w-96 border-2 border-black my-2 rounded-md">
                <span  onClick={()=> destroyItemtoCart(dispatch, resp )} className="absolute top-1 right-1 text-sm cursor-pointer"><ImCross/></span>
                <div className="w-14 rounded-md">
                    <img
                    src={resp.image}
                    alt=""
                    />
                </div>
                <div className="flex flex-col ml-5 ">
                    <span className="text-lg font-light">
                    {resp.title} | $ {resp.price},-
                    </span>
                    <div className="flex gap-2 mt-3">
                    <button disabled={resp.amount === 0 && true} onClick={()=> changeQtyItemRemove(dispatch,resp)}  className="border-2 p-2 rounded-md border-gray-600">
                        <AiOutlineMinus />
                    </button>
                    <span className="mx-2 font-bold">{resp.amount}</span>
                    <button onClick={() => changeQtyItemAdd(dispatch, resp)}  className="border-2 p-2 rounded-md border-gray-600">
                        <GrAdd />
                    </button>
                    <span className="ml-10 text-lg font-semibold">
                        $ {(resp.price * resp.amount).toFixed(2)},-
                    </span>
                    </div>
                </div>
            </div> 
        ))
      }
    </div>
  );
};

export default Cart;
