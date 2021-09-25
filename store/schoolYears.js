export const state = () => ({
    schoolYears: [],
    schoolId: null
});

export const mutations = {
    GET_SCHOOL_YEARS(state, data) {
        state.schoolYears = data;
    },
    ADD_SCHOOL_YEAR(state, data) {
        state.schoolYears.push(data);
    },
    UPDATE_SCHOOL_YEAR(state, data) {
        state.schoolYears.find(schoolYear => {
            if (schoolYear.id === data.id) {
                schoolYear.start = data.start;
                schoolYear.end = data.end;
            }
        });
    },
    DELETE_SCHOOL_YEAR(state, { data, index }) {
        if (data) {
            state.schoolYears.splice(index, 1);
        }
    }
};

export const actions = {
    async getSchoolYears({ commit }, schoolId) {
        const response = await $nuxt.$getSchoolYears(schoolId);
        commit("GET_SCHOOL_YEARS", response.data);
        return response;
    },
    async addSchoolYear({ commit }, formData) {
        const response = await $nuxt.$addSchoolYear(formData);
        commit("ADD_SCHOOL_YEAR", response.data);
        return response;
    },
    async updateSchoolYear({ commit }, formData) {
        const response = await $nuxt.$updateSchoolYear(formData);
        commit("UPDATE_SCHOOL_YEAR", response.data);
        return response;
    },
    async deleteSchoolYear({ commit }, { id, index }) {
        const { data } = await $nuxt.$deleteSchoolYear(id);
        commit("DELETE_SCHOOL_YEAR", { data, index });
        return data;
    }
};
