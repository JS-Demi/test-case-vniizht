import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITrain } from '../interfaces/types'
import { RootState } from '../../../app/store'

interface TrainsState {
	activeInfo: ITrain | null
}

const initialState: TrainsState = {
	activeInfo: null,
}

const trainsSlice = createSlice({
	name: 'trains',
	initialState,
	reducers: {
		setActiveInfo(state, { payload }: PayloadAction<ITrain | null>) {
			state.activeInfo = payload
		},
	},
})

export const { setActiveInfo } = trainsSlice.actions

export const selectActiveInfo = (state: RootState) => state.trains.activeInfo

export default trainsSlice.reducer
