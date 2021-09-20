<template>
    <div class="app">
        <header class="app-header fixed-top">
            <PortalTopNav/>
            <PortalSidePanel/>
        </header>
        <div class="app-wrapper">
            <div class="app-content pt-3 p-md-3 p-lg-4">
                <div class="container-xl">
                    <Nuxt/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "portal",
    head() {
        return {
            script: [
                {hid: "side-panel", src: "/js/side-menu.js", defer: true}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/vars";
@import "assets/scss/mixins";

.app-header {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .1);
    border-bottom: 1px solid $theme-border-color;
    height: 56px;
    background: #fff;
}

.app-wrapper {
    transition: all 0.4s ease-in-out;
}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
    .app-wrapper {
        margin-left: 250px;
    }

}
</style>
