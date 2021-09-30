<template>
    <div>
        <portal-page-title>Dashboard</portal-page-title>
        <div>
            <vSelect :options="options" v-model="value" multiple>
            </vSelect>
        </div>
        {{value}}
    </div>

</template>

<script>
import vSelect from "vue-select";
import {ref} from "@nuxtjs/composition-api";

export default {
    layout: 'portal',
    components: {
        vSelect
    },
    setup() {
        const options = [
            {
                id: 1,
                name: 'test',
                label: 'Label Test'
            }
        ];
        const value = ref([]);
        // const options = [{
        //     id: 1,
        //     name: 'test'
        // },
        //     {
        //         id: 2,
        //         name: 'test2'
        //     }
        // ]

        return{
            options,
            value
        }
    }

};
</script>
<style lang="css">
@import "node_modules/vue-select/dist/vue-select.css";
</style>
