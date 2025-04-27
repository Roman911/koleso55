import { API_CONSTANTS } from '../constants';
const { API } = API_CONSTANTS.ENDPOINTS;

export const productEndpoints = {
	products: (id: string) => `${API}/getProducts${id}`,
	dataAkum: `${API}/baseDataAkum`,
	reviews: `${API}/addReview`
} as const;
