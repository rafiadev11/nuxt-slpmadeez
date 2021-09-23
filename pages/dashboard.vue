<template>
    <div>
        <portal-page-title>Dashboard {{schools}}</portal-page-title>
    </div>

</template>

<script>
import {ref} from "@nuxtjs/composition-api";

export default {
    layout: 'portal',
    setup(){
        const schools = ref('Testing');
        return {
            schools
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
