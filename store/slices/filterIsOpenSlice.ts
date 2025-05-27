import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IOpenFilter } from '@/models/filter';

export interface FilterState {
	filterIsOpen: IOpenFilter
}

const initialFilterState: IOpenFilter = {
	width: false,
	height: false,
	radius: false,
	sezon: false,
	brand: false,
	model_id: false,
	citys: false,
	country: false,
	year: false,
	omolog: false,
	krepeg: false,
	typedisk: false,
	colir: false,
	jemnist: false,
	puskovii_strum: false,
	tip_elektrolitu: false,
	tip_korpusu: false,
	napruga: false,
	poliarnist: false,
	vehicle_type: false,
	li: false,
	si: false,
	only_studded: false,
	only_c: false,
	only_xl: false,
	only_owl: false,
	only_run_flat: false,
	only_off_road: false,
	minPrice: false,
	maxPrice: false,
	etMin: false,
	etMax: false,
	diaMin: false,
	diaMax: false,
	minShirina: false,
	maxShirina: false,
	minVisota: false,
	maxVisota: false,
	minDovzina: false,
	maxDovzina: false,
}

const initialState: FilterState = {
	filterIsOpen: initialFilterState,
}

export const filterIsOpenSlice = createSlice({
	name: 'filterIsOpen',
	initialState,
	reducers: {
		open: (state, actions: PayloadAction<keyof IOpenFilter>) => {
			state.filterIsOpen[actions.payload] = true;
		},
		close: (state, actions: PayloadAction<keyof IOpenFilter>) => {
			state.filterIsOpen[actions.payload] = false;
		},
		reset: () => initialState,
	},
});

export const { close, open, reset } = filterIsOpenSlice.actions;

export default filterIsOpenSlice.reducer;
