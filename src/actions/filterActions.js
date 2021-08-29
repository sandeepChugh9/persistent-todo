import { SET_FILTER } from './types';

export const setFilter = (filter) => {
	return {
		type: SET_FILTER,
		filter
	};
};
