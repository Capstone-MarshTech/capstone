import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	reducerPath: 'main',
	//Names for each API data
	tagTypes: ['Years'],
	// API Calls
	endpoints: (build) => ({
		// Insert here all endpoint calls
		getYears: build.query({
			query: () => '/years',
			providesTags: ['Years'],
		}),
	}),
});

export const { useGetYearsQuery } = api;
