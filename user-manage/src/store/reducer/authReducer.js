const initState = {
    info: ''
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return action.login
        default :
            return state
    }
}

export default AuthReducer