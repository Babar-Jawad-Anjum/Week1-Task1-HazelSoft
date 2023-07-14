import { SET_SELECTED_USER, SET_USERS } from "../constants/action-types"

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}
export const setSelectedUser = (user) => {
    return {
        type: SET_SELECTED_USER,
        payload: user
    }
}