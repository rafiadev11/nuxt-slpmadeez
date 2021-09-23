<template>
    <div>
        <div class="row g-3 mb-4 justify-content-between">
            <div class="col-auto">
                <portal-page-title>School Years</portal-page-title>
            </div>

        </div>
        <div class="row">
            <div class="col-lg-8">
                <portal-card>
                    <template v-slot:header-title>
                        <div class="page-utilities">
                            <select class="form-select form-select-sm w-auto" v-model="schoolId"
                                    @change="getSchoolYears">
                                <option v-for="(school, index) in schools"
                                        :key="index"
                                        :value="school.id">
                                    {{ school.name }}
                                </option>
                            </select>
                        </div>
                    </template>
                    <template v-slot:header-button>
                        <a href="#" data-bs-toggle="modal"
                           data-bs-target="#school-modal">
                            <i class="bi bi-plus-circle"></i> Add a School Year
                        </a>
                    </template>
                    <template v-slot:default>
                        <div class="table-responsive">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis delectus
                            ducimus eligendi est inventore laborum magnam mollitia nulla numquam quae quibusdam quisquam
                            quo, ratione recusandae repellat sunt tempore tenetur.
                        </div>
                    </template>
                </portal-card>
            </div>
        </div>
    </div>

</template>

<script>
import {onMounted, reactive, ref, useContext} from "@nuxtjs/composition-api";

export default {
    layout: 'portal',
    setup() {
        const context = useContext();
        const schools = ref([]);
        const schoolId = ref();
        const schoolYears = ref([]);

        // Methods
        const getSchoolYears = () => {
            console.log(schoolId.value);
        }

        onMounted(async () => {
            await context.$getSchools().then(response => {
                schools.value = response.data;
                schoolId.value = schools.value[0].id
            });
            await getSchoolYears();
        });

        return {
            schools,
            schoolId,
            getSchoolYears,
            schoolYears
        }
    }
}
</script>
<style lang="scss">

</style>
