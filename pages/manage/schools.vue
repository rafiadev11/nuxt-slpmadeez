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
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#school-modal">
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
                                        <i class="bi bi-pencil-square"></i>
                                        / <i class="bi bi-trash-fill"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <portal-modal modal-title="Add a School" modal-id="school-modal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis delectus eligendi,
            iste itaque laborum numquam sunt. Autem dolores mollitia natus neque nobis nulla placeat qui quo veniam.
            Deserunt omnis, possimus.
        </portal-modal>
    </div>

</template>

<script>

export default {
    layout: 'portal',
    data() {
        return {
            schools: null,
            formData: {
                name: ''
            },
            errors: null
        }
    },
    methods: {
        addSchool() {
            this.$addSchool(this.formData).then(response => {
                this.formData.name = '';
                this.schools.push(response.data);
                this.$toast.success("School Added Successfully", {
                    duration: 3000
                })
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                }
            })
        },
        async updateSchool(id) {

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
<style lang="scss" scoped>

</style>
