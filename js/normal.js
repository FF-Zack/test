Vue.directive('example', {
    params: ['a'],
    bind: function () {
        console.log(this.params.a) // -> "hi"
    }
})