import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    //Check product already in cart or not
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${quantity} ${product.name} added to the cart.`);
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    //Get add to cart item
    foundProduct = cartItems.find((item) => item._id === id)

    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id)
    
    const itemIndex = cartItems.map((item, index) => {if(item._id === id) {return index}}).filter((item) => item !== undefined)[0]

    if (value === 'inc') {
      newCartItems.splice(itemIndex, 0,  { ...foundProduct, quantity: foundProduct.quantity + 1})

      setCartItems([...newCartItems]);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)

      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } 
    else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        newCartItems.splice(itemIndex, 0,  { ...foundProduct, quantity: foundProduct.quantity - 1})

        setCartItems([...newCartItems]);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)

        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incquantity = () => {
    setQuantity((prevquantity) => prevquantity + 1);
  }

  const decquantity = () => {
    setQuantity((prevquantity) => {
      if (prevquantity - 1 < 1) return 1;

      return prevquantity - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quantity,
        incquantity,
        decquantity,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);