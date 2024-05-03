import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITrain } from './types'
import { RootState } from '../../app/store'

interface TrainsState {
	activeInfo: {
		name: string
		description: string
		characteristics: {
			speed: number
			force: number
			engineAmperage: number
		}[]
	} | null
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
