import { Map } from 'immutable'
const reducer = (state = Map({
    loginState: localStorage.getItem('loginState') === 'true',
    adminname: localStorage.getItem('adminname') || '',
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') * 1 || 1,
    checkedkeys: JSON.parse(localStorage.getItem('checkedkeys')) || []
}), { type, payload }) => {
    switch (type) {
        case 'CHANGE_LOGIN_STATE':
            return state.set('loginState', payload)
        case 'CHANGE_ADMIN_NAME':
            return state.set('adminname', payload)
        case 'CHANGE_TOKEN':
            return state.set('token', payload)
        case 'CHANGE_ROLE':
            return state.set('role', payload)
        case 'CHANGE_CHECKEDKEYS':
            return state.set('checkedkeys', payload)
        default:
            return state
    }
}

export default reducer