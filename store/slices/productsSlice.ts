import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ProductsProps } from '@/models/products';

export interface ProductsState {
	isFetching: boolean,
	isLoading: boolean,
	products: ProductsProps | null,
}

const initialState: ProductsState = {
	isFetching: false,
	isLoading: false,
	products: null,
}

export const productsSlice = createSlice({
	name: 'productsSlice',
	initialState,
	reducers: {
		setProducts: (state, actions: PayloadAction<ProductsProps>) => {
			state.products = actions.payload;
		},
		// addCartFromStorage: (state, actions: PayloadAction<CreateItem[]>) => {
		// 	state.cartItems = actions.payload;
		// },
		// removeCart: (state, actions: PayloadAction<number>) => {
		// 	state.cartItems = state.cartItems.filter(item => item.id !== actions.payload);
		// },
		// setQuantity: (state, actions: PayloadAction<CreateItem>) => {
		// 	state.cartItems = [
		// 		...state.cartItems.filter(item => item.id !== actions.payload.id),
		// 		{ id: actions.payload.id, quantity: actions.payload.quantity, section: actions.payload.section }
		// 	];
		// },
		reset: () => initialState,
	},
});

export const { setProducts, reset } = productsSlice.actions

export default productsSlice.reducer
