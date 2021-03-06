export const state = () => ({
    students: [],
    schedule: [],
    objectives: []
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
    },
    ADD_STUDENT_DISORDER(state, data) {
        state.students.push({
            id: data.id,
            student: {
                id: data.student.id,
                first_name: data.student.first_name,
                last_name: data.student.last_name,
                grade: data.student.grade
            },
            disorder: {
                id: data.disorder.id,
                name: data.disorder.name
            }
        });
    },
    GET_SCHEDULE(state, data) {
        state.schedule = data;
    },
    GET_OBJECTIVES(state, data) {
        state.objectives = data;
    },
    REMOVE_DEACTIVATED_STUDENTS(state, index) {
        state.students.splice(index, 1);
    },
    ADD_TRANSFERRED_STUDENT(state, data) {
        state.students.push(data);
    }
};

export const actions = {
    async getStudents({ commit }, { schoolYearId, disorderId }) {
        const response = await $nuxt.$getStudents(schoolYearId, disorderId);
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
    },
    async addStudentDisorder({ commit }, formData) {
        const response = await $nuxt.$addStudentDisorder(formData);
        commit("ADD_STUDENT_DISORDER", response.data);
        return response;
    },
    async getSchedule({ commit }, goalId) {
        const response = await $nuxt.$getSchedule(goalId);
        commit("GET_SCHEDULE", response.data);
        return response;
    },
    async updateSchedule({ commit }, formData) {
        await $nuxt.$updateSchedule(formData);
    },
    async getObjectives({ commit }, goalId) {
        const response = await $nuxt.$getObjectives(goalId);
        commit("GET_OBJECTIVES", response.data);
        return response;
    },
    async updateObjectives({ commit }, formData) {
        await $nuxt.$updateObjectives(formData);
    },
    async deactivate({ commit }, goalId) {
        await $nuxt.$studentDeactivate(goalId);
    },
    async transfer({ commit }, formData) {
        const response = await $nuxt.$studentTransfer(formData);
        commit("ADD_TRANSFERRED_STUDENT", response.data);
        return response;
    }
};
