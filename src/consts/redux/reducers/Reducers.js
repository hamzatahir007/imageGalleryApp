import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  tempuser: {}, 
  tempapplication: {}, 
  itemsInCart: [],
};

export const userSlice = createSlice({
  name: 'user',
  tempuser: 'tempuser',
  tempapplication: 'tempapplication',
  itemsInCart: 'itemsInCart',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  initialState,
  reducers: {
    saveTempUser: (state, action) => {
      state.tempuser = {
        ...state.tempuser,
        ...action.payload, // merge step data
      };
    },
    clearTempUser: state => {
      state.tempuser = {};
    },
     saveTempApplication: (state, action) => {
      state.tempapplication = {
        ...state.tempapplication,
        ...action.payload, // merge step data
      };
    },
    clearTempApplication: state => {
      state.tempapplication = {};
    },
    login: (state, action) => {
      console.log(state.user, ' : Login user');

      state.user = action.payload;
    },

    addToCart(state, action) {
      //   console.log(state.itemsInCart , ": ADD TO CART");
      const itemInCart = state.itemsInCart.find(
        item => item.uid == action.payload.uid,
      );
      if (itemInCart) {
        itemInCart.qty += action.payload.qty;
        itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
      } else {
        state.itemsInCart.push({ ...action.payload });
        // console.log(state.itemsInCart, "ADD TO CART")
        // state.itemsInCart = [...state.itemsInCart, action.payload]
      }
      // if (action.payload) {
      // restaurantName :  action.payload.restaurantName,
      // }
      //   state.itemsInCart = payload;
      //   return[...state.itemsInCart,  action.payload];
      //uid is the unique id of the item
      // const { id } = payload;

      // const find = state.find((item) => item?.id === id);
      // if (find) {
      //     return state.map((item) =>
      //         item.id === id
      //             ? {
      //                 ...item,
      //                 qty: item.qty + 1,
      //             }
      //             : item
      //     );
      // } else {
      //     state.push({
      //         ...payload,
      //         qty: 1,
      //     });
      // }
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.itemsInCart.filter(
        item => item.uid !== action.payload.uid,
      );
      state.itemsInCart = removeFromCart;
    },
    incrementQty: (state, action) => {
      const itemInCart = state.itemsInCart.find(
        item => item.uid == action.payload.uid,
      );
      // itemInCart.qty++;
      itemInCart.qty += 1;
      itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
    },
    decrementQty: (state, action) => {
      const itemInCart = state.itemsInCart.find(
        item => item.uid == action.payload.uid,
      );
      if (itemInCart.qty == 1) {
        const removeFromCart = state.itemsInCart.filter(
          item => item.uid !== action.payload.uid,
        );
        state.itemsInCart = removeFromCart;
      } else {
        itemInCart.qty -= 1;
        itemInCart.Totalprice = itemInCart.PricePerItem * itemInCart.qty;
      }
    },

    logout: state => {
      console.log(state.user, ' : Delete user');

      state.user = null;
    },
  },
});

export const {
  saveTempUser,
  clearTempUser,
  saveTempApplication,
  clearTempApplication,
  login,
  logout,
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
} = userSlice.actions;

export const selectTempuser = state => state.user.tempuser;
export const selectTempApplication = state => state.user.tempapplication;
export const selectUser = state => state.user.user;
export const selectaddToCart = state => state.user.itemsInCart;

export default userSlice.reducer;
