<template>
    <div>
        <button @click="increment">
            increment +1
        </button>
    </div>
</template>

<script>
    import { incrementCounter } from '../vuex/action'

    export default {
        vuex : {
            actions : {
                increment : incrementCounter
            },
            computed : {
                count : function(){
                    return store.state.count
                }
            }
        }
    }
</script>