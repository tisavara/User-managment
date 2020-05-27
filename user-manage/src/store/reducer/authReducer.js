const initState = {
    info: ''
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return {
                ...state,
                info: action.data
            }
        case 'LOGOUT' :
            return action.data
        case 'GET_ALL_USER' :
            return {
                ...state,
                user: action.data
            }
        case 'CHECK_ADD_USER' :
            return {
                ...state,
                checkAddUser: action.data
            }
        case 'CHECK_EDIT_USER' :
            return {
                ...state,
                checkEdit: action.data
            }
        case 'CHECK_DELETE_USER' :
            return {
                ...state,
                checkDelete: action.data
            }
        default :
            return state
    }
}

export default AuthReducer