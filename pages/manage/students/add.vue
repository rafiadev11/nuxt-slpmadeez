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
                                    <label class="sr-only">Select a School</label>
                                    <portal-schools-dropdown
                                        v-model="form.school_id"
                                        :schools="schools"
                                        @change-school="getSchoolYears"/>
                                    <span v-if="errors !== null && errors.school_id"
                                          class="text-danger">{{ errors.school_id[0] }}</span>
                                </div>
                                <div class="col-lg-6">
                                    <label class="sr-only">Select School Year</label>
                                    <portal-school-years-dropdown
                                        v-model="form.school_year_id"
                                        :school-years="schoolYears"/>
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
                                    <label class="sr-only">Grade</label>
                                    <select class="form-control form-select" v-model="form.grade">
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
                                                           :value="sessions[index].duration * sessions[index].perMonth * 8">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12 mb-3">
                                                    <div class="card mb-3">
                                                        <div class="card-body">
                                                            <div class="text-center mb-3"><u>Weekly Schedule</u></div>
                                                            <div class="row">
                                                                <div class="col-lg-4">
                                                                    <div>Weekdays</div>
                                                                    <div class="form-check mb-2"
                                                                         v-for="(schedule, index) in sessions[index].schedule">
                                                                        <input class="form-check-input" type="checkbox"
                                                                               v-model="schedule.checked">
                                                                        <label
                                                                            class="form-check-label">{{
                                                                                schedule.day
                                                                            }}</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-8">
                                                                    <div
                                                                        v-for="(schedule, index) in sessions[index].schedule"
                                                                        v-if="schedule.checked">
                                                                        <div class="card mb-3 time-card">
                                                                            <div class="card-header">
                                                                                {{ schedule.day }}
                                                                            </div>
                                                                            <div class="card-body">
                                                                                <div class="row">
                                                                                    <div class="col-6">
                                                                                        <label class="sr-only"
                                                                                               for="startTime">Start
                                                                                            Time</label>
                                                                                        <input id="startTime"
                                                                                               type="time"
                                                                                               class="form-control"
                                                                                               v-model="schedule.time.startTime"
                                                                                               required
                                                                                               placeholder="Start Time">
                                                                                        <span
                                                                                            v-if="errors !== null && errors.start_time"
                                                                                            class="text-danger">{{
                                                                                                errors.start_time[0]
                                                                                            }}</span>
                                                                                    </div>
                                                                                    <div class="col-6">
                                                                                        <label class="sr-only"
                                                                                               for="endTime">End
                                                                                            Time</label>
                                                                                        <input id="endTime" type="time"
                                                                                               class="form-control"
                                                                                               v-model="schedule.time.endTime"
                                                                                               required
                                                                                               placeholder="End Time">
                                                                                        <span
                                                                                            v-if="errors !== null && errors.end_time"
                                                                                            class="text-danger">{{
                                                                                                errors.end_time[0]
                                                                                            }}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header">Objectives</div>
                                                        <div class="card-body">
                                                            <div class="mb-4"
                                                                 v-for="(objective, idx) in objectives[index].values">
                                                                <div>
                                                                    <textarea v-model="objective.name"
                                                                              class="form-control"></textarea>
                                                                </div>
                                                                <div class="mt-2">
                                                                    <small>
                                                                        <a @click="removeObjective(idx, index)">
                                                                            <u><i class="bi bi-trash"></i> Remove</u>
                                                                        </a>
                                                                    </small>
                                                                </div>

                                                            </div>
                                                            <small>
                                                                <a @click="addObjective(disorder.id)">
                                                                    <u><i class="bi bi-plus-circle"></i> Add
                                                                        Objective</u>
                                                                </a>
                                                            </small>
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
import {onMounted, reactive, ref, useContext, useStore, watchEffect} from "@nuxtjs/composition-api";

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
        const context = useContext();
        const store = useStore();
        const schools = ref([]);
        const schoolYears = ref([]);
        const disorders = ref();
        let form = reactive({
            first_name: '',
            last_name: '',
            grade: '',
            school_id: null,
            school_year_id: null,
            disorders: [],
            sessions: [],
            objectives: []
        });
        let sessions = ref([]);
        let objectives = ref([]);
        let errors = ref([]);
        const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

        const getSchools = async () => {
            await store.dispatch('schools/getMySchools');
            schools.value = store.state.schools.mySchools;
            form.school_id = schools.value[0].id;
            form.school_year_id = schools.value[0].school_years[0].id;
            if(schoolYears.value.length < 1){
                await getSchoolYears();
            }
        }

        const getSchoolYears = async () => {
            await store.dispatch('schoolYears/getSchoolYears', form.school_id);
            schoolYears.value = store.state.schoolYears.schoolYears;
            form.school_year_id = schoolYears.value[0].id;
        }

        const getDisorders = async () => {
            await store.dispatch('disorders/getDisorders');
            disorders.value = store.state.disorders.disorders;
        }

        const setSessions = async (values) => {
            for (let i = 0; i < values.length; i++) {
                const session = sessions.value.find(item => {
                    return item.disorder_id === values[i].id
                })
                if (session === undefined) {
                    sessions.value.push(
                        {
                            disorder_id: values[i].id,
                            duration: null,
                            perMonth: null,
                            schedule: [
                                {
                                    day: 'Monday',
                                    checked: false,
                                    time: {
                                        startTime: null,
                                        endTime: null
                                    }
                                },
                                {
                                    day: 'Tuesday',
                                    checked: false,
                                    time: {
                                        startTime: null,
                                        endTime: null
                                    }
                                },
                                {
                                    day: 'Wednesday',
                                    checked: false,
                                    time: {
                                        startTime: null,
                                        endTime: null
                                    }
                                },
                                {
                                    day: 'Thursday',
                                    checked: false,
                                    time: {
                                        startTime: null,
                                        endTime: null
                                    }
                                },
                                {
                                    day: 'Friday',
                                    checked: false,
                                    time: {
                                        startTime: null,
                                        endTime: null
                                    }
                                },
                            ]
                        });
                }

                const objective = objectives.value.find(item => {
                    return item.disorder_id === values[i].id;
                })
                if (objective === undefined) {
                    objectives.value.push({
                        disorder_id: values[i].id,
                        values: []
                    })
                }
            }
        }

        const addObjective = async (disorderId) => {
            const objectiveIdx = objectives.value.findIndex(idx => idx.disorder_id === disorderId);
            objectives.value[objectiveIdx].values.push({name: ''})
        }

        const removeObjective = async (idx, disorderIdx) => {
            objectives.value[disorderIdx].values.splice(idx, 1);
        }

        const addStudent = async () => {
            // Prepare form data
            form.sessions = sessions.value;
            form.objectives = objectives.value;

            // Submit data via API
            const student = store.dispatch("students/addStudent", form);
            student.then((response) => {
                errors.value = null;
                form.first_name = '';
                form.last_name = '';
                form.grade = '';
                form.disorders = [];
                form.sessions = [];
                form.objectives = [];
                context.$toast.success("Success", {
                    duration: 3000
                });
            }).catch(error => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors
                }
            });
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
            objectives,
            getSchoolYears,
            getDisorders,
            addStudent,
            setSessions,
            addObjective,
            removeObjective


        }
    }
}
</script>
<style lang="scss">
@import "node_modules/vue-select/dist/vue-select.css";

.time-card {
    font-size: 14px;
}

textarea.form-control {
    height: 4rem;
}
</style>
