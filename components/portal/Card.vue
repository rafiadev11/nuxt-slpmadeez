<template>
    <div :class="['app-card app-card-stats-table h-100 shadow-sm']">
        <div class="app-card-header p-3">
            <div class="row justify-content-between align-items-center">
                <div class="col-auto">
                    <slot name="header-title"></slot>
                </div>
                <div class="col-auto">
                    <div class="card-header-action">
                        <slot name="header-button"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-card-body p-3 p-lg-4">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card"
}
</script>

<style scoped>

</style>
