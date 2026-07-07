import { createContext, useContext, useReducer, useState } from "react";

/* =========================
   CART CONTEXT
========================= */
const CartContext = createContext();


/* =========================
   INITIAL STATE
========================= */
const initialState = {
  cartItems: [],
};


/* =========================
   REDUCER
========================= */
function cartReducer(state, action) {

  switch (action.type) {


    case "ADD_TO_CART": {

      const { product, size } = action.payload;


      const existing = state.cartItems.find(
        (item) =>
          item.id === product.id &&
          item.size === size
      );


      if (existing) {

        return {
          ...state,

          cartItems: state.cartItems.map((item) =>
            item.id === product.id &&
            item.size === size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };

      }


      return {

        ...state,

        cartItems: [

          ...state.cartItems,

          {
            ...product,
            size,
            quantity: 1,
          },

        ],

      };

    }



    case "INCREASE": {

      return {

        ...state,

        cartItems: state.cartItems.map((item) =>

          item.id === action.payload.id &&
          item.size === action.payload.size

            ? {
                ...item,
                quantity: item.quantity + 1,
              }

            : item

        ),

      };

    }



    case "DECREASE": {

      return {

        ...state,

        cartItems: state.cartItems

          .map((item) =>

            item.id === action.payload.id &&
            item.size === action.payload.size

              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }

              : item

          )

          .filter(item => item.quantity > 0),

      };

    }



    case "REMOVE": {

      return {

        ...state,

        cartItems: state.cartItems.filter(

          (item) =>

            !(
              item.id === action.payload.id &&
              item.size === action.payload.size
            )

        ),

      };

    }

case "CLEAR_CART": {
  return {
    ...state,
    cartItems: [],
  };
}

    default:
      return state;

  }

}





/* =========================
   PROVIDER
========================= */
export function CartProvider({ children }) {


  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );


  

  const [giftPopup, setGiftPopup] = useState(false);



  /* =========================
      ADD TO CART
  ========================= */

  const addToCart = (product, size) => {


    dispatch({

      type: "ADD_TO_CART",

      payload:{
        product,
        size
      }

    });



    if(product.limitedEdition){

      setGiftPopup(true);


      setTimeout(()=>{

        setGiftPopup(false);

      },3000);

    }

  };





  const increaseQuantity = (id,size)=>{

    dispatch({

      type:"INCREASE",

      payload:{
        id,
        size
      }

    });

  };





  const decreaseQuantity = (id,size)=>{

    dispatch({

      type:"DECREASE",

      payload:{
        id,
        size
      }

    });

  };





  const removeFromCart=(id,size)=>{

    dispatch({

      type:"REMOVE",

      payload:{
        id,
        size
      }

    });

  };





  /* =========================
      🎁 AUTO GIFT SYSTEM
  ========================= */


  const limitedQuantity = state.cartItems.reduce(

    (total,item)=>{

      if(item.limitedEdition){

        return total + item.quantity;

      }

      return total;

    },0

  );




  const cartItems = limitedQuantity > 0

    ? [

        ...state.cartItems,

        {

          id:"zevon-gift",

          title:{
            main:"ZÉVON 10ml Signature Perfume"
          },


          image:[
            "/special.jpg"
          ],


          size:"ONE SIZE",


          quantity:limitedQuantity,


          freeGift:true,


          price:0,

        }

      ]

    : state.cartItems;






  const value = {

    cartItems,

    addToCart,

    increaseQuantity,

    decreaseQuantity,

    removeFromCart,

    giftPopup,

  };





  return (

    <CartContext.Provider value={value}>

      {children}

    </CartContext.Provider>

  );

}





/* =========================
   HOOK
========================= */

export function useCart(){

  const context = useContext(CartContext);


  if(!context){

    throw new Error(
      "useCart must be used within a CartProvider"
    );

  }


  return context;

}