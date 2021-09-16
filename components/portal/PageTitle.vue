<template>
    <h1 class="app-page-title">
        <slot/>
    </h1>
</template>

<script>
export default {
    name: "PageTitle",
}
</script>

<style lang="scss" scoped>
.app-page-title {
    font-size: 1.5rem;
    font-weight: bolder;
    margin-bottom: 1.5rem;
}
</style>
