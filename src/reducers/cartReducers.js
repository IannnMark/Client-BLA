// import {
//   ADD_TO_CART,
//   REMOVE_ITEM_CART,
//   SAVE_SHIPPING_INFO,
//   CLEAR_CART,
// } from "../constants/cartConstants";

// export const cartReducer = (
//   state = { cartItems: [], shippingInfo: {} },
//   action
// ) => {
//   console.log("Current State:", state);

//   switch (action.type) {
//     case ADD_TO_CART:
//       const item = action.payload;
//       const isItemExist = state.cartItems.find(
//         (i) => i.product === item.product
//       );
//       if (isItemExist) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((i) =>
//             i.product === isItemExist.product ? item : i
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }
//     case REMOVE_ITEM_CART:
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((i) => i.product !== action.payload),
//       };

//     case SAVE_SHIPPING_INFO:
//       return {
//         ...state,
//         shippingInfo: action.payload,
//       };
//     case CLEAR_CART:
//       return {
//         ...state,
//         cartItems: [],
//         shippingInfo: {},
//       };
//     default:
//       return state;
//   }
// };



import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  console.log("Current State:", state);
  console.log("Current Action:", action);

  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      // Ensure that cartItems is an array
      const existingItems = Array.isArray(state.cartItems) ? state.cartItems : [];
      const isItemExist = existingItems.find((i) => i.product === item.product);

      if (isItemExist) {
        return {
          ...state,
          cartItems: existingItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...existingItems, item],
        };
      }


    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        shippingInfo: {},
      };

    default:
      return state;
  }
};

