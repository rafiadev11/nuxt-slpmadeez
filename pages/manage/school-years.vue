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
                        <a href="#" @click="setFormData(null, null, null, null)" data-bs-toggle="modal"
                           data-bs-target="#myModal">
                            <i class="bi bi-plus-circle"></i> Add a School Year
                        </a>
                    </template>
                    <template v-slot:default>
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                                <tbody>
                                <tr v-for="(schoolYear, index) in schoolYears" :key="index">
                                    <td><a href="#">{{ schoolYear.start | formatDate }} -
                                        {{ schoolYear.end | formatDate }}</a></td>
                                    <td class="stat-cell">
                                        <i class="bi bi-pencil-square cursor-pointer"
                                           @click="setFormData(schoolYear.id, schoolYear.school_id, schoolYear.start, schoolYear.end)"
                                           data-bs-toggle="modal"
                                           data-bs-target="#myModal"></i>
                                        /
                                        <i class="bi bi-trash-fill cursor-pointer"
                                           @click="deleteSchoolYear(schoolYear.id, index, schoolYear.start)"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>
                </portal-card>
            </div>
        </div>

        <portal-modal :modal-title="modalTitle" modal-id="myModal">
            <form @submit.prevent="addUpdateSchoolYear">
                <div class="row">
                    <div class="col-lg-12">
                        <label class="sr-only">Select a School</label>
                        <select class="form-select form-select-sm w-auto" v-model="form.school_id">
                            <option v-for="(school, index) in schools"
                                    :key="index"
                                    :value="school.id">
                                {{ school.name }}
                            </option>
                        </select>
                        <br>
                        <span v-if="errors !== null && errors.school_id">{{ errors.school_id[0] }}</span>
                        <input type="hidden" v-model="form.id">
                    </div>
                    <div class="col-auto">
                        <label class="sr-only" for="start">Start Date</label>
                        <input id="start" v-model="form.start" type="date" class="form-control"
                               placeholder="Start Date" required="required"><br>
                        <span v-if="errors !== null && errors.start">{{ errors.start[0] }}</span>
                    </div>
                    <div class="col-auto">
                        <label class="sr-only" for="end">End Date</label>
                        <input id="end" v-model="form.end" type="date" class="form-control"
                               placeholder="End Date" required="required"><br>
                        <span v-if="errors !== null && errors.end">{{ errors.end[0] }}</span>
                    </div>
                </div>

                <div>
                    <main-button type="submit" class="app-btn-primary">{{ buttonText }}</main-button>
                </div>
            </form>
        </portal-modal>
    </div>

</template>

<script>
import {onMounted, reactive, ref, useContext, useMeta, defineComponent, useStore} from "@nuxtjs/composition-api";
import swal from "@/utils/swal";

export default defineComponent({
    layout: 'portal',
    head: {
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Manage school years. Define a starting and ending year for my schools.'
            }
        ]
    },
    filters: {
        formatDate: (date) => {
            const options = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'};
            return new Date(date).toLocaleDateString('en-US', options);
        }
    },
    setup() {
        // Data
        const context = useContext();
        const store = useStore();
        const schools = ref([]);
        const schoolId = ref();
        const schoolYears = ref([]);
        const modalTitle = ref('Add a School');
        const buttonText = ref('Add');
        const form = reactive({
            id: null,
            school_id: '',
            start: '',
            end: ''
        });
        let errors = reactive({
            school_id: '',
            start: '',
            end: ''
        });

        // Methods
        const setFormData = (id, school_id, start, end) => {
            modalTitle.value = id === null ? 'Add a School Year' : 'Update School Year';
            buttonText.value = id === null ? 'Add' : 'Update';
            form.id = id;
            form.school_id = school_id;
            form.start = start;
            form.end = end;
        }
        const addUpdateSchoolYear = () => {
            if (form.id === null) {
                const schoolYear = store.dispatch("schoolYears/addSchoolYear", form);
                schoolYear.then(() => {
                    success();
                }).catch(error => {
                    if (error.response.status === 422) {
                        errors.value = error.response.data.errors
                    }
                })
            } else {
                const schoolYear = store.dispatch("schoolYears/updateSchoolYear", form);
                schoolYear.then(() => {
                    success();
                }).catch(error => {
                    if (error.response.status === 422) {
                        errors.value = error.response.data.errors
                    }
                })
            }

        }
        const deleteSchoolYear = async (id, index, label) => {
            const data = await swal.remove(label);
            if (data.isConfirmed) {
                const schoolYear = store.dispatch("schoolYears/deleteSchoolYear", {id, index});
                schoolYear.then(() => {
                    success();
                }).catch(error => {
                    console.log(error);
                });
            }
        }

        const getSchoolYears = async () => {
            await store.dispatch('schoolYears/getSchoolYears', schoolId.value);
            schoolYears.value = store.state.schoolYears.schoolYears;
        }

        const success = () => {
            if(form.school_id){
                schoolId.value = form.school_id
            }
            getSchoolYears();
            $nuxt.$emit('closeModal');
            context.$toast.success("Success", {
                duration: 3000
            })
        }

        // Lifecycle Hooks
        onMounted(async () => {
            await store.dispatch('schools/getMySchools');
            schools.value = store.state.schools.mySchools;
            schoolId.value = schools.value[0].id;
            await getSchoolYears();
        });

        // Meta properties
        useMeta({title: 'School Years'});

        return {
            schools,
            schoolId,
            schoolYears,
            modalTitle,
            buttonText,
            form,
            errors,
            getSchoolYears,
            setFormData,
            addUpdateSchoolYear,
            deleteSchoolYear
        }
    }
})
</script>
<style lang="scss">

</style>
