export const state = () => ({
    students: []
});

export const mutations = {
    GET_STUDENTS(state, data) {
        state.students = data;
    },
    ADD_STUDENT(state, data) {
        state.students.push(data);
    }
    // UPDATE_SCHOOL(state, data) {
    //     state.mySchools.find(school => {
    //         if (school.id === data.id) {
    //             school.name = data.name;
    //         }
    //     });
    // },
    // DELETE_SCHOOL(state, { data, index }) {
    //     if (data) {
    //         state.mySchools.splice(index, 1);
    //     }
    // }
};

export const actions = {
    async getStudents({ commit }, { schoolYearId, disorderId }) {
        const response = await $nuxt.$getStudents(schoolYearId, disorderId);
        console.log(response);
        commit("GET_STUDENTS", response.data);
        return response;
    },
    async addStudent({ commit }, formData) {
        const response = await $nuxt.$addStudent(formData);
        commit("ADD_STUDENT", response.data);
        return response;
    }
    // async updateSchool({ commit }, formData) {
    //     const response = await $nuxt.$updateSchool(formData);
    //     commit("UPDATE_SCHOOL", response.data);
    //     return response;
    // },
    // async deleteSchool({ commit }, { id, index }) {
    //     const { data } = await $nuxt.$deleteSchool(id);
    //     commit("DELETE_SCHOOL", { data, index });
    //     return data;
    // }
};
