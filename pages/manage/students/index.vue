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
                                            <th></th>
                                            <th></th>
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
                                            <td>
                                                {{ goal.disorder.name }}
                                                <a href="#"
                                                   @click="getUnusedDisorders(goal.student_id)"
                                                   title="Add Disorder"
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#addDisorder">
                                                    <i class="bi bi-plus-circle"></i>
                                                </a>
                                            </td>
                                            <td>
                                                <a href="#"
                                                   @click="getSchedule(goal.id)"
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#updateSchedule"
                                                   title="Update Schedule"><i class="bi bi-clock"></i></a>
                                                /
                                                <a href="#"
                                                   @click="getObjectives(goal.id)"
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#updateObjectives"
                                                   title="Update Objectives"><i
                                                    class="bi bi-list-check"></i></a>
                                                /
                                                <a href="#"
                                                   @click="deactivate(goal.id, index, goal.student.first_name)"
                                                   title="Deactivate Student"><i
                                                    class="bi bi-person-x-fill"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <a href="#"
                                                   @click="showStudentTransfer(
                                                       goal.id,
                                                       goal.student.first_name + ' '+goal.student.last_name,
                                                       goal.disorder.name,
                                                       goal.school_year.school.name,
                                                       goal.school_year.start+' - '+goal.school_year.end
                                                       )"
                                                   data-bs-toggle="modal"
                                                   data-bs-target="#transferStudent">Transfer</a>
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
        <portal-modal modal-title="Add Disorder" modal-id="addDisorder">
            <form @submit.prevent="addDisorder">
                <div class="row">
                    <div class="col-12">
                        <label class="sr-only">Select a Disorder</label>
                        <select class="form-control" v-model="disorderForm.id">
                            <option v-for="(disorder, index) in unusedDisorders" :key="index" :value="disorder.id">
                                {{ disorder.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12" v-if="disorderForm.id !== null && disorderForm.id !== 0">
                        <div class="row mt-2">
                            <div class="col-6">
                                <label class="sr-only" for="sessionDuration">Session Duration (minutes)</label>
                                <input id="sessionDuration" type="number"
                                       v-model="disorderForm.duration"
                                       class="form-control"
                                       required
                                       placeholder="Minutes">
                            </div>
                            <div class="col-6">
                                <label class="sr-only" for="sessionsPerMonth">Sessions per
                                    Month</label>
                                <input id="sessionsPerMonth"
                                       type="number" class="form-control"
                                       v-model="disorderForm.perMonth"
                                       required
                                       placeholder="# of Sessions">
                            </div>
                            <div class="col-12 mt-2">
                                <label class="sr-only" for="annualMinutes">Annual Minutes</label>
                                <input id="annualMinutes"
                                       type="number" readonly class="form-control"
                                       :value="disorderForm.duration * disorderForm.perMonth * 8">
                            </div>
                            <div class="col-12 mt-2">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="mb-3"><u>Weekly Schedule</u></div>
                                        <div class="row">
                                            <div class="col-4">
                                                <div class="form-check mb-2"
                                                     v-for="(schedule, index) in disorderForm.schedule" :key="index">
                                                    <input class="form-check-input" type="checkbox"
                                                           v-model="schedule.checked">
                                                    <label
                                                        class="form-check-label">{{ schedule.day }}</label>
                                                </div>
                                            </div>
                                            <div class="col-8">
                                                <div v-for="(schedule, index) in disorderForm.schedule"
                                                     :key="index"
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
                                <div class="card mt-2">
                                    <div class="card-body">
                                        <div class="mb-3"><u>Objectives</u></div>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="mb-4"
                                                     v-for="(objective, idx) in disorderForm.objectives">
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
                                                    <a @click="addObjective">
                                                        <u><i class="bi bi-plus-circle"></i> Add
                                                            Objective</u>
                                                    </a>
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-3">
                                <main-button type="submit" class="app-btn-primary">Add</main-button>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </portal-modal>
        <portal-modal modal-title="Update Schedule" modal-id="updateSchedule">
            <form @submit.prevent="updateSchedule">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-3"><u>Weekly Schedule</u></div>
                                <div class="row">
                                    <div class="col-4">
                                        <div class="form-check mb-2"
                                             v-for="(item, index) in scheduleForm.schedule" :key="index">
                                            <input class="form-check-input" type="checkbox"
                                                   v-model="item.checked" :value="item.day">
                                            <label class="form-check-label">{{ item.day }}</label>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div v-for="(schedule, index) in scheduleForm.schedule"
                                             :key="index"
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
                                                            <input
                                                                type="time"
                                                                class="form-control"
                                                                v-model="schedule.time.startTime"
                                                                required
                                                                placeholder="Start Time">
                                                        </div>
                                                        <div class="col-6">
                                                            <label class="sr-only"
                                                                   for="endTime">End
                                                                Time</label>
                                                            <input type="time"
                                                                   class="form-control"
                                                                   v-model="schedule.time.endTime"
                                                                   required
                                                                   placeholder="End Time">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <main-button type="submit" class="app-btn-primary">Update</main-button>
                    </div>
                </div>
            </form>
        </portal-modal>
        <portal-modal modal-title="Update Objectives" modal-id="updateObjectives">
            <form @submit.prevent="updateObjectives">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-3"><u>Objectives</u></div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mb-4"
                                             v-for="(objective, idx) in objectivesForm.objectives">
                                            <div>
                                                                    <textarea v-model="objective.name"
                                                                              class="form-control"></textarea>
                                            </div>
                                            <div class="mt-2">
                                                <small>
                                                    <a @click="removeObj(idx)">
                                                        <u><i class="bi bi-trash"></i> Remove</u>
                                                    </a>
                                                </small>
                                            </div>

                                        </div>
                                        <small>
                                            <a @click="addObj">
                                                <u><i class="bi bi-plus-circle"></i> Add
                                                    Objective</u>
                                            </a>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <main-button type="submit" class="app-btn-primary">Update</main-button>
                    </div>
                </div>
            </form>
        </portal-modal>
        <portal-modal modal-title="Transfer Student" modal-id="transferStudent">
            <form @submit.prevent="transferStudent">
                <div class="row">
                    <div class="col-12">
                        <strong>Student:</strong> {{transferForm.studentName}}
                    </div>
                    <div class="col-12 mt-2">
                        <strong>Disorder:</strong> {{transferForm.disorder}}
                    </div>
                    <div class="col-12 mt-2">
                        <strong>Current School/Year</strong> <br>
                        {{transferForm.school}} / {{transferForm.schoolYear}}
                    </div>
                    <div class="col-12 mt-2">
                        <label>Transfer To</label>
                    </div>
                    <div class="col-6">
                        <select class="form-select form-select-sm" @change="getSchoolYears"
                                v-model="schoolId">
                            <option v-for="(school, index) in schools"
                                    :key="index"
                                    :value="school.id">
                                {{ school.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-6">
                        <select class="form-select form-select-sm" v-model="schoolYearId">
                            <option v-for="(schoolYear, index) in schoolYears"
                                    :key="index"
                                    :value="schoolYear.id">
                                {{ schoolYear.start | formatDate }} - {{ schoolYear.end | formatDate }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12 mt-3">
                        <div class="form-check">
                            <input class="form-check-input" v-model="transferForm.withObjectives" :value="true" type="radio" name="objectives" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                With Objectives
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" v-model="transferForm.withObjectives" :value="false" type="radio" name="objectives" id="flexRadioDefault2">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Without Objectives
                            </label>
                        </div>
                        <span v-if="errors !== null && errors.withObjectives" class="text-danger">{{ errors.withObjectives[0] }}</span>
                    </div>
                </div>
                <span v-if="errors !== null && errors.duplicate" class="text-danger">{{ errors.duplicate[0] }}</span>
                <div class="row mt-3">
                    <div class="col-6">
                        <main-button type="submit" class="app-btn-primary" @click="transferStudent">Transfer</main-button>
                    </div>
                </div>
            </form>
        </portal-modal>
    </div>
</template>

<script>
import {onMounted, reactive, ref, useStore} from "@nuxtjs/composition-api";
import swal from "@/utils/swal";

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
        const store = useStore();
        let schools = ref([]);
        const schoolId = ref();
        const schoolYears = ref([]);
        const schoolYearId = ref();
        const disorders = ref([]);
        const disorderId = ref(0);
        const unusedDisorders = ref([]);
        let students = ref([]);
        const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];
        let form = reactive({
            studentId: 0,
            first_name: null,
            last_name: null,
            grade: null
        });
        let disorderForm = reactive({
            id: null,
            student_id: null,
            school_year_id: schoolYearId,
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
            ],
            objectives: []
        });
        const scheduleForm = ref({
            goal_id: null,
            schedule: [
                {
                    id: null,
                    day: 'Monday',
                    checked: false,
                    time: {
                        startTime: null,
                        endTime: null
                    }
                },
                {
                    id: null,
                    day: 'Tuesday',
                    checked: false,
                    time: {
                        startTime: null,
                        endTime: null
                    }
                },
                {
                    id: null,
                    day: 'Wednesday',
                    checked: false,
                    time: {
                        startTime: null,
                        endTime: null
                    }
                },
                {
                    id: null,
                    day: 'Thursday',
                    checked: false,
                    time: {
                        startTime: null,
                        endTime: null
                    }
                },
                {
                    id: null,
                    day: 'Friday',
                    checked: false,
                    time: {
                        startTime: null,
                        endTime: null
                    }
                },
            ]
        });
        const objectivesForm = reactive({
            goal_id: null,
            objectives: []
        })
        const transferForm = reactive({
            goalId: null,
            studentName: null,
            disorder: null,
            withObjectives: null,
            school: null,
            schoolYear: null,
            newSchoolYearId: null
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
        const getUnusedDisorders = async (studentId) => {
            if (studentId !== 0 && studentId !== null) {
                await store.dispatch('disorders/getUnusedDisorders', studentId)
                unusedDisorders.value = store.state.disorders.unusedDisorders;
                disorderForm.student_id = studentId;
            }
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
        const addObjective = async () => {
            disorderForm.objectives.push({name: ''})
        }
        const removeObjective = async (idx) => {
            disorderForm.objectives.splice(idx, 1);
        }
        const addDisorder = async () => {
            if (disorderForm.id !== 0 && disorderForm.id !== null) {
                await store.dispatch('students/addStudentDisorder', disorderForm)
            }
        }
        const getSchedule = async (goalId) => {
            scheduleForm.value.goal_id = goalId;
            scheduleForm.value.schedule = [
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
            ];
            await store.dispatch('students/getSchedule', goalId);
            for (let item of store.state.students.schedule) {
                scheduleForm.value.schedule.find(val => {
                    if (val.day === item.day) {
                        val.id = item.id;
                        val.checked = true;
                        val.time.startTime = item.start_time;
                        val.time.endTime = item.end_time;
                    }
                })
            }
        }
        const updateSchedule = async () => {
            await store.dispatch('students/updateSchedule', scheduleForm.value);
        }
        const getObjectives = async (goalId) => {
            objectivesForm.goal_id = goalId;
            objectivesForm.objectives = [];
            await store.dispatch('students/getObjectives', goalId);
            for (let item of store.state.students.objectives) {
                objectivesForm.objectives.push(
                    {name: item.goal, id: item.id}
                );
            }
        }
        const addObj = async () => {
            objectivesForm.objectives.push({name: ''})
        }
        const removeObj = async (idx) => {
            objectivesForm.objectives.splice(idx, 1);
        }
        const updateObjectives = async () => {
            await store.dispatch('students/updateObjectives', objectivesForm);
        }
        const deactivate = async (goalId, index, label) => {
            const data = await swal.remove(label);
            if (data.isConfirmed) {
                await store.dispatch('students/deactivate', {id: goalId});
                store.commit('students/REMOVE_DEACTIVATED_STUDENTS', index);
            }
        }
        const showStudentTransfer = async (goalId, studentName, disorder, school, schoolYear) => {
            transferForm.goalId = goalId;
            transferForm.studentName = studentName;
            transferForm.disorder = disorder;
            transferForm.school = school;
            transferForm.schoolYear = schoolYear;
            transferForm.newSchoolYearId = schoolYearId;
            transferForm.withObjectives = null;

        }
        const transferStudent = async () => {
            try{
                await store.dispatch('students/transfer', transferForm);
                await getStudents();
            }catch (error){
                if (error.response.status === 422) {
                        errors.value = error.response.data.errors
                    }
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
            disorderForm,
            unusedDisorders,
            errors,
            grades,
            scheduleForm,
            objectivesForm,
            transferForm,
            getSchoolYears,
            getDisorders,
            getStudents,
            setStudentInfo,
            updateStudentInfo,
            addDisorder,
            getUnusedDisorders,
            addObjective,
            removeObjective,
            updateSchedule,
            getSchedule,
            getObjectives,
            addObj,
            removeObj,
            updateObjectives,
            deactivate,
            transferStudent,
            showStudentTransfer

        }
    }
}
</script>
<style lang="scss">

</style>
