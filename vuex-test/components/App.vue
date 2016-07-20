<template>
    <div id="v-app">
        <Display></Display>
        <Increment></Increment>
    </div>
</template>

<script>
    import Display form './Display.vue'
    import Increment from './Increment.vue'
    import store from '../vuex/store'

    export default {
        components : {
            Display : Display,
            Increment : Increment
        },
        store : store
    }
</script>