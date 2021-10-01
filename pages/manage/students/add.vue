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
                    <template v-slot:header-title>Add a New Student</template>
                    <template v-slot:header-button>
                        <NuxtLink to="/manage/students">
                            <i class="bi bi-people"></i> My Students
                        </NuxtLink>
                    </template>
                    <template v-slot:default>
                        <form @submit.prevent="addStudent">
                            <div class="row mb-4">
                                <div class="col-lg-6">
                                    <label class="sr-only" for="schools">Select a School</label>
                                    <select id="schools" class="form-control form-select" v-model="form.school_id"
                                            @change="getSchoolYears">
                                        <option v-for="(school, index) in schools" :key="index" :value="school.id">
                                            {{ school.name }}
                                        </option>
                                    </select>
                                    <span v-if="errors !== null && errors.school_id"
                                          class="text-danger">{{ errors.school_id[0] }}</span>
                                </div>
                                <div class="col-lg-6">
                                    <label class="sr-only" for="schoolYears">Select School Year</label>
                                    <select id="schoolYears" class="form-control form-select"
                                            v-model="form.school_year_id">
                                        <option value="" v-if="schoolYears.length < 1" disabled>Select a School to View
                                            School Years
                                        </option>
                                        <option v-for="(schoolYear, index) in schoolYears" :key="index"
                                                :value="schoolYear.id">
                                            {{ schoolYear.start | formatDate }} - {{ schoolYear.end | formatDate }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col-lg-4">
                                    <label class="sr-only" for="firstName">First Name</label>
                                    <input id="firstName" v-model="form.first_name" type="text" class="form-control"
                                           required
                                           placeholder="First Name">
                                    <span v-if="errors !== null && errors.first_name"
                                          class="text-danger">{{ errors.first_name[0] }}</span>
                                </div>
                                <div class="col-lg-4">
                                    <label class="sr-only" for="lastName">Last Name</label>
                                    <input id="lastName" v-model="form.last_name" type="text" class="form-control"
                                           required
                                           placeholder="Last Name">
                                    <span v-if="errors !== null && errors.last_name"
                                          class="text-danger">{{ errors.last_name[0] }}</span>
                                </div>
                                <div class="col-lg-4">
                                    <label class="sr-only" for="grade">Grade</label>
                                    <select id="grade" class="form-control form-select" v-model="form.grade">
                                        <option value="" disabled>Select a Grade</option>
                                        <option v-for="(grade, index) in grades" :value="grade" :key="index">
                                            {{ grade }}
                                        </option>
                                    </select>
                                    <span v-if="errors !== null && errors.grade" class="text-danger">{{
                                            errors.grade[0]
                                        }}</span>
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col-lg-12 mb-4">
                                    <label class="sr-only">Select disorder(s) </label>

                                    <v-select label="name" :options="disorders"
                                              v-model="form.disorders" @input="setSessions" multiple/>
                                    <small>You can select multiple disorders</small>
                                    <span v-if="errors !== null && errors.disorder_id"
                                          class="text-danger">{{ errors.disorder_id[0] }}</span>
                                </div>
                                <div class="col-lg-12" v-if="form.disorders.length > 0">
                                    <div class="card mb-3" v-for="(disorder, index) in form.disorders" :key="index">
                                        <div class="card-header slp-bg-green">{{ disorder.name }}</div>
                                        <div class="card-body">
                                            <div class="row mb-4">
                                                <div class="col-lg-4">
                                                    <label class="sr-only" for="sessionDuration">Session Duration
                                                        (minutes)</label>
                                                    <input id="sessionDuration" type="number"
                                                           v-model="sessions[index].duration"
                                                           class="form-control"
                                                           required
                                                           placeholder="Minutes">
                                                </div>
                                                <div class="col-lg-4">
                                                    <label class="sr-only" for="sessionsPerMonth">Sessions per
                                                        Month</label>
                                                    <input id="sessionsPerMonth"
                                                           type="number" class="form-control"
                                                           v-model="sessions[index].perMonth"
                                                           required
                                                           placeholder="# of Sessions">
                                                </div>
                                                <div class="col-lg-4">
                                                    <label class="sr-only" for="annualMinutes">Annual Minutes</label>
                                                    <input id="annualMinutes"
                                                           type="number" readonly class="form-control"
                                                           :value="sessions[index].duration * sessions[index].perMonth * 8"
                                                           required>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12 mb-3">
                                                    <div class="card mb-3">
                                                        <div class="card-body">
                                                            <div class="text-center mb-3"><u>Weekly Schedule</u></div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div>Weekdays</div>
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" type="checkbox" value="Monday">
                                                                        <label class="form-check-label">Monday</label>
                                                                    </div>
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" type="checkbox" value="Tuesday">
                                                                        <label class="form-check-label">Tuesday</label>
                                                                    </div>
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" type="checkbox" value="Wednesday">
                                                                        <label class="form-check-label">Wednesday</label>
                                                                    </div>
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" type="checkbox" value="Thursday">
                                                                        <label class="form-check-label">Thursday</label>
                                                                    </div>
                                                                    <div class="form-check mb-2">
                                                                        <input class="form-check-input" type="checkbox" value="Friday">
                                                                        <label class="form-check-label">Friday</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="mb-4">
                                                                        <label class="sr-only" for="startTime">Start Time</label>
                                                                        <input id="startTime" type="time" class="form-control"
                                                                               required
                                                                               placeholder="Start Time">
                                                                        <span v-if="errors !== null && errors.start_time"
                                                                              class="text-danger">{{ errors.start_time[0] }}</span>
                                                                    </div>
                                                                    <div>
                                                                        <label class="sr-only" for="endTime">End Time</label>
                                                                        <input id="endTime" type="time" class="form-control"
                                                                               required
                                                                               placeholder="End Time">
                                                                        <span v-if="errors !== null && errors.end_time"
                                                                              class="text-danger">{{ errors.end_time[0] }}</span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="mb-4">
                                                                <label class="sr-only">Objectives</label>
                                                                <div>
                                                                    <textarea class="form-control"></textarea>
                                                                </div>
                                                                <div class="mt-2"><a href="#"><i class="bi bi-plus-circle"></i> Add Objective</a></div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <main-button type="submit" class="app-btn-primary">Save</main-button>
                                </div>
                            </div>

                        </form>
                    </template>
                </portal-card>
            </div>
        </div>
    </div>

</template>

<script>
import vSelect from "vue-select";
import {onMounted, reactive, ref, useStore, watchEffect} from "@nuxtjs/composition-api";

export default {
    layout: 'portal',
    head: {
        title: 'New Student',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Add a new student ot my students list.'
            }
        ]
    },
    filters: {
        formatDate: (date) => {
            const options = {year: 'numeric', timeZone: 'UTC'};
            return new Date(date).toLocaleDateString('en-US', options);
        },
    },
    components: {
        vSelect
    },
    setup() {
        // Data
        // const context = useContext();
        const store = useStore();
        const schools = ref([]);
        const schoolYears = ref([]);
        const disorders = ref();
        const form = reactive({
            first_name: '',
            last_name: '',
            grade: '',
            school_id: '',
            school_year_id: '',
            disorders: [],
            weekdays:[]
        });
        let sessions = ref([]);
        let errors = ref([]);
        const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

        const getSchools = async () => {
            await store.dispatch('schools/getMySchools');
            schools.value = store.state.schools.mySchools;
        }

        const getSchoolYears = async () => {
            await store.dispatch('schoolYears/getSchoolYears', form.school_id);
            schoolYears.value = store.state.schoolYears.schoolYears;
        }

        const getDisorders = async () => {
            await store.dispatch('disorders/getDisorders');
            disorders.value = store.state.disorders.disorders;
        }

        const setSessions = async (values) => {
            for(let i = 0; i < values.length; i++){
                const session = sessions.value.find(item => {
                    return item.id === values[i].id
                })
                if(session === undefined){
                    sessions.value.push(
                        {
                            id: values[i].id,
                            duration: null,
                            perMonth: null,
                            annualMinutes: 0
                        });
                }
            }
        }


        const addStudent = async () => {
            console.log(form.first_name)
        }


        // LifeCycle Hooks
        onMounted(async () => {
            await getSchools();
            await getDisorders();
        });


        // Available Data
        return {
            schools,
            schoolYears,
            disorders,
            form,
            errors,
            grades,
            sessions,
            getSchoolYears,
            getDisorders,
            addStudent,
            setSessions

        }
    }
}
</script>
<style lang="scss">
@import "node_modules/vue-select/dist/vue-select.css";
</style>
