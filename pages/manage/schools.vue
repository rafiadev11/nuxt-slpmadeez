<template>
    <div>
        <div class="row g-3 mb-4 justify-content-between">
            <div class="col-auto">
                <portal-page-title>My Schools</portal-page-title>
            </div>

        </div>
        <div class="row">
            <div class="col-lg-8">
                <portal-card>
                    <template v-slot:header-title>Schools List</template>
                    <template v-slot:header-button>
                        <a href="#" @click="setFormData(null, null)" data-bs-toggle="modal"
                           data-bs-target="#school-modal">
                            <i class="bi bi-plus-circle"></i> Add School
                        </a>
                    </template>
                    <template v-slot:default>
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                                <tbody>
                                <tr v-for="(school, index) in schools" :key="index">
                                    <td><a href="#">{{ school.name }}</a></td>
                                    <td class="stat-cell">
                                        <i class="bi bi-pencil-square cursor-pointer"
                                           data-bs-toggle="modal"
                                           data-bs-target="#school-modal"
                                           @click="setFormData(school.id, school.name)"></i>
                                        /
                                        <i class="bi bi-trash-fill cursor-pointer"
                                           @click="deleteSchool(school.id, index, school.name)"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>
                </portal-card>
            </div>
        </div>

        <portal-modal :modal-title="modalTitle" modal-id="school-modal">
            <form @submit.prevent="addUpdateSchool">
                <div>
                    <label class="sr-only" for="school-name">School Name</label>
                    <input id="school-name" v-model="form.name" type="text" class="form-control"
                           placeholder="School Name" required="required"><br>
                    <span v-if="errors !== null && errors.name">{{ errors.name[0] }}</span>
                </div>
                <input type="hidden" v-model="form.id">
                <div>
                    <main-button type="submit" class="app-btn-primary">{{ buttonText }}</main-button>
                </div>
            </form>
        </portal-modal>
    </div>

</template>

<script>
import {onMounted, reactive, ref, useContext} from "@nuxtjs/composition-api";
import swal from "@/utils/swal";
export default {
    layout: 'portal',
    setup() {
        // Data
        const context = useContext();
        let schools = ref([]);
        const form = reactive({
            id: null,
            name: ''
        });
        let errors = reactive({name: null});
        const modalTitle = ref('Add a School');
        const buttonText = ref('Add');

        // Methods
        const setFormData = (id, name) => {
            modalTitle.value = id === null ? 'Add a School' : 'Update School';
            buttonText.value = id === null ? 'Add' : 'Update';
            form.id = id;
            form.name = name;
        }
        const addUpdateSchool = () => {
            if (form.id === null) {
                context.$addSchool(form).then(response => {
                    form.name = '';
                    schools.value.push(response.data);
                    $nuxt.$emit('closeModal');
                    context.$toast.success("Success", {
                        duration: 3000
                    })
                }).catch(error => {
                    console.log(error)
                    if (error.response.status === 422) {
                        errors = error.response.data.errors
                    }
                });
            } else {
                context.$updateSchool(form).then(response => {
                    form.name = '';
                    schools.value.find(school => {
                        if (school.id === response.data.id) {
                            school.name = response.data.name;
                        }
                    });
                    $nuxt.$emit('closeModal');
                    context.$toast.success("Success", {
                        duration: 3000
                    })
                }).catch(error => {
                    if (error.response.status === 422) {
                        errors = error.response.data.errors
                    }
                });
            }

        }
        const deleteSchool = async (id, index, label) => {
            const data = await swal.remove(label);
            console.log(data);
            if (data.isConfirmed) {
                context.$deleteSchool(id).then(response => {
                    if (response.data) {
                        schools.value.splice(index, 1);
                        context.$toast.success("Success", {
                            duration: 3000
                        });
                    }

                }).catch(error => {
                    console.log(error);
                    // if (error.response.status === 422) {
                    //     errors = error.response.data.errors
                    // }
                });
            }
        }

        // LifeCycle Hooks
        onMounted(async () => {
            await context.$getSchools().then(response => {
                schools.value = response.data;
            });
        });

        // Available Data
        return {
            schools,
            form,
            errors,
            modalTitle,
            buttonText,
            setFormData,
            addUpdateSchool,
            deleteSchool
        }
    }
}
</script>
<style lang="scss">
</style>
