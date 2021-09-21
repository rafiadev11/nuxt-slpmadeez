<template>
    <button :type="type" :class="['btn']"><slot/></button>
</template>

<script>
export default {
    name: "MainButton",
    props:{
        type:{
            type: String,
            default: 'button'
        }
    }
}
</script>

<style scoped>

</style>
