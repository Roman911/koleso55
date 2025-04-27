import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	API_CONSTANTS,
	DEFAULT_HEADERS,
	FORM_HEADERS,
	baseEndpoints,
	productEndpoints,
	deliveryEndpoints,
	orderEndpoints,
	formEndpoints
} from '@/config/api';
import { SettingsProps } from '@/models/settings';
import { ProductsProps } from '@/models/products';
import { BaseDataProps } from '@/models/baseData';

export const baseDataAPI = createApi({
	reducerPath: 'baseDataAPI',
	baseQuery: fetchBaseQuery({ baseUrl: API_CONSTANTS.BASE_URL }),
	tagTypes: ['Product'],
	endpoints: (build) => ({
		fetchSettings: build.query<SettingsProps, string>({
			query: () => ({
				url: baseEndpoints.settings,
			}),
		}),
		fetchBaseData: build.query<BaseDataProps, string>({
			query: () => ({
				url: baseEndpoints.baseData,
			}),
		}),
		fetchProducts: build.query<ProductsProps | undefined, {id: string, start?: number, length?: number}>({
			query: ({ id, start = 0, length = 10 }) => ({
				url: productEndpoints.products(id),
				method: API_CONSTANTS.METHODS.POST,
				body: { start, length }
			}),
		}),
		createOrder: build.mutation({
			query: (data) => ({
				url: orderEndpoints.create,
				method: API_CONSTANTS.METHODS.POST,
				body: data,
				headers: FORM_HEADERS
			}),
		}),
	}),
});
