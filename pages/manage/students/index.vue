<template>
    <div>
        <div class="row g-3 mb-4 justify-content-between">
            <div class="col-auto">
                <portal-page-title>My Students</portal-page-title>
            </div>

        </div>
        <div class="row">
            <div class="col-lg-8">
                <portal-card>
                    <template v-slot:header-title>Students List</template>
                    <template v-slot:header-button>
                        <NuxtLink to="/manage/students/add">
                            <i class="bi bi-plus-circle"></i> Add a Student
                        </NuxtLink>
                    </template>
                    <template v-slot:default>
                        <div class="row flex-row">
                            <div class="col-auto flex-fill">
                                <div class="page-utilities">
                                    <label>Schools</label>
                                    <select class="form-select form-select-sm" @change="getSchoolYears"
                                            v-model="schoolId">
                                        <option v-for="(school, index) in schools"
                                                :key="index"
                                                :value="school.id">
                                            {{ school.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-auto flex-fill">
                                <div class="page-utilities">
                                    <label>School Years</label>
                                    <select class="form-select form-select-sm" v-model="schoolYearId">
                                        <option v-for="(schoolYear, index) in schoolYears"
                                                :key="index"
                                                :value="schoolYear.id">
                                            {{ schoolYear.start | formatDate }} - {{ schoolYear.end | formatDate }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-auto flex-fill">
                                <div class="page-utilities">
                                    <label>Disorders</label>
                                    <select class="form-select form-select-sm" v-model="disorderId">
                                        <option v-for="(disorder, index) in disorders"
                                                :key="index"
                                                :value="disorder.id">
                                            {{ disorder.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </template>
                </portal-card>
            </div>
        </div>

        <portal-modal :modal-title="modalTitle" modal-id="myModal">

        </portal-modal>
    </div>

</template>

<script>
import {onMounted, ref, useContext, useStore} from "@nuxtjs/composition-api";

export default {
    layout: 'portal',
    head: {
        title: 'My Students',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Manage students information.'
            }
        ]
    },
    filters: {
        formatDate: (date) => {
            const options = {year: 'numeric', timeZone: 'UTC'};
            return new Date(date).toLocaleDateString('en-US', options);
        }
    },
    setup() {
        // Data
        // const context = useContext();
        const store = useStore();
        let schools = ref([]);
        const schoolId = ref();
        const schoolYears = ref([]);
        const schoolYearId = ref();
        const disorders = ref([]);
        const disorderId = ref(0);
        let students = ref([]);
        const modalTitle = ref('Add a Student');
        const buttonText = ref('Add');

        const getSchools = async () => {
            await store.dispatch('schools/getMySchools');
            schools.value = store.state.schools.mySchools;
            schoolId.value = schools.value[0].id;
        }

        const getSchoolYears = async () => {
            await store.dispatch('schoolYears/getSchoolYears', schoolId.value);
            schoolYears.value = store.state.schoolYears.schoolYears;
            schoolYearId.value = schoolYears.value[0].id;
        }

        const getDisorders = async () => {
            await store.dispatch('disorders/getDisorders');
            disorders.value = store.state.disorders.disorders;
        }

        const getStudents = async () => {
            // get students based on schools, school years, and disorders
        }


        // LifeCycle Hooks
        onMounted(async () => {
            await getSchools();
            await getSchoolYears();
            await getDisorders();
            await getStudents();
        });


        // Available Data
        return {
            schools,
            schoolId,
            schoolYears,
            schoolYearId,
            disorders,
            disorderId,
            students,
            modalTitle,
            buttonText,
            getSchoolYears,
            getDisorders

        }
    }
}
</script>
<style lang="scss">

</style>
