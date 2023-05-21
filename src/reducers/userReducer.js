import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isSignedIn: false,
	isAdmin: false,
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.isSignedIn = action.payload.isSignedIn
			state.user = action.payload
			state.isAdmin = action.payload.isAdmin
		},
	},
})

export const { setUser } = userSlice.actions
export default userSlice.reducer


