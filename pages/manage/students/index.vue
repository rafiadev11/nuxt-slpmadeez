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
                            <div class="col-auto flex-fill mt-4">
                                <main-button type="button" @click.native="getStudents" class="app-btn-primary w-100">
                                    <i class="bi bi-filter-left"></i> Filter
                                </main-button>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table mb-0">
                                        <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>Grade</th>
                                            <th>Disorder</th>
                                            <th>Schedule</th>
                                            <th>Objectives</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(goal, index) in students" :key="index">
                                            <td>
                                                {{ goal.student.first_name }} {{ goal.student.last_name }}
                                                <a href="#"><i class="bi bi-pencil"></i></a>
                                            </td>
                                            <td>{{ goal.student.grade }}</td>
                                            <td>{{ goal.disorder.name }}</td>
                                            <td>
                                                <a href="#"><i class="bi bi-calendar-week"></i></a>
                                                /
                                                <a href="#"><i class="bi bi-pencil"></i></a>
                                            </td>
                                            <td>
                                                <a href="#"><i class="bi bi-list-check"></i></a>
                                                /
                                                <a href="#"><i class="bi bi-pencil"></i></a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </template>
                </portal-card>
            </div>
        </div>

        <portal-modal :modal-title="modalTitle" modal-id="myModal">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores esse et excepturi exercitationem
            facilis fugiat hic suscipit velit! Commodi deserunt in mollitia natus neque odio repellat sapiente sit ullam
            voluptatibus?
        </portal-modal>
    </div>

</template>

<script>
import {onMounted, ref, useStore} from "@nuxtjs/composition-api";

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
            console.log(schoolYearId.value);
            await store.dispatch('students/getStudents', {
                schoolYearId: schoolYearId.value,
                disorderId: disorderId.value
            });
            students.value = store.state.students.students;
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
            getDisorders,
            getStudents

        }
    }
}
</script>
<style lang="scss">

</style>
