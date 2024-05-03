import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ITrain } from './types'

const baseUrl =
	'https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json'

export const trainsApi = createApi({
	reducerPath: 'trainsApi',
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		getTrains: builder.query<ITrain[], void>({
			query: () => '',
		}),
	}),
})

export const { useGetTrainsQuery } = trainsApi
