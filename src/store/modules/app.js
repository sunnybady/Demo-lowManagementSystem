import { Map } from 'immutable'
const reducer = (state = Map({
    collapsed: localStorage.getItem('collapsed') === 'true'
}), action) => {

    switch (action.type) {
        case 'CHANGE_COLLAPSED':
            // 将全局状态的值取反，然后保存
            localStorage.setItem('collapsed', !state.get('collapsed'))
            return state.set('collapsed', !state.get('collapsed'))
        default:
            return state
    }
}
export default reducer