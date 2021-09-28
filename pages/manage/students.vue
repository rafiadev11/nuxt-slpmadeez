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
                        <a href="#" @click="setFormData(null, null)" data-bs-toggle="modal"
                           data-bs-target="#myModal">
                            <i class="bi bi-plus-circle"></i> Add a Student
                        </a>
                    </template>
                    <template v-slot:default>
                        <div class="row flex-row">
                            <div class="col-auto flex-fill">
                                <div class="page-utilities">
                                    <label for="school">Schools</label>
                                    <select id="school" class="form-select form-select-sm" @change="getSchoolYears"
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
                                    <label for="schoolYear">School Years</label>
                                    <select id="schoolYear" class="form-select form-select-sm" v-model="schoolYearId">
                                        <option v-for="(schoolYear, index) in schoolYears"
                                                :key="index"
                                                :value="schoolYear.id">
                                            {{ schoolYear.start }} - {{ schoolYear.start }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-auto flex-fill">
                                <div class="page-utilities">
                                    <label for="disorder">Disorders</label>
                                    <select id="disorder" class="form-select form-select-sm" v-model="disorderId">
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi consequuntur dolore error eum
            incidunt itaque, laborum modi pariatur qui quia quibusdam sit tempora temporibus veniam. Animi ipsam sit
            temporibus!
        </portal-modal>
    </div>

</template>

<script>
import {onMounted, reactive, ref, useContext, useStore} from "@nuxtjs/composition-api";

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
    setup() {
        // Data
        const context = useContext();
        const store = useStore();
        let schools = ref([]);
        const schoolId = ref();
        const schoolYears = ref([]);
        const schoolYearId = ref();
        const disorders = ref([]);
        const disorderId = ref(0);
        let students = ref([]);
        let errors = reactive({name: null});
        const modalTitle = ref('Add a Student');
        const buttonText = ref('Add');

        // Methods
        const setFormData = (id, name) => {
            modalTitle.value = id === null ? 'Add a Student' : 'Update Student';
            buttonText.value = id === null ? 'Add' : 'Update';
            form.id = id;
            form.name = name;
        }

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
            errors,
            modalTitle,
            buttonText,
            setFormData,
            getSchoolYears,
            getDisorders

        }
    }
}
</script>
<style lang="scss">

</style>
