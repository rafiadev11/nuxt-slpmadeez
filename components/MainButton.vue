<template>
    <button :type="type" class="btn app-btn-primary w-100 theme-btn mx-auto"><slot/></button>
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
