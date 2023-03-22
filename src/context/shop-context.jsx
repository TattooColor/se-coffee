import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";

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

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(itemId)
    cartId.push({itemId})
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    console.log(cartId)
    //console.log(PRODUCTS[1].productName)
    for (let i = 0; i < cartId.length; i++) {
      for (let j = 0; j < PRODUCTS.length; j++){
        if(cartId[i].itemId == PRODUCTS[j].id){
          //console.log(cartId[i].itemId)
          console.log(PRODUCTS[cartId[i].itemId-1])
          cartStore.push(PRODUCTS[cartId[i].itemId-1])
        }
      }
      
    }
    console.log(cartStore)
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
