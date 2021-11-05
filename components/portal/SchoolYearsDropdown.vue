<template>
    <select class="form-select form-select"
            :value="value"
            @input="$emit('input', parseInt($event.target.value))">
        <option v-for="(schoolYear, index) in schoolYears"
                :key="index"
                :value="schoolYear.id">
            {{ schoolYear.start | formatDate }} - {{ schoolYear.end | formatDate }}
        </option>
    </select>
</template>

<script>
export default {
    name: "SchoolYearsDropdown",
    props:{
        schoolYears:{
            type: Array
        },
        value:{
            type: Number
        },
    },
    filters: {
        formatDate: (date) => {
            const options = {year: 'numeric', timeZone: 'EST'};
            return new Date(date).toLocaleDateString('en-US', options);
        }
    },
}
</script>

<style scoped>

</style>
