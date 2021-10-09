export const state = () => ({
    students: []
});

export const mutations = {
    GET_STUDENTS(state, data) {
        state.students = data;
    },
    ADD_STUDENT(state, data) {
        state.students.push(data);
    },
    UPDATE_STUDENT(state, data) {
        state.students.find(student => {
            if (student.id === data.id) {
                student.first_name = data.first_name;
                student.last_name = data.last_name;
                student.grade = data.grade;
            }
        });
    },
    SET_STUDENT(state, payload) {
        const { id, first_name, last_name, grade } = payload;
        const student = state.students.find(item => item.student_id === id);
        student.student.first_name = first_name;
        student.student.last_name = last_name;
        student.student.grade = grade;
    }
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
    },
    async updateStudent({ commit }, formData) {
        const response = await $nuxt.$updateStudent(formData);
        commit("UPDATE_STUDENT", response.data);
        return response;
    }
    // async deleteSchool({ commit }, { id, index }) {
    //     const { data } = await $nuxt.$deleteSchool(id);
    //     commit("DELETE_SCHOOL", { data, index });
    //     return data;
    // }
};
