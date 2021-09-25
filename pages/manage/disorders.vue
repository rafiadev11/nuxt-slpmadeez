<template>
    <div>
        <div class="row g-3 mb-4 justify-content-between">
            <div class="col-auto">
                <portal-page-title>Disorders</portal-page-title>
            </div>

        </div>
        <div class="row">
            <div class="col-lg-8">
                <portal-card>
                    <template v-slot:header-title>Disorders List</template>
                    <template v-slot:header-button>
                        <a href="#" @click="setFormData(null, null)" data-bs-toggle="modal"
                           data-bs-target="#myModal">
                            <i class="bi bi-plus-circle"></i> Add a Disorder
                        </a>
                    </template>
                    <template v-slot:default>
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                                <tbody>
                                <tr v-for="(disorder, index) in disorders" :key="index">
                                    <td><a href="#">{{ disorder.name }}</a></td>
                                    <td class="stat-cell">
                                        <i class="bi bi-pencil-square cursor-pointer"
                                           data-bs-toggle="modal"
                                           data-bs-target="#myModal"
                                           @click="setFormData(disorder.id, disorder.name)"></i>
                                        /
                                        <i class="bi bi-trash-fill cursor-pointer"
                                           @click="deleteDisorder(disorder.id, index, disorder.name)"></i>
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
            <form @submit.prevent="addUpdateDisorder">
                <div>
                    <label class="sr-only" for="disorder-name">Disorder</label>
                    <input id="disorder-name" v-model="form.name" type="text" class="form-control"
                           placeholder="Disorder" required="required"><br>
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
import {onMounted, reactive, ref, useContext, useStore} from "@nuxtjs/composition-api";
import swal from "@/utils/swal";

export default {
    layout: 'portal',
    head: {
        title: 'Disorders',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: 'Manage disorders list.'
            }
        ]
    },
    setup() {
        // Data
        const context = useContext();
        const store = useStore();
        let disorders = ref([]);
        const form = reactive({
            id: null,
            name: ''
        });
        let errors = reactive({name: null});
        const modalTitle = ref('Add a Disorder');
        const buttonText = ref('Add');

        // Methods
        const setFormData = (id, name) => {
            modalTitle.value = id === null ? 'Add a Disorder' : 'Update Disorder';
            buttonText.value = id === null ? 'Add' : 'Update';
            form.id = id;
            form.name = name;
        }
        const addUpdateDisorder = () => {
            if (form.id === null) {
                const disorder = store.dispatch("disorders/addDisorder", form);
                disorder.then(() => {
                    success();
                }).catch(error => {
                    if (error.response.status === 422) {
                        errors.value = error.response.data.errors
                    }
                })
            } else {
                const disorder = store.dispatch("disorders/updateDisorder", form);
                disorder.then(() => {
                    success();
                }).catch(error => {
                    if (error.response.status === 422) {
                        errors.value = error.response.data.errors
                    }
                })
            }

        }
        const deleteDisorder = async (id, index, label) => {
            const data = await swal.remove(label);
            if (data.isConfirmed) {
                const disorder = store.dispatch("disorders/deleteDisorder", {id, index});
                disorder.then(() => {
                    success();
                }).catch(error => {
                    console.log(error);
                });
            }
        }

        const success = () => {
            form.name = '';
            errors.value = null;
            $nuxt.$emit('closeModal');
            context.$toast.success("Success", {
                duration: 3000
            })
        }

        // LifeCycle Hooks
        onMounted(async () => {
            await store.dispatch('disorders/getDisorders');
            disorders.value = store.state.disorders.disorders;
        });

        // Available Data
        return {
            disorders,
            form,
            errors,
            modalTitle,
            buttonText,
            setFormData,
            addUpdateDisorder,
            deleteDisorder
        }
    }
}
</script>
<style lang="scss">
</style>
