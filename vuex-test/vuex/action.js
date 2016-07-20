export const incrementCounter = function({dispatch,state}){
    dispatch('INCREMENT',1);
}

// 最简单的 action
function increment (store) {
    store.dispatch('INCREMENT')
}

// 带附加参数的 action
// 使用 ES2015 参数解构
function incrementBy ({ dispatch }, amount) {
    dispatch('INCREMENT', amount)
}