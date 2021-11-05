<template>
    <select class="form-select form-select w-100"
            :value="value"
            @input="$emit('input', parseInt($event.target.value))"
            @change="$emit('change-school')">
        <option v-for="(school, index) in schools"
                :key="index"
                :value="school.id">
            {{ school.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: "SchoolsDropdown",
    props: {
        schools: {
            type: Array
        },
        value: {
            type: Number
        }
    }
}
</script>

<style scoped>

</style>
