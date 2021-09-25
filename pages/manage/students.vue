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
                    <template v-slot:header-title>
                        <div class="row">
                            <div class="col-auto">
                                <div class="page-utilities">
                                    <select class="form-select form-select-sm w-auto">
                                        <option value="Test">School</option>
                                    </select>
                                    <!--                            <select class="form-select form-select-sm w-auto" v-model="schoolId"-->
                                    <!--                                    @change="getSchoolYears">-->
                                    <!--                                <option v-for="(school, index) in schools"-->
                                    <!--                                        :key="index"-->
                                    <!--                                        :value="school.id">-->
                                    <!--                                    {{ school.name }}-->
                                    <!--                                </option>-->
                                    <!--                            </select>-->
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="page-utilities">
                                    <select class="form-select form-select-sm w-auto">
                                        <option value="2020-2021">School Year</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="page-utilities">
                                    <select class="form-select form-select-sm w-auto">
                                        <option value="2020-2021">Disorder</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </template>
                    <template v-slot:header-button>
                        <a href="#" @click="setFormData(null, null)" data-bs-toggle="modal"
                           data-bs-target="#myModal">
                            <i class="bi bi-plus-circle"></i> Add a Student
                        </a>
                    </template>
                    <template v-slot:default>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aperiam fuga impedit natus
                        officiis praesentium provident quidem ratione! Dicta eius ex exercitationem laborum perspiciatis
                        quia quidem sequi sint tempora unde!
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
import {reactive, ref} from "@nuxtjs/composition-api";

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
        // const context = useContext();
        // const store = useStore();
        let students = ref([]);
        const form = reactive({
            id: null,
        });
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


        // LifeCycle Hooks


        // Available Data
        return {
            students,
            form,
            errors,
            modalTitle,
            buttonText,
            setFormData,

        }
    }
}
</script>
<style lang="scss">
</style>
