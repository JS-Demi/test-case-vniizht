import { configureStore } from '@reduxjs/toolkit'
import trainsReducer from '../features/trains/trainsSlice'
import { trainsApi } from '../features/trains/trainsApi'

export const store = configureStore({
	reducer: {
		trains: trainsReducer,
		[trainsApi.reducerPath]: trainsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(trainsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
