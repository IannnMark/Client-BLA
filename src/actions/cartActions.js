import axios from 'axios'
import { ADD_TO_CART, CLEAR_CART, REMOVE_ITEM_CART } from '../constants/cartConstants'


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`);
    console.log('Fetched Data:', data);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity
      }
    });

    console.log('Updated State:', getState().cart);
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error('API Error:', error);
  }
};





export const removeItemFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,

    payload: id
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  })
}
