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
                                            <th>Deactivate</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(goal, index) in students" :key="index">
                                            <td>
                                                {{ goal.student.first_name }} {{ goal.student.last_name }}
                                                <a href="#"
                                                   @click="setStudentInfo(goal.student)"
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#updateStudentInfo">
                                                    <i class="bi bi-pencil"></i>
                                                </a>
                                            </td>
                                            <td>{{ goal.student.grade }}</td>
                                            <td>{{ goal.disorder.name }}</td>
                                            <td>
                                                <a href="#"><i class="bi bi-pencil"></i></a>
                                            </td>
                                            <td>
                                                <a href="#"><i class="bi bi-pencil"></i></a>
                                            </td>
                                            <td>
                                                <a href="#"><i class="bi bi-power"></i></a>
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

        <portal-modal modal-title="Update Student" modal-id="updateStudentInfo">
            <form @submit.prevent="updateStudentInfo">
                <div class="row">
                    <div class="col-6">
                        <label class="sr-only">First Name</label>
                        <input v-model="form.first_name" type="text" class="form-control"
                               placeholder="First Name"><br>
                        <span v-if="errors !== null && errors.first_name" class="text-danger">{{
                                errors.first_name[0]
                            }}</span>
                    </div>
                    <div class="col-6">
                        <label class="sr-only">Last Name</label>
                        <input v-model="form.last_name" type="text" class="form-control"
                               placeholder="Last Name"><br>
                        <span v-if="errors !== null && errors.last_name" class="text-danger">{{
                                errors.last_name[0]
                            }}</span>
                    </div>
                    <div class="col-12">
                        <label class="sr-only">Grade</label>
                        <select class="form-control form-select" v-model="form.grade">
                            <option v-for="(grade, index) in grades" :value="grade" :key="index">
                                {{ grade }}
                            </option>
                        </select>
                        <span v-if="errors !== null && errors.grade" class="text-danger">{{
                                errors.grade[0]
                            }}</span>
                    </div>
                    <div class="col-12 mt-3">
                        <main-button type="submit" class="app-btn-primary">Update</main-button>
                    </div>
                </div>
            </form>
        </portal-modal>
    </div>

</template>

<script>
import {onMounted, reactive, ref, useStore} from "@nuxtjs/composition-api";

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
        const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];
        let form = reactive({
            studentId: 0,
            first_name: null,
            last_name: null,
            grade: null
        });
        let errors = ref([]);


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

        const setStudentInfo = async (student) => {
            form.id = student.id;
            form.first_name = student.first_name;
            form.last_name = student.last_name;
            form.grade = student.grade;
        }

        const updateStudentInfo = async () => {
            if (form.id !== 0) {
                const student = store.dispatch("students/updateStudent", form);
                student.then((response) => {
                    store.commit('students/SET_STUDENT', response.data)
                }).catch(error => {
                    if (error.response.status === 422) {
                        errors.value = error.response.data.errors
                    }
                })
            }
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
            form,
            errors,
            grades,
            getSchoolYears,
            getDisorders,
            getStudents,
            setStudentInfo,
            updateStudentInfo

        }
    }
}
</script>
<style lang="scss">

</style>
