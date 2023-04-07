import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";
import Axios from 'axios'
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartId,setCartId] = useState( [] )
  const [cartStore,setCartStore] = useState( [] )
  const [maxid,setMaxid] = useState(0)
  const [results,setResult] = useState(0)

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
      setResult(totalAmount)
    }
    return totalAmount;
  };
  const addmenu = () => {
    for(let i=0;i<cartStore.length;i++){
      Axios.post('http://localhost:3001/createmenu', {
      menu_id: cartStore[i].id,
      munu_name: cartStore[i].productName,
      menu_price: cartStore[i].price,
      bill_id: maxid[0].value+1
    })
    }
  }

  const addbill = () => {
    Axios.post('http://localhost:3001/createbill', {
      bill_result: results,
    })
  }
  
  const check = () => {
    console.log(cartStore)
  }

  const setdefelt = () => {
    setCartStore([])
    setCartId([])
  }

  const getbillid = () => {
    Axios.get('http://localhost:3001/bill').then((value) => {
      setMaxid(value.data)
    })
    console.log(maxid[0].value)
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    //console.log(itemId)
    cartId.push({itemId})
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    
    for (let i = 0; i < cartId.length; i++) {
      for (let j = 0; j < PRODUCTS.length; j++){
        if(cartId[i].itemId == PRODUCTS[j].id){
          cartStore.push(PRODUCTS[cartId[i].itemId-1])
        }
      }
    }
    console.log(cartStore)
    setCartItems(getDefaultCart());
    setdefelt();
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    addmenu,
    addbill,
    getbillid,
    setdefelt,
    check,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
