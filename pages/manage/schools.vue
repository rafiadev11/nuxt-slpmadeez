<template>
    <div>
        <div class="row g-3 mb-4 justify-content-between">
            <div class="col-auto">
                <portal-page-title>My Schools</portal-page-title>
            </div>

        </div>
        <div class="row">
            <div class="col-lg-8">
                <div class="app-card app-card-stats-table h-100 shadow-sm">
                    <div class="app-card-header p-3">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-auto">
                                Schools List
                            </div>
                            <div class="col-auto">
                                <div class="card-header-action">
                                    <a href="#" @click="setFormData(null, null)" data-bs-toggle="modal"
                                       data-bs-target="#school-modal">
                                        <i class="bi bi-plus-circle"></i> Add School
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="app-card-body p-3 p-lg-4">
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
                                           @click="deleteSchool(school.id, index)"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
                    <main-button type="button" class="app-btn-secondary" @click.native="closeForm">Cancel</main-button>
                </div>
            </form>
        </portal-modal>
    </div>

</template>

<script>

export default {
    layout: 'portal',
    data() {
        return {
            schools: null,
            form: {
                id: null,
                name: null
            },
            errors: null,
            modalTitle: 'Add a School',
            buttonText: 'Add'
        }
    },
    methods: {
        setFormData(id, name) {
            this.modalTitle = id === null ? 'Add a School' : 'Update School';
            this.buttonText = id === null ? 'Add' : 'Update';
            this.form.id = id;
            this.form.name = name;
        },
        addUpdateSchool() {
            if (this.form.id === null) {
                this.$addSchool(this.form).then(response => {
                    this.form.name = '';
                    this.closeForm();
                    this.schools.push(response.data);
                    this.$toast.success("Success", {
                        duration: 3000
                    })
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                });
            } else {
                this.$updateSchool(this.form).then(response => {
                    this.form.name = '';
                    this.schools.find(school => {
                        if (school.id === response.data.id) {
                            school.name = response.data.name;
                        }
                    });
                    this.closeForm();
                    this.$toast.success("Success", {
                        duration: 3000
                    })
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                });
            }

        },
        async deleteSchool(id, index) {
            const data = await this.$swal.fire({
                title: 'Testing',
                html:
                    "You are about to delete <em><mark>" + this.id + "</mark></em>. <br><br> Type <strong>DELETE</strong> to confirm.",
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#ff8057',
                inputValidator: (value) => {
                    if (!value || value !== "DELETE") {
                        return 'You need to enter "DELETE" to remove the record!'
                    }
                }
            });
            if (data.isConfirmed) {
                this.$deleteSchool(id).then(response => {
                    if (response.data) {
                        this.schools.splice(index, 1);
                        this.$toast.success("Success", {
                            duration: 3000
                        });
                    }

                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                    }
                });
            }
        },
        closeForm() {
            const myModal = document.getElementById('school-modal');
            const modal = myModal.querySelectorAll('.closeModal')[0];
            modal.click();
        }
    },
    created() {
        this.$getSchools()
            .then(response => {
                this.schools = response.data
            })
            .catch(error => {
                console.log(error)
            })
    }
}
</script>
<style lang="scss">
@import "node_modules/sweetalert2/dist/sweetalert2.min.css";
</style>
