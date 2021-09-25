export const state = () => ({
    mySchools: []
});

export const mutations = {
    GET_SCHOOLS(state, data) {
        state.mySchools = data;
    },
    ADD_SCHOOL(state, data) {
        state.mySchools.push(data);
    },
    UPDATE_SCHOOL(state, data) {
        state.mySchools.find(school => {
            if (school.id === data.id) {
                school.name = data.name;
            }
        });
    },
    DELETE_SCHOOL(state, { data, index }) {
        if (data) {
            state.mySchools.splice(index, 1);
        }
    }
};

export const actions = {
    async getMySchools({ commit }) {
        const response = await $nuxt.$getSchools();
        commit("GET_SCHOOLS", response.data);
    },
    async addSchool({ commit }, formData) {
        const response = await $nuxt.$addSchool(formData);
        commit("ADD_SCHOOL", response.data);
        return response;
    },
    async updateSchool({ commit }, formData) {
        const response = await $nuxt.$updateSchool(formData);
        commit("UPDATE_SCHOOL", response.data);
        return response;
    },
    async deleteSchool({ commit }, { id, index }) {
        const { data } = await $nuxt.$deleteSchool(id);
        commit("DELETE_SCHOOL", { data, index });
        return data;
    }
};
